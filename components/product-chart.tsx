"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ChartData = {
  week: string;
  products: number;
};

export default function ProductChart({ data }: { data: ChartData[] }) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Grid */}
          <CartesianGrid
            stroke="#1f2937" // gray-800
            strokeDasharray="3 3"
          />

          {/* X Axis */}
          <XAxis
            dataKey="week"
            stroke="#6b7280" // gray-500
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />

          {/* Y Axis */}
          <YAxis
            stroke="#6b7280"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            allowDecimals={false}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#030712", // gray-950
              border: "1px solid #14532d", // green-900
              borderRadius: "8px",
              color: "#e5e7eb",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#22c55e" }} // green-500
            cursor={{ stroke: "#22c55e", strokeDasharray: "3 3" }}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="products"
            stroke="#16a34a" // green-600
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#16a34a",
              stroke: "#052e16", // dark green
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#22c55e",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
