import { HeroSlider } from "@/components/sections/HeroSlider";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTASection } from "@/components/sections/CTASection";
import {
  getHeroSlides,
  getServices,
  getProjects,
  getTestimonials,
  getBlogPosts,
  getSettings,
} from "@/lib/data";

export default async function HomePage() {
  const [slides, services, projects, testimonials, posts, settings] =
    await Promise.all([
      getHeroSlides(),
      getServices(),
      getProjects(),
      getTestimonials(),
      getBlogPosts(3),
      getSettings(),
    ]);

  return (
    <>
      <HeroSlider slides={slides} />
      <AboutPreview />
      <StatsSection
        years={settings.experience_years}
        projects={settings.completed_projects}
        customers={settings.happy_customers}
      />
      <ServicesPreview services={services} />
      <ProjectsPreview projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreview posts={posts} />
      <CTASection />
    </>
  );
}
