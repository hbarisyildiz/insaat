import { PageHeader } from "@/components/shared/PageHeader";
import { getFAQs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description: "İnşaat, kentsel dönüşüm ve hizmetlerimiz hakkında sıkça sorulan sorular.",
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <>
      <PageHeader
        title="Sıkça Sorulan Sorular"
        subtitle="Merak ettiğiniz her şeyin cevabı burada"
      />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-3xl">
          {categories.map((cat) => {
            const categoryFaqs = faqs.filter((f) => f.category === cat);
            const categoryLabel =
              cat === "genel"
                ? "Genel"
                : cat === "kentsel-donusum"
                ? "Kentsel Dönüşüm"
                : cat === "finansman"
                ? "Finansman"
                : cat;

            return (
              <div key={cat} className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
                  {categoryLabel}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {categoryFaqs.map((faq) => (
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
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
