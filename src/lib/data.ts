import { prisma } from "./prisma";
import type { SiteSettings } from "@/types";

export async function getSettings(): Promise<SiteSettings> {
  const settings = await prisma.siteSetting.findMany();
  const result: Record<string, string> = {};
  settings.forEach((s) => {
    result[s.key] = s.value;
  });
  return result as SiteSettings;
}

export async function getHeroSlides() {
  return prisma.heroSlide.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function getServices() {
  return prisma.service.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export async function getBlogPosts(limit?: number) {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { isActive: true },
  });
}

export async function getFAQs() {
  return prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getPage(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });
}
