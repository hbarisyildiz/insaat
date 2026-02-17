"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  status: string;
  imageUrl: string;
}

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
            Projelerimiz
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Öne Çıkan Projeler
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/projeler/${project.slug}`}>
                <div className="group relative rounded-2xl overflow-hidden h-[350px]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={
                        project.status === "completed"
                          ? "bg-green-500"
                          : "bg-amber-500"
                      }
                    >
                      {project.status === "completed"
                        ? "Tamamlandı"
                        : "Devam Ediyor"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-1 text-amber-400 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/projeler">
            <Button
              variant="outline"
              className="border-amber-500 text-amber-600 hover:bg-amber-50 px-8"
            >
              Tüm Projeler
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
