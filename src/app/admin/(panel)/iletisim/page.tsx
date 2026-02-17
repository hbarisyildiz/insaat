"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/iletisim");
      const data = await res.json();
      setMessages(data);
    } catch {
      toast.error("Mesajlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const viewMessage = (msg: Message) => {
    setSelected(msg);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        İletişim Mesajları
      </h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white dark:bg-gray-900 rounded-xl">
          Henüz mesaj bulunmamaktadır.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İsim</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="w-24">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell className="font-medium">{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell>{msg.phone || "-"}</TableCell>
                  <TableCell>
                    {format(new Date(msg.createdAt), "d MMM yyyy", {
                      locale: tr,
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={msg.isRead ? "secondary" : "default"}>
                      {msg.isRead ? "Okundu" : "Yeni"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => viewMessage(msg)}
                      className="h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mesaj Detayı</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 mt-4">
              <div>
                <span className="text-sm text-gray-500">İsim:</span>
                <p className="font-medium">{selected.name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">E-posta:</span>
                <p>{selected.email}</p>
              </div>
              {selected.phone && (
                <div>
                  <span className="text-sm text-gray-500">Telefon:</span>
                  <p>{selected.phone}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500">Mesaj:</span>
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-1">
                  {selected.message}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Tarih:</span>
                <p>
                  {format(new Date(selected.createdAt), "d MMMM yyyy HH:mm", {
                    locale: tr,
                  })}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
