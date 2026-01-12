import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormWithToast } from "@/components/form-with-toast";

export default async function AddProductPage() {
  await getCurrentUser();

  return (
    <>
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Add a new product to your inventory
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-black rounded-lg border p-6">
          <FormWithToast action={createProduct} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm mb-2">
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Enter product name"
                className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="quantity" className="block text-sm mb-2">
                  Quantity *
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                  className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm mb-2">
                  Price *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min={0}
                  required
                  placeholder="0.00"
                  className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sku" className="block text-sm mb-2">
                SKU (optional)
              </label>
              <input
                id="sku"
                name="sku"
                placeholder="Optional SKU"
                className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="lowStockAt" className="block text-sm mb-2">
                Low Stock Threshold (optional)
              </label>
              <input
                id="lowStockAt"
                name="lowStockAt"
                type="number"
                min={0}
                placeholder="5"
                className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <SubmitButton variant="primary" loadingText="Adding Product...">
                Add Product
              </SubmitButton>

              <Link
                href="/inventory"
                className="px-6 py-2 rounded-lg border border-gray-800 hover:bg-gray-950"
              >
                Cancel
              </Link>
            </div>
          </FormWithToast>
        </div>
      </div>
    </>
  );
}