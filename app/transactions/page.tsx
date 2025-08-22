import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/app/_lib/prisma";
import { transactionColumns } from "./_columns";
import { Navbar } from "@/app/_components/navbar";
import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import AddTransactionButton from "@/app/_components/add-transaction-button";
import { canUserAddTransaction } from "@/app/_data/can-user-add-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const userCanAddTransaction = await canUserAddTransaction();
  const transactions = await db.transaction.findMany({ where: { userId } });

  return (
    <>
      <Navbar />

      <div className="container mx-auto space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        <ScrollArea>
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
