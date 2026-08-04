"use client";

import { motion } from "framer-motion";
import {
  Circle,
  Eye,
  MessageSquare,
  Database,
  Link as LinkIcon,
  LineChart,
  Bot,
  Box,
} from "lucide-react";
import { skills } from "@/data/skills";
import { getIconForTech } from "@/utils/iconResolver";
import { Container } from "@/components/shared/Container";
import React from "react";

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Title (Optional but good for semantic structure, though user just wants categories. We can keep it if we want, or remove it. Let's keep it consistent with other sections. Wait, user reference didn't show a main title, just categories. But existing had "Technical Skills" h2. Let's keep a visually hidden or just standard heading to not break layout, or remove if user wants only categories. I will add an overarching h2 for SEO and consistency.) */}
          <h2 className="sr-only">Skills & Technologies</h2>

          <div className="flex flex-col gap-12">
            {skills.map((categoryGroup, categoryIndex) => (
              <div key={categoryGroup.category}>
                {/* Header Kategori */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Circle size={8} className="fill-gray-400 text-gray-400" />
                    <h3 className="text-sm font-bold text-black uppercase tracking-widest font-heading whitespace-nowrap">
                      {categoryGroup.category}
                    </h3>
                  </div>
                  {/* Garis Horizontal sisa lebar */}
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
      </Container>
    </section>
  );
}
