/**
 * Utility functions for the application.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

export function detectTextDirection(text: string) {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? "rtl" : "ltr";
}
