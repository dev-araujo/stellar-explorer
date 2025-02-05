"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLedger } from "@/lib/stellar";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function LedgerPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["ledger", id],
    queryFn: () => fetchLedger(id as string),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className='text-red-500'>Error: {error.message}</p>;

  return (
    <div className='mx-auto p-6 gap-y-4 flex flex-col'>
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>Ledger Details</h2>
          <p>
            <strong>Ledger Sequence:</strong> {data.sequence}
          </p>
          <p>
            <strong>Ledger Hash:</strong> {data.hash}
          </p>
          <p>
            <strong>Previous Hash:</strong> {data.prev_hash}
          </p>
          <p>
            <strong>Closed At:</strong>{" "}
            {new Date(data.closed_at).toLocaleString()}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>Transactions</h2>
          <div className='flex gap-x-10'>
            <div className='gap-y-2 flex flex-col flex-auto'>
              <div className='flex justify-between'>
                <p>Successful Transactions</p>
                <p className='text-green-600'>
                  {data.successful_transaction_count}
                </p>
              </div>
              <div className='flex justify-between'>
                <p>Failed Transactions</p>
                <p className='text-red-600'>{data.failed_transaction_count}</p>
              </div>
              <div className='flex justify-between'>
                <p>Total Transactions</p>
                <strong>
                  {data.successful_transaction_count +
                    data.failed_transaction_count}
                </strong>
              </div>
            </div>
            <div className='gap-y-2 flex flex-col flex-auto'>
              <div className='flex justify-between'>
                <p>Operations</p>
                <strong>{data.tx_set_operation_count} / 1000</strong>
              </div>
            </div>
            <div className='gap-y-2 flex flex-col flex-auto'>
              <div className='flex justify-between'>
                <p>Base Fee</p>
                <strong>{data.base_fee_in_stroops}</strong>
              </div>
              <div className='flex justify-between'>
                <p>Fee Pool</p>
                <strong>{data.fee_pool}</strong>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
