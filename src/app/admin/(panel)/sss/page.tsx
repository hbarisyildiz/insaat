"use client";

import { AdminCrud, type FieldConfig } from "@/components/admin/AdminCrud";

const fields: FieldConfig[] = [
  { name: "question", label: "Soru", type: "text", required: true },
  { name: "answer", label: "Cevap", type: "textarea", required: true },
  {
    name: "category",
    label: "Kategori",
    type: "select",
    options: [
      { label: "Genel", value: "genel" },
      { label: "Kentsel Dönüşüm", value: "kentsel-donusum" },
      { label: "Finansman", value: "finansman" },
    ],
  },
  { name: "order", label: "Sıra", type: "number" },
];

export default function AdminFAQPage() {
  return (
    <AdminCrud
      title="Sıkça Sorulan Sorular"
      apiEndpoint="/api/sss"
      fields={fields}
    />
  );
}
