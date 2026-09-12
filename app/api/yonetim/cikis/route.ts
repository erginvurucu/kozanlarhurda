import { NextResponse } from "next/server";
import { oturumKapat } from "@/lib/yonetim";

export async function POST() {
  await oturumKapat();
  return NextResponse.json({ ok: true });
}
