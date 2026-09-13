"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, telLink, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Cta";

/**
 * Mobil menu.
 *
 * Masaustu menusu `hidden md:flex` ile gizleniyordu ama mobil karsiligi
 * yoktu; telefondan giren ziyaretci ust menudeki hicbir sayfaya
 * ulasamiyordu. Bu nisde trafigin buyuk bolumu mobil oldugu icin
 * kritik bir eksikti.
 *
 * Erisilebilirlik: aria-expanded/aria-controls, Escape ile kapanma,
 * acikken arka planin kaydirilmamasi ve rota degisiminde otomatik
 * kapanma.
 */
export function MobilMenu({
  menu,
}: {
  menu: { ad: string; href: string }[];
}) {
  const [acik, setAcik] = useState(false);
  const yol = usePathname();
  const dugmeRef = useRef<HTMLButtonElement>(null);

  // Rota degisince kapan - link tiklandiginda menu acik kalmasin.
  useEffect(() => {
    setAcik(false);
  }, [yol]);

  // Escape ile kapat, odagi butona geri ver.
  useEffect(() => {
    if (!acik) return;
    const f = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAcik(false);
        dugmeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", f);
    return () => document.removeEventListener("keydown", f);
  }, [acik]);

  // Acikken arka plan kaymasin.
  useEffect(() => {
    if (!acik) return;
    const onceki = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = onceki;
    };
  }, [acik]);

  return (
    <div className="md:hidden">
      <button
        ref={dugmeRef}
        type="button"
        onClick={() => setAcik((o) => !o)}
        aria-expanded={acik}
        aria-controls="mobil-menu"
        aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
        className="flex h-11 w-11 items-center justify-center border-2 border-kurum-300 text-lacivert-900 transition-colors hover:border-lacivert-600"
      >
        {acik ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {acik && (
        <>
          {/* Arka plan - tiklayinca kapanir */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setAcik(false)}
            /* z-30, header'in z-40'inin altinda kalir; boylece basligi
               karartmadan sayfanin kalanini kapatir. */
            className="fixed inset-0 z-30 cursor-default bg-lacivert-950/40"
          />

          <nav
            id="mobil-menu"
            aria-label="Ana menü"
            className="absolute inset-x-0 top-full z-40 border-b border-kurum-200 bg-white shadow-lg"
          >
            <ul className="flex flex-col px-4 pb-2 pt-1">
              {menu.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="block border-b border-kurum-200 py-4 text-[17px] font-medium text-lacivert-900"
                  >
                    {m.ad}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2.5 px-4 pb-5 pt-3">
              <a
                href={telLink}
                data-cta="tel"
                className="dugme dugme-ana w-full px-5 py-3.5"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                <span className="rakam">{site.phoneDisplay}</span>
              </a>
              <a
                href={waLink("Merhaba, hurda satmak istiyorum.")}
                data-cta="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="dugme dugme-whatsapp w-full px-5 py-3.5"
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
                WhatsApp&apos;tan sor
              </a>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
