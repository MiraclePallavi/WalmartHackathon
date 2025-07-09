import { z } from "zod";
export const signInSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
});

// Sign-up schema
export const signUpSchema = z.object({
  firstName:   z.string().min(3, "First name must be at least 3 characters"),
  lastName:    z.string().min(3, "Last name must be at least 3 characters"),
  phone:       z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be at most 15 digits"),
  email:       z.string().email(),
  password:    z.string().min(8),
});

export const twinFullSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  relationship: z.string().nonempty(),
  gender: z.string().nonempty(),
  dateOfBirth: z.coerce.date().optional(),
  interestsHobbies: z.array(z.string()).min(1),
  budgetRange: z
    .tuple([z.number().min(0), z.number().min(0)])
    .refine(([min, max]) => min <= max, { message: "Min must be ≤ max" }),
  personalityVibe: z.array(z.string()).min(1),
  favoriteColors: z.array(z.string()).optional(),
  isGiftingTwin: z.boolean(),
});

export type TwinFullInput = z.infer<typeof twinFullSchema>;