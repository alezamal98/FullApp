import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get CSS variable values
export function getCSSVariable(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name)
} 