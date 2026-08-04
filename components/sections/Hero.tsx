"use client";

import { motion } from "framer-motion";
import AnimatedDot from "@/components/shared/AnimatedDot";
import { Container } from "@/components/shared/Container";
import React from "react";

const fadeSlideUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

interface HeroProps {
  slotRef: React.RefObject<HTMLDivElement>;
  isDesktop: boolean;
}

export default function Hero({ slotRef, isDesktop }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left Column: Text Content ── */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Badge */}
            <motion.div {...fadeSlideUp(0)} className="flex">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.55)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(0, 0, 0, 0.15)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <AnimatedDot />
                <span className="text-sm font-medium text-black font-body">
                  Available for August &apos;25
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeSlideUp(0.1)}
              className="text-hero text-black leading-[1.08] tracking-tight font-heading"
            >
              Hi, I'm
              <br />
              <span className="text-gray-600">Yoga Setyawan</span>
            </motion.h1>

            {/* Body text */}
            <motion.p
              {...fadeSlideUp(0.2)}
              className="text-lg text-body max-w-lg leading-relaxed font-body"
            >
              <span className="font-semibold text-black">
                AI Engineer &amp; Fullstack Developer
              </span>{" "}
              — developing scalable AI-powered applications, intelligent
              automation, and modern web solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeSlideUp(0.3)}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <button
                onClick={() => handleScrollTo("#projects")}
                className="px-7 py-3.5 text-sm font-semibold text-white rounded-full
                           transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                           active:scale-[0.98] font-body"
                style={{
                  background: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                }}
              >
                View Projects
              </button>

              <a
                href="/YOGASETYAWAN-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 text-sm font-semibold text-black rounded-full
                           transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                           active:scale-[0.98] font-body"
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(0, 0, 0, 0.8)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                Get CV
              </a>
            </motion.div>
          </div>

          {/* ── Right Column: Photo Slot (Desktop) ── */}
          {isDesktop && (
            <div className="relative flex items-center justify-center order-1 lg:order-2">
              {/* Invisible placeholder slot — maintains same dimensions as original photo card */}
              <div
                ref={slotRef}
                className="relative w-full max-w-md aspect-[4/5]"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
