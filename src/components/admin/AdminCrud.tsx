"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "select";
  options?: { label: string; value: string }[];
  required?: boolean;
  showInTable?: boolean;
}

interface AdminCrudProps {
  title: string;
  apiEndpoint: string;
  fields: FieldConfig[];
  idField?: string;
}

export function AdminCrud({
  title,
  apiEndpoint,
  fields,
  idField = "id",
}: AdminCrudProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Veriler yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditingItem(null);
    const defaults: Record<string, unknown> = {};
    fields.forEach((f) => {
      defaults[f.name] = f.type === "boolean" ? false : f.type === "number" ? 0 : "";
    });
    setFormData(defaults);
    setDialogOpen(true);
  };

  const openEdit = (item: Record<string, unknown>) => {
    setEditingItem(item);
    const data: Record<string, unknown> = {};
    fields.forEach((f) => {
      data[f.name] = item[f.name] ?? (f.type === "boolean" ? false : "");
    });
    setFormData(data);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingItem
        ? `${apiEndpoint}/${editingItem[idField]}`
        : apiEndpoint;
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      toast.success(editingItem ? "Güncellendi" : "Oluşturuldu");
      setDialogOpen(false);
      fetchItems();
    } catch {
      toast.error("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: Record<string, unknown>) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await fetch(`${apiEndpoint}/${item[idField]}`, { method: "DELETE" });
      toast.success("Silindi");
      fetchItems();
    } catch {
      toast.error("Silinemedi");
    }
  };

  const tableFields = fields.filter((f) => f.showInTable !== false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <Button onClick={openCreate} className="bg-amber-500 hover:bg-amber-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Yeni Ekle
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white dark:bg-gray-900 rounded-xl">
          Henüz kayıt bulunmamaktadır.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {tableFields.slice(0, 4).map((f) => (
                  <TableHead key={f.name}>{f.label}</TableHead>
                ))}
                <TableHead className="w-24">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={i}>
                  {tableFields.slice(0, 4).map((f) => (
                    <TableCell key={f.name} className="max-w-xs truncate">
                      {f.type === "boolean"
                        ? item[f.name]
                          ? "Evet"
                          : "Hayır"
                        : String(item[f.name] ?? "-")}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(item)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(item)}
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Düzenle" : "Yeni Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {fields.map((field) => (
              <div key={field.name}>
                {field.type === "boolean" ? (
                  <div className="flex items-center justify-between">
                    <Label>{field.label}</Label>
                    <Switch
                      checked={!!formData[field.name]}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, [field.name]: checked })
                      }
                    />
                  </div>
                ) : field.type === "textarea" ? (
                  <>
                    <Label>{field.label}</Label>
                    <Textarea
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      rows={4}
                      className="mt-1"
                    />
                  </>
                ) : field.type === "select" ? (
                  <>
                    <Label>{field.label}</Label>
                    <select
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      className="mt-1 w-full border rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <Label>{field.label}</Label>
                    <Input
                      type={field.type === "number" ? "number" : "text"}
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]:
                            field.type === "number"
                              ? Number(e.target.value)
                              : e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </>
                )}
              </div>
            ))}
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingItem ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
