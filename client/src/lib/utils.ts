/**
 * Utility functions for the application.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const rawUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
export const API_URL = rawUrl.endsWith("/api")
  ? rawUrl
  : `${rawUrl.replace(/\/$/, "")}/api`;

export function detectTextDirection(text: string) {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? "rtl" : "ltr";
}
