"use client";

import SearchBar from "@/components/SearchBar/searchBar";
import { Card } from "@/components/ui/card";
import { createEventSource, fetchLimitLedger } from "@/lib/stellar";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [ledger, setLedger] = useState(null);
  const { data, error } = useQuery({
    queryKey: [],
    queryFn: () => fetchLimitLedger(),
  });

  if (data && !ledger) {
    setLedger(data?.records);
  }
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p className='text-red-500'>Error: {error.message}</p>;

  const LedgerUpdates = () => {
    // setLedger(data?.records.reverse());

    useEffect(() => {
      const eventSource = createEventSource();

      eventSource.onmessage = (event) => {
        const newLedger = JSON.parse(event.data);

        const oldLedger = [...ledger];
        oldLedger.pop();
        oldLedger.unshift(newLedger);

        setLedger(oldLedger);
      };

      return () => {
        eventSource.close();
      };
    }, []);

    if (error) return <p className='text-red-500'>Error: {error.message}</p>;

    return (
      <div>
        <h1 className='text-3xl font-bold text-center my-6 text-zinc-100'>
          Latest Ledgers
        </h1>
        <Suspense
          fallback={<p className='text-zinc-100'>Loading latest ledgers...</p>}
        >
          {ledger && (
            <div className='container mx-auto gap-y-2 flex flex-col pb-6'>
              {ledger?.map((record: any, idx: number) => (
                <Link href={`/ledgers/${record.sequence}`} key={idx}>
                  <Card key={idx} className='p-6'>
                    <h2 className='text-2xl font-bold mb-1'>
                      Ledger {record.sequence}
                    </h2>
                    <p className='mb-4 text-sm'>
                      <strong>Ledger Hash:</strong> {record.hash}
                    </p>
                    <p>
                      <strong className='text-green-600'>
                        Successful Transaction Count:
                      </strong>{" "}
                      {record.successful_transaction_count}
                    </p>
                    <p>
                      <strong className='text-red-600'>
                        Failed Transaction Count:
                      </strong>{" "}
                      {record.failed_transaction_count}
                    </p>
                    <p>
                      <strong>Closed At:</strong> {record.closed_at}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Suspense>
      </div>
    );
  };

  return (
    <div className='bg-transparent'>
      <SearchBar />
      <LedgerUpdates />
    </div>
  );
}
