import { z } from "zod";

export const registerSchema = z.object({
  nameuser: z.string({ required_error: "Name user is requerido" }),
  email: z
    .string({ required_error: "Email is requerido" })
    .email({ message: "Email no es valido" }),
  password: z
    .string({ required_error: "Password is requerido" })
    .min(7, { message: "Password minimo 7 caracteres" }),
});

export const loginSchema = z.object({
  nameuser: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
});
