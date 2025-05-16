"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex h-screen justify-center items-center">
      <Button onClick={()=>router.push('/dashboard')}>Go to Dashboard</Button>
    </div>
  );
}
