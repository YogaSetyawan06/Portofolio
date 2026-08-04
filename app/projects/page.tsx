"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Container } from "@/components/shared/Container";
import { PageBackgroundLines } from "@/components/shared/PageBackgroundLines";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-black pt-6 pb-24 relative overflow-hidden">
      <PageBackgroundLines />
      <Container className="relative z-10">
        {/* Back Link & Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-8 group font-body"
          >
            <ArrowLeft
              size={16}
              className="transform group-hover:-translate-x-1 transition-transform"
            />
            Back to home
          </Link>

          <h1 className="text-section-lg font-heading font-extrabold text-black tracking-tight">
            All Projects
          </h1>
        </motion.div>

        {/* Grid: 1 col mobile → 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </Container>
    </main>
  );
}
