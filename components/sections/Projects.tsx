"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Container } from "@/components/shared/Container";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Projects() {
  // Hanya ambil 4 project terbaru untuk di homepage
  const latestProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-section-lg font-heading font-extrabold text-black mb-16 tracking-tight">
            Latest Projects
          </h2>
        </motion.div>

        {/* Grid: 1 col mobile → 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {latestProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link 
            href="/projects"
            className="group relative inline-flex items-center gap-2 text-black font-medium text-lg hover:text-gray-600 transition-colors font-body"
          >
            View all my projects
            <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
