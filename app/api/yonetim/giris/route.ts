import { NextResponse } from "next/server";
import { sifreDogruMu, oturumAc, panelKullanilabilir } from "@/lib/yonetim";

/**
 * Giris ucu.
 *
 * Kaba kuvvet denemesini yavaslatmak icin her istekte kucuk bir
 * gecikme var. Hata mesaji bilerek genel: "sifre yanlis" mi
 * "panel kapali" mi ayrimini disariya sizdirmiyoruz.
 */
export async function POST(istek: Request) {
  if (!panelKullanilabilir()) {
    return NextResponse.json(
      { mesaj: "Panel henüz yapılandırılmamış." },
      { status: 503 },
    );
  }

  let sifre = "";
  try {
    const govde = await istek.json();
    sifre = typeof govde?.sifre === "string" ? govde.sifre : "";
  } catch {
    // gecersiz JSON - bos sifre gibi islenir
  }

  // Sabit gecikme: deneme hizini dusurur.
  await new Promise((r) => setTimeout(r, 600));

  if (!sifreDogruMu(sifre)) {
    return NextResponse.json({ mesaj: "Şifre hatalı." }, { status: 401 });
  }

  await oturumAc();
  return NextResponse.json({ ok: true });
}
