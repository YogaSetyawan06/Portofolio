"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Linkedin, Github, Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/socials";
import { Container } from "@/components/shared/Container";
import React from "react";

const STATS = [
  { value: "6+", label: "Months of IT Support" },
  { value: "4+", label: "Projects" },
  { value: "6", label: "Activities" },
  { value: "10+", label: "Tech Stacks" },
];

interface AboutProps {
  slotRef: React.RefObject<HTMLDivElement>;
  isDesktop: boolean;
}

export default function About({ slotRef, isDesktop }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:gap-8"
        >
          {/* Heading */}
          <div>
            <h2 className="text-section-lg tracking-tight leading-[1.1] font-heading">
              <span className="text-gray-400 font-medium">
                AI Enthusiast and Software
              </span>
              <br />
              <span className="text-black font-extrabold">Engineer.</span>
            </h2>
          </div>

          {/* Split 2 Kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Kiri: Foto Profil + Caption */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              {isDesktop ? (
                /* Desktop: invisible slot placeholder for ScrollLinkedPhoto */
                <div
                  ref={slotRef}
                  className="relative w-full aspect-[4/5] rounded-[32px]"
                  aria-hidden="true"
                />
              ) : (
                /* Mobile: static photo with social icons */
                <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-gray-100 shadow-sm border border-black/5">
                  <Image
                    src="/images/profile.png"
                    alt="Yoga Setyawan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />

                  {/* Static social icons overlay (mobile) */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2.5">
                    {SOCIAL_LINKS.map((social) => {
                      let Icon = Linkedin;
                      if (social.icon === "github") Icon = Github;
                      if (social.icon === "instagram") Icon = Instagram;

                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center w-11 h-11 rounded-full bg-black/80 backdrop-blur-[10px] text-white"
                          aria-label={social.name}
                        >
                          <Icon size={18} strokeWidth={2} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Caption Nama & Profesi */}
              <div className="px-2 py-4">
                <div className="text-xl font-bold text-black font-heading">
                  Yoga Setyawan
                </div>
                <div className="text-sm text-gray-500 font-medium mt-0.5 font-body">
                  Software Engineer & AI Enthusiast
                </div>
              </div>
            </div>

            {/* Kanan: Bio Text */}
            <div className="space-y-6 text-[19px] md:text-[20px] text-[#333333] leading-relaxed lg:col-span-7 lg:pt-2 font-body">
              <p>
                <strong className="text-black font-semibold">
                  My journey into
                </strong>{" "}
                technology began with a curiosity about how software and
                Artificial Intelligence can solve real-world problems. That
                curiosity has grown into a passion for developing intelligent,
                scalable, and user-centered applications.
              </p>
              <p>
                <strong className="text-black font-semibold">
                  I specialize in Artificial Intelligence and Full Stack
                  Development,
                </strong>{" "}
                building AI-powered chatbots, RAG systems, Computer Vision
                applications, and modern web platforms using technologies like
                Python, FastAPI, Next.js, LangChain, and Large Language Models.
              </p>
              <p>
                <strong className="text-black font-semibold">
                  Beyond technical development,
                </strong>{" "}
                my involvement in university organizations and collaborative
                projects has strengthened my leadership, communication, and
                teamwork skills. I enjoy continuous learning and building
                innovative software that creates meaningful impact.
              </p>

              {/* Stats Horizontal */}
              <div className="w-full mt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                  <motion.div
                    layout
                    className="flex flex-wrap items-center gap-2 max-w-full"
                  >
                    {STATS.map((stat) => (
                      <motion.div
                        key={stat.label}
                        layout
                        className="flex items-center gap-3 shrink-0 px-5 py-2.5 rounded-[99px] bg-white/10 backdrop-blur-md border-2 border-black/30 shadow-sm"
                      >
                        <span className="text-xl font-extrabold text-black font-heading">
                          {stat.value}
                        </span>
                        <span className="text-xs font-semibold text-gray-700 whitespace-nowrap font-body">
                          {stat.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
