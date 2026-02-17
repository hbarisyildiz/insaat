import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <PageHeader title={post.title} />

      <article className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 text-amber-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tüm Yazılar
            </Button>
          </Link>

          {post.publishedAt && (
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: tr })}
            </div>
          )}

          {post.imageUrl && (
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split("\n").map((paragraph, i) => (
              <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
