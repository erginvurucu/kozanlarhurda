export function YasalMetin({
  baslik,
  guncelleme,
  children,
}: {
  baslik: string;
  guncelleme: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-celik-900 sm:text-4xl">{baslik}</h1>
      <p className="mt-3 text-sm text-celik-500">
        Son güncelleme:{" "}
        <time dateTime={guncelleme}>
          {new Date(guncelleme).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </p>
      <div className="mt-10 space-y-8 leading-relaxed text-celik-700">
        {children}
      </div>
    </div>
  );
}

export function Bolum({
  baslik,
  children,
}: {
  baslik: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-celik-900">{baslik}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
