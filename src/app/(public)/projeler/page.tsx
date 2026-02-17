import { PageHeader } from "@/components/shared/PageHeader";
import { getProjects } from "@/lib/data";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Tamamlanan ve devam eden inşaat projelerimiz.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        title="Projelerimiz"
        subtitle="Tamamlanan ve devam eden projelerimizi keşfedin"
      />
      <ProjectsGrid projects={projects} />
    </>
  );
}
