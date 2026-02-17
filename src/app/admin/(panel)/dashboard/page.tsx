"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  FileText,
  Mail,
  MessageSquare,
  Image,
  Wrench,
  HelpCircle,
  Users,
} from "lucide-react";

interface DashboardStats {
  projects: number;
  services: number;
  blogPosts: number;
  testimonials: number;
  faqs: number;
  messages: number;
  unreadMessages: number;
  heroSlides: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, services, blog, testimonials, faqs, messages, slides] =
          await Promise.all([
            fetch("/api/projeler").then((r) => r.json()),
            fetch("/api/hizmetler").then((r) => r.json()),
            fetch("/api/blog").then((r) => r.json()),
            fetch("/api/yorumlar").then((r) => r.json()),
            fetch("/api/sss").then((r) => r.json()),
            fetch("/api/iletisim").then((r) => r.json()),
            fetch("/api/hero-slides").then((r) => r.json()),
          ]);

        setStats({
          projects: projects.length,
          services: services.length,
          blogPosts: blog.length,
          testimonials: testimonials.length,
          faqs: faqs.length,
          messages: messages.length,
          unreadMessages: messages.filter(
            (m: Record<string, unknown>) => !m.isRead
          ).length,
          heroSlides: slides.length,
        });
      } catch {
        // handle silently
      }
    }
    loadStats();
  }, []);

  const cards = stats
    ? [
        { label: "Projeler", value: stats.projects, icon: Building2, color: "bg-blue-500" },
        { label: "Hizmetler", value: stats.services, icon: Wrench, color: "bg-green-500" },
        { label: "Blog Yazıları", value: stats.blogPosts, icon: FileText, color: "bg-purple-500" },
        { label: "Yorumlar", value: stats.testimonials, icon: MessageSquare, color: "bg-pink-500" },
        { label: "S.S.S", value: stats.faqs, icon: HelpCircle, color: "bg-cyan-500" },
        { label: "Hero Slider", value: stats.heroSlides, icon: Image, color: "bg-amber-500" },
        { label: "Mesajlar", value: stats.messages, icon: Mail, color: "bg-red-500" },
        { label: "Okunmamış", value: stats.unreadMessages, icon: Mail, color: "bg-orange-500" },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h1>

      {!stats ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center text-white`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {card.value}
                      </p>
                      <p className="text-gray-500 text-sm">{card.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
