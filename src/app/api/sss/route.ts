import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const faq = await prisma.fAQ.create({ data: body });
    return NextResponse.json(faq, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
