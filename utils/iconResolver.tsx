import * as SiIcons from "react-icons/si";
import * as VscIcons from "react-icons/vsc";
import * as DiIcons from "react-icons/di";
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as LucideIcons from "lucide-react";
import { skills } from "@/data/skills";

/**
 * Resolves a technology name to its corresponding icon component.
 * It looks up the name in the skills mapping first, then resolves the string icon name
 * to the actual React component.
 * 
 * @param techName The name of the technology (e.g., "React", "Next.js")
 * @returns The React component for the icon, or null if not found
 */
export function getIconForTech(techName: string) {
  // 1. Find the tech in the skills data
  let iconString: string | undefined;
  
  for (const category of skills) {
    const found = category.items.find((item) => item.name.toLowerCase() === techName.toLowerCase());
    if (found) {
      iconString = found.icon;
      break;
    }
  }

  if (!iconString) return null;

  // 2. Resolve the icon string to the component
  if (iconString.startsWith("Si")) {
    const IconComponent = (SiIcons as any)[iconString];
    return IconComponent || null;
  }

  if (iconString.startsWith("Vsc")) {
    const IconComponent = (VscIcons as any)[iconString];
    return IconComponent || null;
  }

  if (iconString.startsWith("Di")) {
    const IconComponent = (DiIcons as any)[iconString];
    return IconComponent || null;
  }

  if (iconString.startsWith("Tb")) {
    const IconComponent = (TbIcons as any)[iconString];
    return IconComponent || null;
  }

  if (iconString.startsWith("Bs")) {
    const IconComponent = (BsIcons as any)[iconString];
    return IconComponent || null;
  }

  if (iconString.startsWith("Fa")) {
    const IconComponent = (FaIcons as any)[iconString];
    return IconComponent || null;
  }
  
  if (iconString.startsWith("Lucide")) {
    // Remove "Lucide" prefix to match lucide-react exports
    const lucideName = iconString.replace("Lucide", "");
    const IconComponent = (LucideIcons as any)[lucideName];
    return IconComponent || null;
  }

  return null;
}
