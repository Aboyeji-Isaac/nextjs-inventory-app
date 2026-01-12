"use client";

import { deleteProduct } from "@/lib/actions/products";
import { SubmitButton } from "./submit-button";
import { FormWithToast } from "@/components/form-with-toast";

export function DeleteProductButton({ productId }: { productId: string }) {
  return (
    <FormWithToast action={deleteProduct}>
      <input type="hidden" name="id" value={productId} />
      <SubmitButton variant="danger" loadingText="Deleting...">
        Delete
      </SubmitButton>
    </FormWithToast>
  );
}