"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, Send } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { toast } from "sonner";

export function ContactForm() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gönderim hatası");

      setSuccess(true);
      reset();
      toast.success("Mesajınız başarıyla gönderildi!");
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center py-12 gap-4 bg-green-50 dark:bg-green-950/30 rounded-2xl">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Mesajınız Gönderildi!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          En kısa sürede size dönüş yapacağız.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Adınız Soyadınız *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Adınız Soyadınız"
            className="mt-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">E-posta Adresiniz *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="ornek@email.com"
            className="mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Telefon Numaranız</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="0 (5XX) XXX XX XX"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="message">Mesajınız *</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Mesajınızı yazın..."
          rows={5}
          className="mt-1"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-amber-500 hover:bg-amber-600 text-white px-8"
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Gönder
      </Button>
    </form>
  );
}
