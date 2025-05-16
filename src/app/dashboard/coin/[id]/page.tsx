"use client";
import CoinDetailPage from "@/screens/coindetail/CoinDetailPage";
import { useParams } from "next/navigation";

export default function CoinPageWrapper() {
  const { id } = useParams();

  return <CoinDetailPage id={id as string} />;
}
