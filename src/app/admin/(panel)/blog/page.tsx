"use client";

import { AdminCrud, type FieldConfig } from "@/components/admin/AdminCrud";

const fields: FieldConfig[] = [
  { name: "title", label: "Başlık", type: "text", required: true },
  { name: "slug", label: "Slug (otomatik)", type: "text" },
  { name: "excerpt", label: "Özet", type: "textarea" },
  { name: "content", label: "İçerik", type: "textarea", required: true },
  { name: "imageUrl", label: "Görsel URL", type: "text" },
  { name: "isPublished", label: "Yayında", type: "boolean" },
];

export default function AdminBlogPage() {
  return (
    <AdminCrud title="Blog Yazıları" apiEndpoint="/api/blog" fields={fields} />
  );
}
