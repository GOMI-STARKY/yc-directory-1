import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().min(1).max(500),
  category: z.string().min(1).max(500),
  link: z.string().url(),
  pitch: z.string().min(1),
});
