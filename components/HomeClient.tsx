"use client";

import { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Activities from "@/components/sections/Activities";
import Footer from "@/components/layout/Footer";
import ScrollLinkedPhoto from "@/components/shared/ScrollLinkedPhoto";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { SectionDivider } from "@/components/shared/SectionDivider";
import { PageBackgroundLines } from "@/components/shared/PageBackgroundLines";

export default function HomeClient() {
  const heroSlotRef = useRef<HTMLDivElement>(null);
  const aboutSlotRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      {/* Scroll-linked photo — only on desktop */}
      {isDesktop && (
        <ScrollLinkedPhoto
          heroSlotRef={heroSlotRef}
          aboutSlotRef={aboutSlotRef}
        />
      )}

      <Navbar />
      <main className="min-h-screen relative overflow-hidden">
        <PageBackgroundLines />

        <Hero slotRef={heroSlotRef} isDesktop={isDesktop} />
        <SectionDivider />
        <About slotRef={aboutSlotRef} isDesktop={isDesktop} />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Activities />
      </main>
      <Footer />
    </>
  );
}
