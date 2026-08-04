"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/types";
import ContactDrawer from "./ContactDrawer";

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Activity", href: "#activity" },
];

const SCROLL_THRESHOLD = 100;

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

/** Buffering dot — staggered opacity pulse (§7.1) */
function BufferingDots() {
  return (
    <div className="flex items-center gap-[5px] px-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-[4px] h-[4px] rounded-full"
          style={{ backgroundColor: "var(--gray-800)" }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      setScrollDirection(direction);

      if (direction === "down" && currentScrollY > SCROLL_THRESHOLD) {
        setIsExpanded(false);
      } else if (direction === "up") {
        setIsExpanded(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Resolve display state: expanded if scroll-up OR hovering
  const showFull = isExpanded || isHovering;

  const handleMouseEnter = () => {
    if (!isExpanded) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Jika tidak berada di homepage, arahkan ke homepage beserta hash-nya
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      const navHeight = navRef.current?.offsetHeight || 64;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight + 36;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const openContact = () => {
    setIsMobileMenuOpen(false);
    setIsContactOpen(true);
  };

  return (
    <>
      {/* Flex centering wrapper — avoids transform-based centering
         which conflicts with Framer Motion layout animations */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          ref={navRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="pointer-events-auto"
          animate={{
            borderRadius: isMobileMenuOpen ? 20 : 99,
          }}
          transition={springTransition}
          style={{
            background: "rgba(255, 255, 255, 0.70)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-1 px-3 py-2">
            {/* ── Avatar + Name ── */}
            <button
              onClick={() => {
                if (pathname !== "/") {
                  router.push("/");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2.5 shrink-0 cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300/50">
                <Image
                  src="/images/profile.png"
                  alt="Yoga Setyawan"
                  fill
                  className="object-cover"
                  sizes="32px"
                  priority
                />
              </div>
              <span className="text-sm font-semibold text-black whitespace-nowrap">
                Yoga Setyawan
              </span>
            </button>

            {/* ── Desktop: Links + CTA (or buffering dots) ── */}
            <div className="hidden md:flex items-center">
              <AnimatePresence mode="wait">
                {showFull ? (
                  <motion.div
                    key="nav-links"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex items-center gap-1 overflow-hidden ml-1"
                  >
                    {NAV_LINKS.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="px-3 py-1.5 text-sm text-gray-700 hover:text-black
                                   rounded-full hover:bg-white/60 transition-colors
                                   whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                    ))}

                    {/* Contact CTA — glassmorphism white, subtle contrast */}
                    <button
                      onClick={openContact}
                      className="ml-1 px-4 py-1.5 text-sm font-medium text-black
                                 whitespace-nowrap rounded-full transition-all
                                 hover:shadow-md"
                      style={{
                        background: "rgba(240, 241, 241, 0.75)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      Contact
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="buffering"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <BufferingDots />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Mobile: Buffering Dots (tap to open) ── */}
            <div className="flex md:hidden items-center ml-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-full hover:bg-white/60 transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X size={18} className="text-black" />
                ) : (
                  <BufferingDots />
                )}
              </button>
            </div>
          </div>

          {/* ── Mobile Menu Dropdown ── */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden overflow-hidden border-t border-black/5"
              >
                <div className="flex flex-col px-4 py-3 gap-1">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left px-3 py-2.5 text-sm text-gray-700 hover:text-black
                                 rounded-xl hover:bg-white/60 transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={openContact}
                    className="mt-1 px-4 py-2.5 text-sm font-medium text-black
                               rounded-full transition-all text-center"
                    style={{
                      background: "rgba(240, 241, 241, 0.75)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    Contact
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
