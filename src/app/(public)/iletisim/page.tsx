import { PageHeader } from "@/components/shared/PageHeader";
import { getSettings } from "@/lib/data";
import { ContactForm } from "@/components/sections/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bizimle iletişime geçin. Adres, telefon ve iletişim formu.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="İletişim"
        subtitle="Size yardımcı olmaktan mutluluk duyarız"
      />

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Bize Mesaj Gönderin
              </h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                İletişim Bilgileri
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Phone className="h-6 w-6 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Telefon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {settings.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Mail className="h-6 w-6 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      E-posta
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {settings.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <MapPin className="h-6 w-6 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Adres
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {settings.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Clock className="h-6 w-6 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Çalışma Saatleri
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Pazartesi - Cumartesi: 09:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192698.54958631517!2d28.847329649999998!3d41.00523345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1704368000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Konum"
        />
      </section>
    </>
  );
}
