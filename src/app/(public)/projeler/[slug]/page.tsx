import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { MapPin, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const features = project.features?.split(",").map((f) => f.trim()) || [];
  const imageList = project.images?.split(",").map((i) => i.trim()) || [project.imageUrl];

  return (
    <>
      <PageHeader title={project.title} subtitle={project.location} />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {imageList.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {imageList.slice(0, 3).map((img, i) => (
                      <div
                        key={i}
                        className="relative h-32 rounded-xl overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Proje Hakkında
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            <div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sticky top-28">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Proje Detayları
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5 text-amber-500" />
                    <span>{project.location}</span>
                  </div>
                  <div>
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
                </div>

                {features.length > 0 && (
                  <>
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                      Özellikler
                    </h4>
                    <ul className="space-y-2">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
