
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to check if an element is in viewport
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return (
    rect.top <= windowHeight - offset &&
    rect.bottom >= 0 + offset
  );
}
