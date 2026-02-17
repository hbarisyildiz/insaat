import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug =
      body.slug ||
      slugify(body.title, { lower: true, strict: true, locale: "tr" });
    const post = await prisma.blogPost.create({
      data: {
        ...body,
        slug,
        publishedAt: body.isPublished ? new Date() : null,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
