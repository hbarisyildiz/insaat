import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
});

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const heroSlideSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  subtitle: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  imageUrl: z.string().min(1, "Görsel zorunludur"),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  slug: z.string().optional(),
  description: z.string().min(1, "Açıklama zorunludur"),
  location: z.string().min(1, "Konum zorunludur"),
  status: z.enum(["ongoing", "completed"]).default("ongoing"),
  features: z.string().optional(),
  imageUrl: z.string().min(1, "Görsel zorunludur"),
  images: z.string().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  slug: z.string().optional(),
  description: z.string().min(1, "Açıklama zorunludur"),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().default(0),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  slug: z.string().optional(),
  content: z.string().min(1, "İçerik zorunludur"),
  excerpt: z.string().optional(),
  imageUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, "İsim zorunludur"),
  title: z.string().optional(),
  content: z.string().min(1, "Yorum zorunludur"),
  imageUrl: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const faqSchema = z.object({
  question: z.string().min(1, "Soru zorunludur"),
  answer: z.string().min(1, "Cevap zorunludur"),
  category: z.string().default("genel"),
  order: z.number().default(0),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
