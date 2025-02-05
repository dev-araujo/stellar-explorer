"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTransaction } from "@/lib/stellar";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TransactionPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransaction(id as string),
  });

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className='text-red-500'>Error: {error.message}</p>;

  return (
    <div className='mx-auto p-6'>
      <Card>
        <CardContent className='p-6 gap-y-2 flex flex-col'>
          <h2 className='text-2xl font-bold mb-4 break-words'>
            Transaction {data.hash}
          </h2>
          <p>
            <strong>Status:</strong> {data.successful ? "Successful" : "Failed"}
          </p>
          <Link href={`/accounts/${data.source_account}`}>
            <strong>Source Account:</strong>{" "}
            <p className='text-violet-700 font-bold break-words'>
              {data.source_account}
            </p>
          </Link>
          <p>
            <strong>Sequence Number: </strong> {data.source_account_sequence}
          </p>
          <p>
            <strong>Ledger:</strong> {data.ledger}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(data.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Operations:</strong> {data.operation_count}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
