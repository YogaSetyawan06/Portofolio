import { type ClassValue, clsx } from "clsx";

/**
 * Utility to merge Tailwind class names conditionally.
 * Lightweight replacement for `cn()` from shadcn — no twMerge dependency yet.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
