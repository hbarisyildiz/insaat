import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { getServices } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Home, Building2, Landmark, PenTool, Shield, Award, Headphones } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Konut inşaatı, kentsel dönüşüm, ticari yapılar ve mimari tasarım hizmetlerimiz.",
};

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-10 w-10" />,
  Building2: <Building2 className="h-10 w-10" />,
  Landmark: <Landmark className="h-10 w-10" />,
  PenTool: <PenTool className="h-10 w-10" />,
  Shield: <Shield className="h-10 w-10" />,
  Award: <Award className="h-10 w-10" />,
  Headphones: <Headphones className="h-10 w-10" />,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        title="Hizmetlerimiz"
        subtitle="En yüksek standartlarda inşaat ve mimarlık hizmetleri"
      />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link key={service.id} href={`/hizmetler/${service.slug}`}>
                <Card className="group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gray-50 dark:bg-gray-800">
                  <CardContent className="p-8 flex gap-6">
                    <div className="w-20 h-20 shrink-0 rounded-2xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      {iconMap[service.icon || "Building2"] || <Building2 className="h-10 w-10" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <span className="text-amber-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                        Detaylar <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
