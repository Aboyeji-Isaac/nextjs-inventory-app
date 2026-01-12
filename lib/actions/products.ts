"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

type ActionState = { success: boolean; message: string } | null;

export async function deleteProduct(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const user = await getCurrentUser();
    const id = String(formData.get("id") || "");

    await prisma.product.deleteMany({
      where: { id: id, userId: user.id },
    });

    revalidatePath("/inventory");
    return { success: true, message: "Product deleted successfully" };
  } catch {
    return { success: false, message: "Failed to delete product" };
  }
}

export async function createProduct(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // Handle initial render when formData might be null
  if (!formData) {
    return null;
  }

  try {
    const user = await getCurrentUser();

    const parsed = ProductSchema.safeParse({
      name: formData.get("name"),
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      sku: formData.get("sku") || undefined,
      lowStockAt: formData.get("lowStockAt") || undefined,
    });

    if (!parsed.success) {
      return { 
        success: false, 
        message: "Validation failed: " + (parsed.error.issues[0]?.message || "Invalid input")
      };
    }

    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });
    
    revalidatePath("/inventory");
    return { 
      success: true, 
      message: "Product created successfully" 
    };
  } catch {
    return { 
      success: false, 
      message: "Failed to create product" 
    };
  }
}