import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/**
 * YONETIM PANELI KIMLIK DOGRULAMA
 *
 * Tasarim notlari:
 * - Sifre kodda DEGIL, YONETIM_SIFRE ortam degiskeninde durur.
 * - Karsilastirma timing-safe: karakter karakter erken donen bir
 *   karsilastirma, sureyi olcerek sifre tahmin etmeye yarar.
 * - Oturum cerezi HMAC ile imzalanir; icerigi degistiren biri gecerli
 *   imza uretemez. Cerezde sifre YA DA turevi TASINMAZ.
 * - Cerez httpOnly + sameSite=strict: JavaScript okuyamaz, baska
 *   siteden gonderilemez.
 */

const CEREZ_ADI = "kh_oturum";
/** Oturum suresi - 12 saat. Fiyat guncellemek icin fazlasiyla yeterli. */
const SURE_MS = 12 * 60 * 60 * 1000;

function sifre(): string | null {
  const s = process.env.YONETIM_SIFRE;
  // Bos veya cok kisa sifreyi gecerli saymiyoruz: yanlislikla bos
  // birakilan bir degisken paneli herkese acik hale getirmesin.
  if (!s || s.length < 8) return null;
  return s;
}

/** Panel hic kurulmamissa (sifre tanimsiz) burasi false doner. */
export function panelKullanilabilir(): boolean {
  return sifre() !== null;
}

function imzala(veri: string, anahtar: string): string {
  return createHmac("sha256", anahtar).update(veri).digest("hex");
}

/** Iki dizeyi sabit surede karsilastirir. */
function esitMi(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  // timingSafeEqual esit uzunluk ister; uzunluk farkini ayrica
  // sizdirmamak icin her iki tarafi da sabit uzunluga indirgiyoruz.
  const ah = createHmac("sha256", "uzunluk").update(ab).digest();
  const bh = createHmac("sha256", "uzunluk").update(bb).digest();
  return timingSafeEqual(ah, bh);
}

/** Girilen sifre dogru mu? */
export function sifreDogruMu(girilen: string): boolean {
  const gercek = sifre();
  if (!gercek) return false;
  return esitMi(girilen, gercek);
}

/** Giris basarili olunca imzali oturum cerezi yazar. */
export async function oturumAc(): Promise<void> {
  const gercek = sifre();
  if (!gercek) throw new Error("Panel yapılandırılmamış");

  const bitis = Date.now() + SURE_MS;
  const tuz = randomBytes(8).toString("hex");
  const govde = `${bitis}.${tuz}`;
  const deger = `${govde}.${imzala(govde, gercek)}`;

  const c = await cookies();
  c.set(CEREZ_ADI, deger, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: Math.floor(SURE_MS / 1000),
  });
}

export async function oturumKapat(): Promise<void> {
  const c = await cookies();
  c.delete(CEREZ_ADI);
}

/** Gecerli ve suresi dolmamis bir oturum var mi? */
export async function oturumVarMi(): Promise<boolean> {
  const gercek = sifre();
  if (!gercek) return false;

  const deger = (await cookies()).get(CEREZ_ADI)?.value;
  if (!deger) return false;

  const parcalar = deger.split(".");
  if (parcalar.length !== 3) return false;

  const [bitisStr, tuz, imza] = parcalar;
  const govde = `${bitisStr}.${tuz}`;

  if (!esitMi(imza, imzala(govde, gercek))) return false;

  const bitis = Number(bitisStr);
  if (!Number.isFinite(bitis) || Date.now() > bitis) return false;

  return true;
}
