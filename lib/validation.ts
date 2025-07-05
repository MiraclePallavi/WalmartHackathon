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

export const twinCreateSchema = z.object({
  title: z.string().min(3, "Title too short"),
  relationship: z.string().nonempty( "Please select a relationship"),
  gender: z.string().nonempty( "Please select a gender"),
  description: z.string().min(10, "Description too short"),
  dateOfBirth: z.date({
    required_error: "Please select a date of birth",
  }),
});