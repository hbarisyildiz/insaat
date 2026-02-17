"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Hakkımızda"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-6 rounded-2xl shadow-xl hidden lg:block">
              <div className="text-4xl font-bold">30+</div>
              <div className="text-sm">Yıllık Deneyim</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-amber-500 font-semibold uppercase tracking-wider mb-3">
              Hakkımızda
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Güvenli ve Kaliteli Bir Yaşam İçin
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Firmamız, Türk inşaat sektörünün önde gelen firmalarından biri olarak,
              estetik, fonksiyonellik ve güvenilirlik açısından üstün kalitede mimari
              çözümler sunmaktadır.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Yıllar içinde kazandığı deneyim ve uzmanlık sayesinde, bugün İstanbul
              ve çevresindeki binaların dönüşümünde lider bir konumda
              bulunmaktadır.
            </p>
            <Link href="/hakkimizda">
              <Button
                variant="outline"
                className="border-amber-500 text-amber-600 hover:bg-amber-50 px-6"
              >
                Devamını Oku
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
