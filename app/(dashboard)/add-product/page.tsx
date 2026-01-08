import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function AddProductPage() {
  await getCurrentUser(); // ensures auth

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold">Add Product</h1>
        <p className="text-sm text-gray-500">
          Add a new product to your inventory
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <div className="bg-black rounded-lg border p-6">
          <form action={createProduct} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm mb-2">Product Name *</label>
              <input
                name="name"
                required
                placeholder="Enter product name"
                className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
              />
            </div>

            {/* Quantity + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Quantity *</label>
                <input
                  name="quantity"
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                  className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Price *</label>
                <input
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

            {/* SKU */}
            <div>
              <label className="block text-sm mb-2">SKU (optional)</label>
              <input
                name="sku"
                placeholder="Optional SKU"
                className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
              />
            </div>

            {/* Low stock */}
            <div>
              <label className="block text-sm mb-2">
                Low Stock Threshold (optional)
              </label>
              <input
                name="lowStockAt"
                type="number"
                min={0}
                placeholder="5"
                className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700"
              >
                Add Product
              </button>

              <Link
                href="/inventory"
                className="px-6 py-2 rounded-lg border border-gray-800 hover:bg-gray-950"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
