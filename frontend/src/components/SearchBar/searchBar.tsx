"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { detectInputType } from "@/lib/detectType";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  searchKey: z.string().min(1, "Input cannot be empty"),
});

export default function SearchBar() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    const searchKey = getValues("searchKey");
    const type = detectInputType(searchKey);

    switch (type) {
      case "account":
        router.push(`/accounts/${searchKey}`);
        break;
      case "transaction":
        router.push(`/transactions/${searchKey}`);
        break;
      case "ledger":
        router.push(`/ledgers/${searchKey}`);
        break;
      default:
        alert(
          "Invalid input. Please enter a valid account, transaction hash, or ledger number."
        );
    }
  };

  return (
    <div className='mx-auto p-6 bg-transparent'>
      <div>
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-4 text-zinc-100'>
            Ninjas Luminares | Stellar Blockchain Explorer
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <Input
              placeholder='Enter Account, Transaction, or Ledger'
              {...register("searchKey")}
            />
            {errors.searchKey && (
              <p className='text-red-500 text-sm'>
                {errors.searchKey.message as string}
              </p>
            )}

            <Button type='submit' className='w-full'>
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
