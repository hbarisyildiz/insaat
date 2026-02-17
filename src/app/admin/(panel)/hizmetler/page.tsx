"use client";

import { AdminCrud, type FieldConfig } from "@/components/admin/AdminCrud";

const fields: FieldConfig[] = [
  { name: "title", label: "Hizmet Adı", type: "text", required: true },
  { name: "slug", label: "Slug (otomatik)", type: "text" },
  { name: "description", label: "Açıklama", type: "textarea", required: true },
  { name: "icon", label: "İkon (Home, Building2, Landmark, PenTool)", type: "text" },
  { name: "imageUrl", label: "Görsel URL", type: "text" },
  { name: "order", label: "Sıra", type: "number" },
];

export default function AdminServicesPage() {
  return (
    <AdminCrud
      title="Hizmetler"
      apiEndpoint="/api/hizmetler"
      fields={fields}
    />
  );
}
