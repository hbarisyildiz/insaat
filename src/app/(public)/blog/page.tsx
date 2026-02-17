import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { getBlogPosts } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "İnşaat sektörü hakkında güncel blog yazıları ve haberler.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="İnşaat sektörü hakkında güncel yazılar"
      />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">Henüz blog yazısı bulunmamaktadır.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 dark:bg-gray-800">
                    {post.imageUrl && (
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      {post.publishedAt && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(post.publishedAt), "d MMMM yyyy", {
                            locale: tr,
                          })}
                        </div>
                      )}
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="text-amber-500 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Devamını Oku <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
