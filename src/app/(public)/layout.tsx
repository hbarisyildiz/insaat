import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/shared/JsonLd";
import { getSettings } from "@/lib/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://insaatyapi.com.tr";

  return (
    <>
      <OrganizationJsonLd
        name={settings.site_name || "İnşaat Yapı"}
        url={baseUrl}
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
      />
      <LocalBusinessJsonLd
        name={settings.site_name || "İnşaat Yapı"}
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
      />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton phone={settings.whatsapp || "905551234567"} />
    </>
  );
}
