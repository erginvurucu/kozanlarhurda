import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { oturumVarMi } from "@/lib/yonetim";
import { fiyatlariYaz, sayiGecerli } from "@/lib/fiyatDeposu";
import { fiyatGruplari } from "@/data/fiyatlar";

/**
 * Fiyat kaydetme ucu. Oturum yoksa hicbir sey yapmaz.
 *
 * Gelen veriye guvenilmez: yalnizca kodda tanimli kalem adlari ve
 * makul araliktaki sayilar kabul edilir. Bos birakilan kalem
 * "fiyat yok" demektir ve depodan silinir.
 */
export async function POST(istek: Request) {
  if (!(await oturumVarMi())) {
    return NextResponse.json({ mesaj: "Yetkisiz." }, { status: 401 });
  }

  let govde: unknown;
  try {
    govde = await istek.json();
  } catch {
    return NextResponse.json({ mesaj: "Geçersiz veri." }, { status: 400 });
  }

  const gelen = (govde as { kalemler?: unknown })?.kalemler;
  if (typeof gelen !== "object" || gelen === null) {
    return NextResponse.json({ mesaj: "Geçersiz veri." }, { status: 400 });
  }

  const gecerliAdlar = new Set(
    fiyatGruplari.flatMap((g) => g.kalemler.map((k) => k.ad)),
  );

  const temiz: Record<string, { usdMin: number; usdMax: number }> = {};
  const hatalar: string[] = [];

  for (const [ad, deger] of Object.entries(gelen as Record<string, unknown>)) {
    if (!gecerliAdlar.has(ad)) continue;

    const d = deger as { usdMin?: unknown; usdMax?: unknown };
    const minHam = String(d?.usdMin ?? "").trim();
    const maxHam = String(d?.usdMax ?? "").trim();

    // Ikisi de bos: bu kalemde fiyat yok, atla.
    if (minHam === "" && maxHam === "") continue;

    const min = Number(minHam.replace(",", "."));
    const max = Number(maxHam.replace(",", "."));

    if (!sayiGecerli(min) || !sayiGecerli(max)) {
      hatalar.push(`${ad}: geçersiz sayı`);
      continue;
    }
    if (min > max) {
      hatalar.push(`${ad}: alt sınır üst sınırdan büyük`);
      continue;
    }

    temiz[ad] = { usdMin: min, usdMax: max };
  }

  if (hatalar.length > 0) {
    return NextResponse.json({ mesaj: hatalar.join(" · ") }, { status: 400 });
  }

  try {
    const kayit = await fiyatlariYaz(temiz);

    // Fiyat gosterilen sayfalari tazele.
    revalidatePath("/");
    revalidatePath("/hurda-fiyatlari");

    return NextResponse.json({
      ok: true,
      adet: Object.keys(temiz).length,
      guncelleme: kayit.guncelleme,
    });
  } catch (e) {
    return NextResponse.json(
      { mesaj: e instanceof Error ? e.message : "Kaydedilemedi." },
      { status: 500 },
    );
  }
}
