import Pagination from "@/components/pagination";
import { deleteProduct } from "@/lib/actions/products"
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>; // Changed to Promise
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams; // Await the promise
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 5;

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  /* ---------- Make products type-safe ---------- */
  const safeProducts = products.map((p) => ({
    ...p,
    quantity: Number(p.quantity ?? 0),
    price: Number(p.price ?? 0),
    lowStockAt: p.lowStockAt ?? 5,
  }));

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold">Inventory</h1>
        <p className="text-sm text-gray-500">
          Manage your products and track inventory levels.
        </p>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="bg-black rounded-lg border p-6">
          <form className="flex gap-2" action="/inventory" method="GET">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:outline-none"
            />
            <button className="px-6 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700">
              Search
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-black rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-950 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">SKU</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Low Stock At</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-900">
                {safeProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-950">
                    <td className="px-6 py-4 text-sm">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {product.lowStockAt}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <form
                        action={async (formData: FormData) => {
                          "use server";
                          await deleteProduct(formData);
                        }}
                      >
                        <input type="hidden" name="id" value={product.id} />
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-black rounded-lg border p-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/inventory"
              searchParams={{ q }}
            />
          </div>
        )}
      </div>
    </>
  );
}