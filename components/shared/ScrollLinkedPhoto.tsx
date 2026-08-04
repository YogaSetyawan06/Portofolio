"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { Linkedin, Github, Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/socials";

interface SlotRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ScrollLinkedPhotoProps {
  heroSlotRef: React.RefObject<HTMLDivElement>;
  aboutSlotRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollLinkedPhoto({
  heroSlotRef,
  aboutSlotRef,
}: ScrollLinkedPhotoProps) {
  const [heroRect, setHeroRect] = useState<SlotRect | null>(null);
  const [aboutRect, setAboutRect] = useState<SlotRect | null>(null);
  const [scrollRange, setScrollRange] = useState<[number, number]>([0, 1]);

  // Measure both slots and calculate scroll range
  const measure = useCallback(() => {
    const heroEl = heroSlotRef.current;
    const aboutEl = aboutSlotRef.current;
    if (!heroEl || !aboutEl) return;

    const heroBox = heroEl.getBoundingClientRect();
    const aboutBox = aboutEl.getBoundingClientRect();
    const scrollY = window.scrollY;

    const heroAbsolute: SlotRect = {
      top: heroBox.top + scrollY,
      left: heroBox.left,
      width: heroBox.width,
      height: heroBox.height,
    };

    const aboutAbsolute: SlotRect = {
      top: aboutBox.top + scrollY,
      left: aboutBox.left,
      width: aboutBox.width,
      height: aboutBox.height,
    };

    setHeroRect(heroAbsolute);
    setAboutRect(aboutAbsolute);

    // Scroll range: from when Hero slot is at initial position
    // to when the About slot top aligns where it should be in viewport
    const start = heroAbsolute.top - window.innerHeight * 0.35;
    const end = aboutAbsolute.top - window.innerHeight * 0.35;
    setScrollRange([Math.max(0, start), end]);
  }, [heroSlotRef, aboutSlotRef]);

  useEffect(() => {
    // Initial measure after a short delay (for layout to settle)
    const timer = setTimeout(measure, 100);

    // Re-measure on resize
    const ro = new ResizeObserver(measure);
    if (heroSlotRef.current) ro.observe(heroSlotRef.current);
    if (aboutSlotRef.current) ro.observe(aboutSlotRef.current);

    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, heroSlotRef, aboutSlotRef]);

  // Scroll progress
  const { scrollY } = useScroll();

  const rawProgress = useTransform(
    scrollY,
    scrollRange,
    [0, 1],
    { clamp: true }
  );

  // Spring smoothing for organic feel
  const springConfig = { stiffness: 120, damping: 30, mass: 0.5 };
  const progress = useSpring(rawProgress, springConfig);

  // Interpolate CSS properties
  const top = useTransform(
    progress,
    [0, 1],
    [heroRect?.top ?? 0, aboutRect?.top ?? 0]
  );
  const left = useTransform(
    progress,
    [0, 1],
    [heroRect?.left ?? 0, aboutRect?.left ?? 0]
  );
  const width = useTransform(
    progress,
    [0, 1],
    [heroRect?.width ?? 400, aboutRect?.width ?? 300]
  );
  const height = useTransform(
    progress,
    [0, 1],
    [heroRect?.height ?? 500, aboutRect?.height ?? 375]
  );
  const borderRadius = useTransform(progress, [0, 1], [14, 32]);

  // Stacked cards fade-out
  const cardsOpacity = useTransform(progress, [0, 0.25], [1, 0]);
  const cardsSpring = useSpring(cardsOpacity, springConfig);

  // Social icons fade-in
  const iconsOpacity = useTransform(progress, [0.85, 1], [0, 1]);
  const iconsSpring = useSpring(iconsOpacity, springConfig);

  // We need to convert absolute top to viewport-relative for fixed positioning
  const fixedTop = useTransform(
    [top, scrollY] as MotionValue[],
    ([t, s]: number[]) => t - s
  );

  if (!heroRect || !aboutRect) {
    // Not measured yet — render nothing (prevents flash)
    return null;
  }

  return (
    <motion.div
      className="fixed z-20 overflow-hidden pointer-events-none"
      style={{
        top: fixedTop,
        left,
        width,
        height,
        borderRadius,
      }}
    >
      {/* Main photo */}
      <Image
        src="/images/profile.png"
        alt="Yoga Setyawan"
        fill
        className="object-cover object-top"
        sizes="(max-width: 1024px) 50vw, 400px"
        priority
      />

      {/* Gradient overlay at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.12), transparent)",
        }}
      />

      {/* Stacked cards (behind photo, visible at Hero position) */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: cardsSpring }}
      >
        {/* Back card 2 */}
        <div
          className="absolute inset-0 rounded-card"
          style={{
            background: "rgba(240, 241, 241, 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            transform: "rotate(6deg) translate(12px, -8px) scale(0.95)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        />
        {/* Back card 1 */}
        <div
          className="absolute inset-0 rounded-card"
          style={{
            background: "rgba(246, 246, 246, 0.7)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            transform: "rotate(3deg) translate(6px, -4px) scale(0.97)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        />
      </motion.div>

      {/* Social icons overlay (visible at About position) */}
      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-2.5 pointer-events-auto"
        style={{ opacity: iconsSpring }}
      >
        {SOCIAL_LINKS.map((social) => {
          let Icon = Linkedin;
          if (social.icon === "github") Icon = Github;
          if (social.icon === "instagram") Icon = Instagram;

          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-black/80 backdrop-blur-[10px] text-white"
              aria-label={social.name}
              whileHover={{ y: -6 }}
            >
              <Icon size={18} strokeWidth={2} />
            </motion.a>
          );
        })}
      </motion.div>

      {/* Border matching About photo style */}
      <motion.div
        className="absolute inset-0 border border-black/5"
        style={{ borderRadius }}
      />
    </motion.div>
  );
}
