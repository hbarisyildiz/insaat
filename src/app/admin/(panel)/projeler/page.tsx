"use client";

import { AdminCrud, type FieldConfig } from "@/components/admin/AdminCrud";

const fields: FieldConfig[] = [
  { name: "title", label: "Proje Adı", type: "text", required: true },
  { name: "slug", label: "Slug (otomatik)", type: "text" },
  { name: "description", label: "Açıklama", type: "textarea", required: true },
  { name: "location", label: "Konum", type: "text", required: true },
  {
    name: "status",
    label: "Durum",
    type: "select",
    options: [
      { label: "Devam Ediyor", value: "ongoing" },
      { label: "Tamamlandı", value: "completed" },
    ],
  },
  { name: "features", label: "Özellikler (virgülle ayırın)", type: "text" },
  { name: "imageUrl", label: "Ana Görsel URL", type: "text", required: true },
  { name: "images", label: "Ek Görseller (virgülle ayırın)", type: "text" },
];

export default function AdminProjectsPage() {
  return (
    <AdminCrud
      title="Projeler"
      apiEndpoint="/api/projeler"
      fields={fields}
    />
  );
}
