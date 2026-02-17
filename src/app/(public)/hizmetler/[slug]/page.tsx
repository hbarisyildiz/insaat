import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { getServiceBySlug, getServices } from "@/lib/data";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Hizmet Bulunamadı" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      <PageHeader title={service.title} />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">
          {service.imageUrl && (
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-10">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
