// Zod validation for coach JSON
import { z } from "zod";

export const themeSchema = z.object({
  preset: z.enum(["navy-blue", "slate-orange", "white-green"]),
  background: z.string(),
  text: z.string(),
  accent: z.string(),
});

export const heroSchema = z.object({
  frameCountDesktop: z.number().default(150),
  frameCountMobile: z.number().default(80),
  beats: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      startProgress: z.number(), // 0.0 to 1.0
      endProgress: z.number(),
    })
  ),
});

export const coachSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  club: z.string(),
  tagline: z.string(),
  theme: themeSchema,
  hero: heroSchema,
});

export type Coach = z.infer<typeof coachSchema>;