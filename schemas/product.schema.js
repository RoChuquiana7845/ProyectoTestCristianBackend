import { z } from "zod";
 
export const createProductSchema = z.object({
  descripcion: z.string({required_error: "Descripcion is required",}),
  precio: z.number({required_error: "Precio es requerida",})
    .min(1,{message:"La nota debe ser como minimo 1 dolar",}),
  stock: z.number({required_error: "Stock es requerida"},)
    .min(1,{message:"La stock debe ser como minimo 1 dolar"},),
});