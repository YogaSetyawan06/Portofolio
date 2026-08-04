"use client";

import { Linkedin, Github, Instagram, Twitter } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SOCIAL_LINKS } from "@/data/socials";
import { Container } from "@/components/shared/Container";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (href: string) => {
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      const navHeight = 64;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight + 36;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "linkedin":
        return <Linkedin size={20} strokeWidth={1.5} />;
      case "github":
        return <Github size={20} strokeWidth={1.5} />;
      case "instagram":
        return <Instagram size={20} strokeWidth={1.5} />;
      case "twitter":
        return <Twitter size={20} strokeWidth={1.5} />;
      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-black text-white pt-16 overflow-hidden relative">
      <Container className="relative z-10">
        {/* Header Typography */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-section-lg font-heading font-extrabold tracking-tight leading-tight">
            <span className="text-white block">Let&apos;s build</span>
            <span className="text-gray-500 block">
              something great together.
            </span>
          </h2>
        </div>

        {/* 2-Column Info Row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-32 mb-10 text-center md:text-left items-center md:items-start">
          {/* Email */}
          <div>
            <p className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-widest font-body">
              Email
            </p>
            <a
              href="mailto:setiawanyoga212@gmail.com"
              className="text-xl md:text-2xl font-bold hover:text-gray-300 transition-colors inline-block font-heading"
            >
              setiawanyoga212@gmail.com
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-widest font-body">
              Social
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white text-black rounded-full hover:bg-gray-300 transition-transform hover:scale-105"
                  aria-label={social.name}
                >
                  {renderIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t-2 border-white mb-6" />

        {/* Menu & Copyright Row */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 pb-4 md:pb-6">
          {/* Menu */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest font-body">
              Menu
            </p>
            <div className="flex gap-12">
              {/* Kolom 1 */}
              <div className="flex flex-col items-center md:items-start gap-3">
                {["About", "Experience", "Projects"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(`#${item.toLowerCase()}`)}
                    className="text-sm font-medium text-white hover:text-gray-500 transition-colors font-body"
                  >
                    {item}
                  </button>
                ))}
              </div>
              {/* Kolom 2 */}
              <div className="flex flex-col items-center md:items-start gap-3">
                {["Skills", "Activity"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(`#${item.toLowerCase()}`)}
                    className="text-sm font-medium text-white hover:text-gray-500 transition-colors font-body"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Copyright */}
          <div className="text-sm font-medium text-gray-500 font-body">
            © 2026 Yoga Setyawan
          </div>
        </div>
      </Container>

      {/* BIG TYPOGRAPHY YOGA */}
      <div className="relative pointer-events-none select-none flex justify-center w-full -mt-6 md:-mt-12">
        <h1
          className="text-footer-big font-heading font-black leading-none text-white tracking-tighter"
          style={{
            marginBottom: "-5vw",
            maskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 100%)",
            opacity: 0.95,
          }}
        >
          YOGA
        </h1>
      </div>
    </footer>
  );
}
