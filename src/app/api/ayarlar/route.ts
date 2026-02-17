import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.siteSetting.findMany();
  const result: Record<string, string> = {};
  settings.forEach((s) => {
    result[s.key] = s.value;
  });
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    for (const [key, value] of Object.entries(body)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
