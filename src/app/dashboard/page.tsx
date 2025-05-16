"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { useCoin } from "@/hooks/useCoin";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function DashboardPage() {
  const { coinsQuery } = useCoin();
  const [searchTerm, setSearchTerm] = useState("");

  if (coinsQuery.isLoading) return <div>Loading...</div>;
  if (coinsQuery.isError) return <div>Error: {coinsQuery.error.message}</div>;

  const filteredCoins = coinsQuery.data?.filter((coin) => {
    const nameMatch = coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    const symbolMatch = coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || symbolMatch;
  });

  return (
    <div className="p-4  ">
      <div className="space-y-1 px-2 mb-3">
        <h2 className="text-xl md:text-3xl font-medium">Crypto Market Overview</h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search cryptocurrencies..."
          className="pl-10 w-full md:w-1/2 lg:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredCoins?.map((coin) => {
          const isPositive = coin.price_change_percentage_24h > 0;
          return (
            <Link href={`/dashboard/coin/${coin.id}`} key={coin.id} className="block">
            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="px-4 py-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={coin.image} alt="" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{coin.name}</h3>
                    <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-xl lg:text-2xl font-bold">${coin.current_price.toFixed(2)}</p>
                  </div>

                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium ${
                      isPositive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isPositive ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
