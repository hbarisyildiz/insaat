import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";
import { getSettings } from "@/lib/data";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="font-bold text-2xl text-white mb-4">
              <span className="text-amber-500">İNŞAAT</span> YAPI
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {settings.site_description || "Kalite ve güvenle geleceğe inşa ediyoruz"}
            </p>
            <div className="flex gap-3">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Hızlı Linkler</h3>
            <ul className="space-y-3">
              {[
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "Hizmetlerimiz", href: "/hizmetler" },
                { label: "Projeler", href: "/projeler" },
                { label: "Kentsel Dönüşüm", href: "/kentsel-donusum" },
                { label: "Blog", href: "/blog" },
                { label: "İletişim", href: "/iletisim" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {[
                "Konut İnşaatı",
                "Kentsel Dönüşüm",
                "Ticari Yapılar",
                "Mimari Tasarım",
              ].map((item) => (
                <li key={item}>
                  <span className="hover:text-amber-400 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.email}</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} İnşaat Yapı. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/gizlilik" className="hover:text-amber-400 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/cerez" className="hover:text-amber-400 transition-colors">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
