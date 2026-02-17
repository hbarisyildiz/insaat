import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) {
      return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const page = await prisma.page.upsert({
      where: { slug },
      update: { title: body.title, content: body.content },
      create: { slug, title: body.title, content: body.content },
    });
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
