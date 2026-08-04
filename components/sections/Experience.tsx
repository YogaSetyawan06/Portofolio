"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/experience";
import { Container } from "@/components/shared/Container";

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-section font-heading text-black mb-12">Experience</h2>
          
          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row md:gap-16 items-start"
              >
                {/* Kiri: Nama Perusahaan Singkat + Panjang */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0 shrink-0">
                  <h3 className="text-xl font-bold text-black font-heading">{exp.company}</h3>
                  <p className="text-sm text-gray-500 mt-1 font-body">{exp.companyFullName}</p>
                </div>
                
                {/* Kanan: Role, Tanggal, Deskripsi */}
                <div className="w-full md:w-2/3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h4 className="text-lg font-semibold text-black font-heading">{exp.role}</h4>
                    <span className="text-sm font-medium text-gray-500 mt-1 sm:mt-0 font-body">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {exp.description.map((desc, i) => (
                      <p key={i} className="text-[16px] text-[#333333] leading-relaxed font-body">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
