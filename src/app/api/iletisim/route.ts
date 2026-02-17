import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Zorunlu alanları doldurunuz" },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, message },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Bir hata oluştu" },
      { status: 500 }
    );
  }
}
