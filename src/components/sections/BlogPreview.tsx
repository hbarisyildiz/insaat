"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  publishedAt: Date | null;
}

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (!posts.length) return null;

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-amber-500 font-semibold uppercase tracking-wider mb-3">
            Blog
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            En Son Yazılar
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                  {post.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <CardContent className="p-5">
                    {post.publishedAt && (
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(post.publishedAt), "d MMMM yyyy", {
                          locale: tr,
                        })}
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog">
            <Button
              variant="outline"
              className="border-amber-500 text-amber-600 hover:bg-amber-50 px-8"
            >
              Tüm Yazılar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
