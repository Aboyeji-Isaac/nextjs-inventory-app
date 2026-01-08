import ProductChart from "@/components/product-chart";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  // Fetch all needed data
  const [totalProducts, lowStock, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: {
        userId,
        lowStockAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { 
        id: true,
        name: true,
        price: true,
        quantity: true,
        createdAt: true,
        lowStockAt: true
      },
    }),
  ]);
  console.log('Total products found:', totalProducts);
console.log('Products:', allProducts);

  // Make all numeric fields safe
  const safeProducts = allProducts.map(p => ({
    ...p,
    quantity: Number(p.quantity ?? 0),
    price: Number(p.price ?? 0),
    lowStockAt: p.lowStockAt ?? 5
  }));

  const totalValue = safeProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const inStockCount = safeProducts.filter(p => p.quantity > 5).length;
  const lowStockCount = safeProducts.filter(p => p.quantity > 0 && p.quantity <= 5).length;
  const outOfStockCount = safeProducts.filter(p => p.quantity === 0).length;

  const inStockPercentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
  const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
  const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

  // Weekly chart data (last 12 weeks)
  const now = new Date();
  const weeklyProductsData: { week: string; products: number }[] = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const label = `${String(weekStart.getMonth() + 1).padStart(2, "0")}/${String(weekStart.getDate()).padStart(2, "0")}`;

    const count = safeProducts.filter(p => {
      const d = new Date(p.createdAt);
      return d >= weekStart && d <= weekEnd;
    }).length;

    weeklyProductsData.push({ week: label, products: count });
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const safeRecent = recent.map(p => ({
    ...p,
    quantity: Number(p.quantity ?? 0),
    lowStockAt: p.lowStockAt ?? 5,
  }));

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl text-foreground">
          Here is an overview of your inventory.
        </h1>
      </div>

      {/* Metrics + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-black rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Key Metrics</h2>
          <div className="grid grid-cols-3 gap-6">
            <Metric label="Total Products"  value={totalProducts} trend={totalProducts}/>
            <Metric label="Total Value" value={`$${totalValue.toFixed(0)}`} trend={totalValue} />
            <Metric label="Low Stock" value={lowStock} trend={lowStock} />
          </div>
        </div>

        <div className="bg-black rounded-lg border p-6">
          <h2 className="font-semibold mb-6">New products per week</h2>
          <div className="h-48">
            <ProductChart data={weeklyProductsData} />
          </div>
        </div>
      </div>

      {/* Stock + Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Stock Levels</h2>
          <div className="space-y-3">
            {safeRecent.map(product => {
              const qty = product.quantity;
              const LOW_STOCK_THRESHOLD = 5;
              const stockLevel = qty === 0 ? 0 : qty <= LOW_STOCK_THRESHOLD ? 1 : 2;
              const bg = ["bg-red-600", "bg-yellow-600", "bg-green-600"];
              const text = ["text-red-600", "text-yellow-600", "text-green-600"];

              return (
                <div key={product.id} className="flex items-center justify-between bg-gray-950 border border-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${bg[stockLevel]}`} />
                    <span className="text-sm font-medium">{product.name}</span>
                  </div>
                  <span className={`text-sm font-medium ${text[stockLevel]}`}>
                    {qty} units
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-black rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Efficiency</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
              <div
                className="absolute inset-0 rounded-full border-8 border-green-600"
                style={{
                  clipPath:
                    "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">{inStockPercentage}%</div>
                  <div className="text-sm text-gray-60">In Stock</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-60">
            <Legend label="In Stock" value={inStockPercentage} color="bg-green-200" />
            <Legend label="Low Stock" value={lowStockPercentage} color="bg-green-600" />
            <Legend label="Out of Stock" value={outOfStockPercentage} color="bg-gray-200" />
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Helpers ---------- */

function Metric({ label, value, trend }: { label: string; value: string | number; trend?: number }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {trend !== undefined && (
        <div className="flex justify-center items-center mt-1 text-xs text-green-600">
          +{trend}
          <TrendingUp className="w-3 h-3 ml-1" />
        </div>
      )}
    </div>
  );
}

function Legend({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${color}`} />
        <span>
          {label} ({value}%)
        </span>
      </div>
    </div>
  );
}
