import API from "@/lib/axiosInstance";
import { Coin } from "@/types/coin";

export const fetchMarketCoins = async (): Promise<Coin[]> => {
  try {
    const response = await API.get<Coin[]>("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc", // Ensures ranking by market cap
        per_page: 20,              // Get only top 20
        page: 1,                   // First page
        sparkline: false,          // Optional: disables sparkline data
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch market coins");
  }
};

//fetching coin by its
export const fetchCoinById = async (id: string): Promise<Coin> => {
  try {
    const response = await API.get<Coin[]>("/coins/markets", {
      params: {
        vs_currency: "usd",
        ids: id, // here you pass the coin ID like "bitcoin"
      },
    });

    if (!response.data.length) {
      throw new Error("Coin not found");
    }
    return response.data[0]; // return the first item (since it's an array)
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch coin");
  }
};

// fetchCoinMarketChart.ts
export const fetchCoinMarketChart = async (id: string) => {
  try {
    const response = await API.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: 7,
        interval: "daily", // can also use 'hourly' or 'daily'
      },
    });
    return response.data.prices; // This returns an array: [ [timestamp, price], ... ]
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch coin chart data");
  }
};

