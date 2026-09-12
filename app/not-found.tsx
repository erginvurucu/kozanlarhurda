import Link from "next/link";

export default function BulunamadiSayfasi() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl font-bold text-lacivert-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-lacivert-900">
        Aradığınız sayfa bulunamadı
      </h1>
      <p className="mt-3 text-kurum-600">
        Bağlantı değişmiş olabilir. Bölgenizi aşağıdan bulabilirsiniz.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/bolgeler"
          className="rounded-sm bg-lacivert-600 px-6 py-3 font-semibold text-white"
        >
          Tüm bölgeler
        </Link>
        <Link
          href="/"
          className="dugme dugme-cerceve px-6 py-3"
        >
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
