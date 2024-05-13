import { z } from "zod";

export const courseByUserSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  description: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
});

export type courseByUserState =
  | {
      errors?: {
        email?: string[];
        name?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;
