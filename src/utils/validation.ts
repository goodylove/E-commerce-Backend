import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  slug: z.string().optional(),
  description: z.string().min(10, "Description is too short"),
  price: z.number().positive("Price must be greater than zero"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  status: z.enum(["IN_STOCK", "OUT_OF_STOCK", "DISCONTINUED"]).optional(),
  imageUrl: z.string().optional(),
  categoryId: z.string({error:"Invalid category ID"}),
  brandId: z.string({error:'Invalid brand ID"'})
});
