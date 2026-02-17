"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Image,
  Building2,
  Wrench,
  FileText,
  MessageSquare,
  HelpCircle,
  Mail,
  Settings,
  LogOut,
  Info,
  Landmark,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Hero Slider", href: "/admin/hero-slides", icon: Image },
  { label: "Projeler", href: "/admin/projeler", icon: Building2 },
  { label: "Hizmetler", href: "/admin/hizmetler", icon: Wrench },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Yorumlar", href: "/admin/yorumlar", icon: MessageSquare },
  { label: "S.S.S", href: "/admin/sss", icon: HelpCircle },
  { label: "İletişim Mesajları", href: "/admin/iletisim", icon: Mail },
  { label: "Site Ayarları", href: "/admin/ayarlar", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-40">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin/dashboard" className="font-bold text-xl">
          <span className="text-amber-500">İNŞAAT</span> YAPI
        </Link>
        <p className="text-gray-500 text-xs mt-1">Yönetim Paneli</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-2.5 text-sm transition-colors",
                isActive
                  ? "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-r-2 border-amber-500 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-amber-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-amber-600 transition-colors"
        >
          <Landmark className="h-4 w-4" />
          Siteyi Görüntüle
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
