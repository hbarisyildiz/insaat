"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

const settingGroups = [
  {
    title: "Genel Bilgiler",
    fields: [
      { key: "site_name", label: "Site Adı" },
      { key: "site_description", label: "Site Açıklaması" },
    ],
  },
  {
    title: "İletişim Bilgileri",
    fields: [
      { key: "phone", label: "Telefon" },
      { key: "email", label: "E-posta" },
      { key: "address", label: "Adres" },
      { key: "whatsapp", label: "WhatsApp Numarası" },
    ],
  },
  {
    title: "Sosyal Medya",
    fields: [
      { key: "instagram", label: "Instagram" },
      { key: "facebook", label: "Facebook" },
      { key: "twitter", label: "Twitter / X" },
      { key: "youtube", label: "YouTube" },
      { key: "linkedin", label: "LinkedIn" },
    ],
  },
  {
    title: "İstatistikler",
    fields: [
      { key: "experience_years", label: "Deneyim Yılı" },
      { key: "completed_projects", label: "Tamamlanan Proje" },
      { key: "happy_customers", label: "Mutlu Müşteri" },
    ],
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/ayarlar");
      const data = await res.json();
      setSettings(data);
    } catch {
      toast.error("Ayarlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/ayarlar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      toast.success("Ayarlar kaydedildi");
    } catch {
      toast.error("Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Site Ayarları
        </h1>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Kaydet
        </Button>
      </div>

      <div className="grid gap-6">
        {settingGroups.map((group) => (
          <Card key={group.title} className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              {group.fields.map((field) => (
                <div key={field.key}>
                  <Label>{field.label}</Label>
                  <Input
                    value={settings[field.key] || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        [field.key]: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
