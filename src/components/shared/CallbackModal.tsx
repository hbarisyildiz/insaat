"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Loader2, CheckCircle } from "lucide-react";

interface CallbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CallbackModal({ open, onOpenChange }: CallbackModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: "callback@request.com",
          message: `Geri arama talebi - Telefon: ${formData.phone}`,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: "", phone: "" });
        onOpenChange(false);
      }, 2000);
    } catch {
      // handle error silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-amber-500" />
            Sizi Arayalım
          </DialogTitle>
          <DialogDescription>
            Bilgilerinizi bırakın, sizi en kısa sürede arayalım.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center py-8 gap-3">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="text-lg font-medium">Talebiniz alındı!</p>
            <p className="text-gray-500 text-sm">En kısa sürede sizi arayacağız.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cb-name">Adınız Soyadınız</Label>
              <Input
                id="cb-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div>
              <Label htmlFor="cb-phone">Telefon Numaranız</Label>
              <Input
                id="cb-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                placeholder="0 (5XX) XXX XX XX"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Phone className="mr-2 h-4 w-4" />
              )}
              Gönder
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
