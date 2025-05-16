import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCoin } from "@/hooks/useCoin";
import CoinChart from "./CoinChart";

type CoinDetailPageProps = {
  id: string;
};

export default function CoinDetailPage({ id }: CoinDetailPageProps) {
  const { useCoinById} = useCoin();
  const coinQuery = useCoinById(id);
 
  if (coinQuery.isLoading) return <div>Loading coin...</div>;
  if (coinQuery.isError) return <div>Failed to load coin</div>;

  const coin = coinQuery.data;

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

      {/* Top card with currency name and price */}
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
          <div className="ml-auto flex flex-col items-end">
            <p className="text-muted-foreground font-medium">Current Price</p>
            <h2 className="text-xl md:text-3xl font-bold">
              ${coin?.current_price.toFixed(2)}
            </h2>
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

      {/* Three cards in center */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              ${coin?.market_cap}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              ${coin?.total_volume}
            </div>
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

       {/* importing CoinChartcomponent */}
      <CoinChart/>
    </div>
  );
}
