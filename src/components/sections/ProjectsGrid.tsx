"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  status: string;
  imageUrl: string;
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");

  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-3 mb-10">
          {[
            { key: "all" as const, label: "Tümü" },
            { key: "completed" as const, label: "Tamamlanan" },
            { key: "ongoing" as const, label: "Devam Eden" },
          ].map((item) => (
            <Button
              key={item.key}
              variant={filter === item.key ? "default" : "outline"}
              onClick={() => setFilter(item.key)}
              className={
                filter === item.key
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "border-gray-300"
              }
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              layout
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
                    <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
