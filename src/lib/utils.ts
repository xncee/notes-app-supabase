import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LoremIpsum } from "lorem-ipsum";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const lorem = new LoremIpsum();
export const generateLoremIpsum = (sentences: number) => {
  const text = lorem.generateSentences(sentences);
  return text;
};

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date: string, hour24h = false) {
  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: !hour24h,
  });
}
