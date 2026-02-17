import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug =
      body.slug ||
      slugify(body.title, { lower: true, strict: true, locale: "tr" });
    const service = await prisma.service.create({
      data: { ...body, slug },
    });
    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
