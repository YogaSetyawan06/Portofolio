"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { activities } from "@/data/activities";
import { Container } from "@/components/shared/Container";

export default function Activities() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Buka item pertama secara default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="activity" className="py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-section font-heading text-black mb-12">Activities</h2>
          
          <div className="border-t border-gray-400">
            {activities.map((activity, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="border-b border-gray-400">
                  {/* Header Trigger */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="
                      w-full py-6 flex items-center justify-between 
                      hover:bg-gray-100 transition-colors duration-200 
                      px-2 sm:px-4 rounded-sm outline-none
                      group text-left
                    "
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
                      {/* Logo Bulat */}
                      <div className="w-12 h-12 shrink-0 rounded-full bg-gray-200 border border-gray-300 overflow-hidden relative flex items-center justify-center">
                        {activity.logo ? (
                          <Image src={activity.logo} alt={`${activity.title} logo`} fill className="object-cover" />
                        ) : (
                          <span className="text-gray-500 font-bold text-lg font-heading">{activity.title.charAt(0)}</span>
                        )}
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <h3 
                          className={`
                            text-xl md:text-2xl tracking-tight transition-all duration-300 font-heading
                            ${isOpen ? 'text-black font-extrabold' : 'text-gray-900 font-bold'}
                          `}
                        >
                          {activity.title}
                        </h3>
                        <span className="text-sm md:text-base font-medium text-gray-500 font-body">
                          {activity.role}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 ml-4">
                      <ChevronDown 
                        size={24} 
                        className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-black" : ""}`} 
                      />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto", marginBottom: 32 },
                          collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden px-2 sm:px-4"
                      >
                        <div className="pt-2 pb-2">
                          {/* Description Bullets */}
                          <ul className="space-y-3 mb-8">
                            {activity.description.map((desc, i) => (
                              <li key={i} className="flex items-start gap-3 text-[16px] text-[#333333] leading-relaxed font-body">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Gallery Grid (if exists) */}
                          {activity.gallery && activity.gallery.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {activity.gallery.map((image, i) => (
                                <div 
                                  key={i} 
                                  className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border border-black/5"
                                >
                                  <Image
                                    src={image}
                                    alt={`Gallery image ${i + 1} for ${activity.title}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
