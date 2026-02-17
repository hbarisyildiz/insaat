import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(slides);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slide = await prisma.heroSlide.create({ data: body });
    return NextResponse.json(slide, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
