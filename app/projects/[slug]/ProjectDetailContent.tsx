"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Circle,
} from "lucide-react";
import type { Project } from "@/types";
import { Container } from "@/components/shared/Container";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { PageBackgroundLines } from "@/components/shared/PageBackgroundLines";
import { skills } from "@/data/skills";
import { getIconForTech } from "@/utils/iconResolver";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ProjectDetailContent({
  project,
}: {
  project: Project;
}) {
  // Gunakan gallery jika ada dan berisi gambar, jika tidak gunakan thumbnail
  const images =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.thumbnail];

  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Filter skills untuk mendapatkan pengelompokan kategori
  const projectTechCategories = skills
    .map((skillCategory) => {
      const matchingItems = skillCategory.items.filter((item) =>
        project.techStack?.includes(item.name),
      );
      return {
        category: skillCategory.category,
        items: matchingItems,
      };
    })
    .filter((category) => category.items.length > 0);

  return (
    <main className="min-h-screen bg-white pt-6 pb-24 relative overflow-hidden">
      <PageBackgroundLines />

      <Container className="relative z-10 flex flex-col gap-10 md:gap-12">
        {/* Head Section: Back link, Title, Summary, Carousel */}
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-6 max-w-4xl">
            <motion.div {...fadeUp(0)}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors w-fit group font-body"
              >
                <ArrowLeft
                  size={16}
                  className="transform group-hover:-translate-x-1 transition-transform"
                />
                <span>back to project</span>
              </Link>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-[1.1] font-heading uppercase"
            >
              {project.title}
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-lg md:text-xl text-gray-500 font-medium font-body leading-relaxed max-w-3xl"
            >
              {project.summary}
            </motion.p>
          </div>

          {/* Carousel */}
          <motion.div
            {...fadeUp(0.3)}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-gray-100 border border-black/5 group"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={images[imageIndex]}
                  alt={`${project.title} gallery image ${imageIndex + 1}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1080px"
                />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-md hover:scale-105 active:scale-95 transition-transform z-10"
                  onClick={() => paginate(-1)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-md hover:scale-105 active:scale-95 transition-transform z-10"
                  onClick={() => paginate(1)}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPage([idx, idx > imageIndex ? 1 : -1]);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === imageIndex
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>

        <SectionDivider />

        {/* Action Buttons (Full width, stacked) */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col gap-4 w-full">
          <a
            href={project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-black text-white rounded-full font-semibold font-body text-[15px] hover:scale-[1.01] hover:bg-black/90 active:scale-[0.99] transition-all shadow-md"
          >
            <Github size={20} />
            View on GitHub &rarr;
          </a>
          <a
            href={project.websiteUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-gray-100 text-black border border-black/10 rounded-full font-semibold font-body text-[15px] hover:scale-[1.01] hover:bg-gray-200 active:scale-[0.99] transition-all"
          >
            Visit Website &rarr;
          </a>
        </motion.div>

        <SectionDivider />

        {/* Overview */}
        <motion.div {...fadeUp(0.5)} className="w-full">
          <h3 className="text-2xl font-bold text-black font-heading mb-4">
            Overview
          </h3>
          <p className="text-[17px] text-[#333333] leading-relaxed font-body text-justify whitespace-pre-line">
            {project.overview || project.summary}
          </p>
        </motion.div>

        <SectionDivider />

        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full"
        >
          <h3 className="text-2xl font-bold text-black font-heading mb-4">
            Problem
          </h3>
          <p className="text-[17px] text-[#333333] leading-relaxed font-body text-justify whitespace-pre-line">
            {project.problem}
          </p>
        </motion.div>

        <SectionDivider />

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full"
        >
          <h3 className="text-2xl font-bold text-black font-heading mb-4">
            Solution
          </h3>
          <p className="text-[17px] text-[#333333] leading-relaxed font-body text-justify whitespace-pre-line">
            {project.solution}
          </p>
        </motion.div>

        <SectionDivider />

        {/* Tech Stack */}
        {projectTechCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full mb-8"
          >
            <h3 className="text-2xl font-bold text-black font-heading mb-8">
              Tech Stack
            </h3>

            <div className="flex flex-col gap-10">
              {projectTechCategories.map((categoryGroup) => (
                <div key={categoryGroup.category}>
                  {/* Header Kategori */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Circle
                        size={8}
                        className="fill-gray-400 text-gray-400"
                      />
                      <h4 className="text-sm font-bold text-black uppercase tracking-widest font-heading whitespace-nowrap">
                        {categoryGroup.category}
                      </h4>
                    </div>
                    {/* Garis Horizontal */}
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {/* Grid Item */}
                  <div className="flex flex-wrap gap-4">
                    {categoryGroup.items.map((skill, index) => {
                      const IconComponent = getIconForTech(skill.name);

                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.05,
                          }}
                          className="group flex flex-col items-center gap-3 w-[72px] sm:w-[88px]"
                        >
                          <div
                            className="
                            w-16 h-16 sm:w-20 sm:h-20 
                            bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] 
                            flex items-center justify-center 
                            border border-black/[0.04]
                            transition-all duration-300
                            group-hover:-translate-y-1 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]
                          "
                          >
                            {IconComponent ? (
                              <IconComponent className="text-3xl sm:text-4xl text-gray-800 transition-all duration-300 group-hover:text-black group-hover:translate-y-0.1 group-hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]" />
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-md" />
                            )}
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-800 text-center font-body leading-tight">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </main>
  );
}
