// components/CoinChart.tsx
"use client";

import { useCoin } from "@/hooks/useCoin";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function CoinChart() {
  const { id } = useParams() as { id: string };
  const { useCoinChart } = useCoin();
  const chartQuery = useCoinChart(id);

  const formatChartData = (data: [number, number][] | undefined) =>
    data
      ? data.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: Number(price.toFixed(2)),
        }))
      : [];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>7-Day Price Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {chartQuery.isLoading ? (
          <p>Loading chart...</p>
        ) : chartQuery.isError ? (
          <p>Failed to load chart</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formatChartData(chartQuery.data)}>
              <XAxis dataKey="date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
