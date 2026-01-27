/**
 * Utility functions for the application.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function detectTextDirection(text: string): 'ltr' | 'rtl' {
  if (!text) return 'ltr'

  console.log("Start detecting text direction...")
  
  // Arabic Unicode range: U+0600 to U+06FF
  const arabicPattern = /[\u0600-\u06FF]/
  
  return arabicPattern.test(text) ? 'rtl' : 'ltr'
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"