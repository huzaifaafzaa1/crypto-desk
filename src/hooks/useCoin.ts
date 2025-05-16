"use client";
import { useQuery} from "@tanstack/react-query";
import { fetchMarketCoins, fetchCoinById, fetchCoinMarketChart } from "@/services/coinService";
import { Coin } from "@/types/coin";

export const useCoin = () => {

  // Fetch all coins with auto refetch every 60 seconds
  const coinsQuery = useQuery({
    queryKey: ["market-coins"],
    queryFn: fetchMarketCoins,
    refetchInterval: 60000,       // after 60 seconds the data will be refetched
    staleTime: 60000,             // cache is fresh for 60 seconds
    refetchOnWindowFocus: true,   
  });

 // Fetch a single coin by ID
  const getCoinByIdQuery = (id: string | null) => {
    return useQuery<Coin>({
      queryKey: ["coin", id],
      queryFn: async () => {
        if (!id) throw new Error("Coin ID is required");
        return fetchCoinById(id);
      },
      enabled: !!id,
    });
  };

  // this function will get us the chart details
  const getCoinChartQuery = (id: string | null) => {
    return useQuery({
      queryKey: ["coin-chart", id],
      queryFn: async () => {
        if (!id) throw new Error("Coin ID is required");
        return fetchCoinMarketChart(id);
      },
      enabled: !!id,
    });
  };


  return {
    coinsQuery,
    getCoinByIdQuery,
    getCoinChartQuery
  };
};
