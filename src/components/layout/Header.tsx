"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CallbackModal } from "@/components/shared/CallbackModal";

const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  {
    label: "Hizmetlerimiz",
    href: "/hizmetler",
  },
  { label: "Projeler", href: "/projeler" },
  { label: "Kentsel Dönüşüm", href: "/kentsel-donusum" },
  { label: "Blog", href: "/blog" },
  { label: "S.S.S", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              className={cn(
                "font-bold text-2xl transition-colors",
                scrolled
                  ? "text-gray-900 dark:text-white"
                  : "text-white"
              )}
            >
              <span className="text-amber-500">İNŞAAT</span> YAPI
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  scrolled
                    ? "text-gray-700 hover:text-amber-600 hover:bg-amber-50 dark:text-gray-300 dark:hover:text-amber-400"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCallbackOpen(true)}
              className={cn(
                "transition-colors",
                scrolled
                  ? "border-amber-500 text-amber-600 hover:bg-amber-50"
                  : "border-white/50 text-white hover:bg-white/10"
              )}
            >
              <Phone className="mr-2 h-4 w-4" />
              Sizi Arayalım
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  scrolled ? "text-gray-900" : "text-white"
                )}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <div className="font-bold text-xl mb-4">
                  <span className="text-amber-500">İNŞAAT</span> YAPI
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 py-2 border-b border-gray-100 dark:border-gray-800 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  onClick={() => {
                    setOpen(false);
                    setCallbackOpen(true);
                  }}
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Sizi Arayalım
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <CallbackModal open={callbackOpen} onOpenChange={setCallbackOpen} />
    </>
  );
}
