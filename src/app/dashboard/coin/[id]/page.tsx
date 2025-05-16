"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useCoin } from "@/hooks/useCoin";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CoinDetailPage() {
  const { id } = useParams();
  const { useCoinById, useCoinChart } = useCoin();
  const coinQuery = useCoinById(id as string);
  const chartQuery = useCoinChart(id as string);

  if (coinQuery.isLoading) return <div>Loading coin...</div>;
  if (coinQuery.isError) return <div>Failed to load coin</div>;

  const coin = coinQuery.data;

  const formatChartData = (data: [number, number][] | undefined) =>
    data ? data.map(([timestamp, price]) => ({
      date: new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: Number(price.toFixed(2)),
    })) : [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      {/* top card with currency name and price  */}
      <Card className="mb-7">
        <div className="flex items-center gap-3 mx-3">
          <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={coin?.image || "/placeholder.png"}
              alt="loading image"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold">{coin?.name}</h1>
            <p className="text-muted-foreground">{coin?.symbol}</p>
          </div>
          <div className="ml-auto">
            <p className="text-muted-foreground font-medium">Current Price</p>
            <h2 className="text-xl md:text-3xl font-bold">${coin?.current_price.toFixed(2)}</h2>
            <div
              className={`mt-1 w-24 py-1 px-2 rounded-md text-sm font-medium flex justify-between items-center gap-1 ${
                coin!.price_change_percentage_24h > 0
                  ? "text-green-500 bg-green-100"
                  : "text-red-500 bg-red-100"
              }`}
            >
              {coin!.price_change_percentage_24h > 0 ? (
                <ChevronUp className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0" />
              )}
              {coin!.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        </div>
      </Card>

      {/* three carrd in center */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">${coin?.market_cap}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">${coin?.total_volume}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Circulating Supply
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              ${coin?.circulating_supply.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Card */}
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
    </div>
  );
}