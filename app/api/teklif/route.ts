import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FOTO = 5;
const MAX_BOYUT = 8 * 1024 * 1024; // 8 MB / dosya

/**
 * Lead alma ucu.
 *
 * v1 bildirim kanali: Telegram (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID).
 * Env degiskenleri tanimli degilse istek yine de 200 doner ve icerik
 * sunucu loguna yazilir - boylece form gelistirmede test edilebilir.
 *
 * KVKK NOTU: Bu uctan gecen veri kisisel veridir. Kalici saklama
 * eklenecekse once saklama suresi ve imha politikasi tanimlanmalidir.
 */
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ mesaj: "Geçersiz istek" }, { status: 400 });
  }

  // Bot tuzagi doluysa basarili gibi don, hicbir sey yapma.
  if (String(form.get("website") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ad = String(form.get("ad") ?? "").trim();
  const telefon = String(form.get("telefon") ?? "").trim();
  const ilce = String(form.get("ilce") ?? "").trim();
  const tur = String(form.get("tur") ?? "").trim();
  const notu = String(form.get("not") ?? "").trim();
  const kvkk = form.get("kvkk");

  // Kurumsal (B2B) alanlar - opsiyoneldir, ev formunda hic gonderilmez.
  const firma = String(form.get("firma") ?? "").trim().slice(0, 120);
  const tonaj = String(form.get("tonaj") ?? "").trim().slice(0, 60);
  const periyodik = String(form.get("periyodik") ?? "").trim() === "evet";

  if (!ad || !telefon || !ilce || !tur) {
    return NextResponse.json({ mesaj: "Zorunlu alanlar eksik" }, { status: 400 });
  }

  // KVKK acik rizasi olmadan kisisel veri islenemez.
  if (!kvkk) {
    return NextResponse.json(
      { mesaj: "Aydınlatma metni onayı gerekli" },
      { status: 400 }
    );
  }

  const rakam = telefon.replace(/\D/g, "");
  if (rakam.length < 10 || rakam.length > 13) {
    return NextResponse.json({ mesaj: "Telefon numarası geçersiz" }, { status: 400 });
  }

  const fotolar = form
    .getAll("foto")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (fotolar.length > MAX_FOTO) {
    return NextResponse.json({ mesaj: "En fazla 5 fotoğraf" }, { status: 400 });
  }
  if (fotolar.some((f) => f.size > MAX_BOYUT)) {
    return NextResponse.json({ mesaj: "Fotoğraf boyutu çok büyük" }, { status: 400 });
  }

  const metin = [
    firma ? "🏭 KURUMSAL HURDA TALEBİ" : "🔔 YENİ HURDA TALEBİ",
    firma ? `Firma: ${firma}` : null,
    `Ad: ${ad}`,
    `Telefon: ${telefon}`,
    `İlçe: ${ilce}`,
    `Tür: ${tur}`,
    tonaj ? `Yaklaşık tonaj: ${tonaj}` : null,
    periyodik ? "Periyodik anlaşma ile ilgileniyor" : null,
    notu ? `Not: ${notu}` : null,
    fotolar.length ? `Fotoğraf: ${fotolar.length} adet` : null,
    `Zaman: ${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: metin }),
      });
      if (!r.ok) throw new Error(`Telegram ${r.status}`);
    } catch (e) {
      // Bildirim gitmese bile lead'i kaybetmemek icin logla ve basarili don.
      console.error("[teklif] bildirim gonderilemedi:", e);
      console.warn("[teklif] KAYIP OLMASIN:\n" + metin);
    }
  } else {
    console.warn(
      "[teklif] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID tanımlı değil. Lead:\n" + metin
    );
  }

  return NextResponse.json({ ok: true });
}
