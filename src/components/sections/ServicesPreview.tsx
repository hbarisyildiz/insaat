"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Home, Building2, Landmark, PenTool, ArrowRight, Shield, Award, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-8 w-8" />,
  Building2: <Building2 className="h-8 w-8" />,
  Landmark: <Landmark className="h-8 w-8" />,
  PenTool: <PenTool className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
  Award: <Award className="h-8 w-8" />,
  Headphones: <Headphones className="h-8 w-8" />,
};

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
}

export function ServicesPreview({ services }: { services: Service[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-amber-500 font-semibold uppercase tracking-wider mb-3">
            Hizmetlerimiz
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Neler Yapıyoruz?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/hizmetler/${service.slug}`}>
                <Card className="group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      {iconMap[service.icon || "Building2"] || (
                        <Building2 className="h-8 w-8" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <span className="text-amber-500 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Detaylar <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
