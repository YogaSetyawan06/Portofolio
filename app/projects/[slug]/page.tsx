import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectDetailContent from "./ProjectDetailContent";

/* ───────────────────────────────────────────
   Static Params — pre-render all project slugs
   ─────────────────────────────────────────── */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* ───────────────────────────────────────────
   Dynamic Metadata
   ─────────────────────────────────────────── */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Yoga Setyawan`,
    description: project.summary,
  };
}

/* ───────────────────────────────────────────
   Page Component (Server)
   ─────────────────────────────────────────── */
export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return <ProjectDetailContent project={project} />;
}
