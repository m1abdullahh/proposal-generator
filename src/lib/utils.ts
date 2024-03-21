import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface IPromptCompletion {
  prompt: string;
  completion: string;
}

export const CommonJobDescriptions: Array<IPromptCompletion> = [
  {
    prompt: "I need a lead generation expert...",
    completion:
      "Hi {Client}, I have over X years of experience in this field..",
  },
  {
    prompt: "B2B Sales Agent Needed...",
    completion:
      "Hi {Client}, I have over X years of experience in this field..",
  },
  {
    prompt: "Full Stack Mobile App Developer Urgent...",
    completion:
      "Hey! As a full stack app developer with over 6 years of experience, I beleive...",
  },
  {
    prompt: "VA for Shopify Store product listing...",
    completion:
      "Hi, I hope you're doing well! I have been working with Shopify store holder for more than X years now..",
  },
];
