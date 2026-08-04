import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block w-full outline-none"
    >
      <div className="flex flex-col gap-6">
        {/* Thumbnail Container */}
        <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#1A1C1C]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[800ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content Container */}
        <div className="flex justify-between items-start gap-4 px-1">
          {/* Left: Title & Role */}
          <div className="flex flex-col gap-1">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-gray-500">
              {project.role}
            </p>
          </div>
          
          {/* Right: View Project + Animated Arrow */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors duration-300">
              View Project
            </span>
            <div className="relative w-5 h-5 overflow-hidden text-gray-500 opacity-60 group-hover:opacity-100 group-hover:text-black transition-all duration-300">
              <ArrowUpRight 
                size={20} 
                strokeWidth={1.5}
                className="absolute inset-0 transition-transform duration-500 ease-[0.4,0,0.2,1] group-hover:translate-x-full group-hover:-translate-y-full" 
              />
              <ArrowUpRight 
                size={20} 
                strokeWidth={1.5}
                className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 ease-[0.4,0,0.2,1] group-hover:translate-x-0 group-hover:translate-y-0" 
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
