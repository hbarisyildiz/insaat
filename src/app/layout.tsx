import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "İnşaat Yapı | Kalite ve Güvenle Geleceğe İnşa Ediyoruz",
    template: "%s | İnşaat Yapı",
  },
  description:
    "İnşaat Yapı - Konut inşaatı, kentsel dönüşüm, ticari yapılar ve mimari tasarım hizmetleri. Kalite ve güvenle geleceğe inşa ediyoruz.",
  keywords: [
    "inşaat",
    "yapı",
    "konut",
    "kentsel dönüşüm",
    "mimari",
    "istanbul",
    "müteahhit",
    "proje",
  ],
  authors: [{ name: "İnşaat Yapı" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "İnşaat Yapı",
    title: "İnşaat Yapı | Kalite ve Güvenle Geleceğe İnşa Ediyoruz",
    description:
      "Konut inşaatı, kentsel dönüşüm, ticari yapılar ve mimari tasarım hizmetleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "İnşaat Yapı",
    description:
      "Konut inşaatı, kentsel dönüşüm, ticari yapılar ve mimari tasarım hizmetleri.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
