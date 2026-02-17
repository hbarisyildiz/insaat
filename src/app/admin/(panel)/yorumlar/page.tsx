"use client";

import { AdminCrud, type FieldConfig } from "@/components/admin/AdminCrud";

const fields: FieldConfig[] = [
  { name: "name", label: "İsim", type: "text", required: true },
  { name: "title", label: "Ünvan", type: "text" },
  { name: "content", label: "Yorum", type: "textarea", required: true },
  { name: "imageUrl", label: "Fotoğraf URL", type: "text" },
  { name: "isActive", label: "Aktif", type: "boolean" },
];

export default function AdminTestimonialsPage() {
  return (
    <AdminCrud
      title="Müşteri Yorumları"
      apiEndpoint="/api/yorumlar"
      fields={fields}
    />
  );
}
