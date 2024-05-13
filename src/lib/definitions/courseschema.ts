import { z } from "zod";

export const courseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  description: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
});

export type courseState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;
