import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { getPage, getTeamMembers, getSettings } from "@/lib/data";
import { StatsSection } from "@/components/sections/StatsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Firmamız hakkında detaylı bilgi, vizyonumuz, misyonumuz ve ekibimiz.",
};

export default async function AboutPage() {
  const [page, team, settings] = await Promise.all([
    getPage("hakkimizda"),
    getTeamMembers(),
    getSettings(),
  ]);

  const content = page ? JSON.parse(page.content) : {};

  return (
    <>
      <PageHeader title="Hakkımızda" subtitle="Güvenli ve kaliteli bir yaşam için" />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-500 font-semibold uppercase tracking-wider mb-3">
                Biz Kimiz
              </p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Firma Hikayemiz
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {content.story ||
                  "Firmamız, Türk inşaat sektörünün önde gelen firmalarından biri olarak yıllardır başarılı projelere imza atmaktadır."}
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Hakkımızda"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Vizyonumuz
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {content.vision ||
                  "Sürdürülebilir, estetik ve güvenli yapılar inşa ederek şehirlerin geleceğine katkıda bulunmak."}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Misyonumuz
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {content.mission ||
                  "Müşterilerimize en yüksek kalitede inşaat hizmeti sunarak, güvenli ve konforlu yaşam alanları oluşturmak."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection
        years={settings.experience_years}
        projects={settings.completed_projects}
        customers={settings.happy_customers}
      />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-amber-500 font-semibold uppercase tracking-wider mb-3">
              Ekibimiz
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Uzman Kadromuz
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-amber-100 group-hover:ring-amber-500 transition-all">
                  <Image
                    src={member.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {member.name}
                </h3>
                <p className="text-amber-500 text-sm">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
