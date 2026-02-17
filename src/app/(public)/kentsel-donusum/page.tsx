import { PageHeader } from "@/components/shared/PageHeader";
import { getPage, getFAQs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, CheckCircle } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kentsel Dönüşüm",
  description: "Kentsel dönüşüm süreci, avantajları ve firmamızın sunduğu güvence.",
};

export default async function KentselDonusumPage() {
  const [page, faqs] = await Promise.all([
    getPage("kentsel-donusum"),
    getFAQs(),
  ]);

  const content = page ? JSON.parse(page.content) : {};
  const kentselFaqs = faqs.filter((f) => f.category === "kentsel-donusum" || f.category === "genel");
  const steps: string[] = content.steps || [
    "Risk Raporu Alınması",
    "2/3 Çoğunluk Kararı",
    "Proje Tasarımı",
    "Finansman Planlaması",
    "Yıkım ve İnşaat",
    "Teslim ve Taşınma",
  ];

  return (
    <>
      <PageHeader
        title="Kentsel Dönüşüm"
        subtitle="Güvenli geleceğiniz için kentsel dönüşüm"
      />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            {content.intro ||
              "Kentsel dönüşüm, risk altındaki yapıların yıkılıp modern standartlara uygun olarak yeniden inşa edilmesi sürecidir."}
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-amber-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Güvence
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {content.guarantee ||
                    "Tüm projelerimizi, işbirliği yaptığımız bankaların finansman garantisi altına alarak, mal sahiplerinin riskini sıfıra indiriyoruz."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-14">
            Süreç Adımları
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-amber-200 dark:bg-amber-800 hidden md:block" />
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg relative z-10">
                    {i + 1}
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {step}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {kentselFaqs.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
              Sıkça Sorulan Sorular
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {kentselFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl border-0 px-6"
                >
                  <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
