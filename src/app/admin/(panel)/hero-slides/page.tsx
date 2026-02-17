"use client";

import { AdminCrud, type FieldConfig } from "@/components/admin/AdminCrud";

const fields: FieldConfig[] = [
  { name: "title", label: "Başlık", type: "text", required: true },
  { name: "subtitle", label: "Alt Başlık", type: "text" },
  { name: "buttonText", label: "Buton Metni", type: "text" },
  { name: "buttonLink", label: "Buton Linki", type: "text" },
  { name: "imageUrl", label: "Görsel URL", type: "text", required: true },
  { name: "order", label: "Sıra", type: "number" },
  { name: "isActive", label: "Aktif", type: "boolean" },
];

export default function HeroSlidesPage() {
  return (
    <AdminCrud
      title="Hero Slider"
      apiEndpoint="/api/hero-slides"
      fields={fields}
    />
  );
}
