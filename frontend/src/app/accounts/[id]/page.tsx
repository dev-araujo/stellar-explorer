/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAccount } from "@/lib/stellar";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["account", id],
    queryFn: () => fetchAccount(id as string),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className='text-red-500'>Error: {error.message}</p>;

  const handleAssetType = (assetType: string, assetCode: string) => {
    if (assetType === "native") {
      return "XLM";
    }

    if (assetType === "liquidity_pool_shares") {
      return "Liquidity Pool Shares";
    }

    return assetCode;
  };

  return (
    <div className='mx-auto p-6'>
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>Account Details</h2>
          <p>
            <strong>Account ID:</strong> {data?.id}
          </p>
          <p>
            <strong>Sequence:</strong> {data?.sequence}
          </p>
          <p className='font-semibold mt-4'>Balances:</p>
          <ul className='mt-2 space-y-1'>
            {data?.balances.map((bal: any, idx: number) => (
              <li key={idx} className='text-gray-600'>
                {handleAssetType(bal.asset_type, bal?.asset_code)}:{" "}
                {bal.balance}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
