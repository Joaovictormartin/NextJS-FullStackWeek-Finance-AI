import { CircleIcon } from "lucide-react";
import { Transaction, TransactionType } from "@prisma/client";

import { Badge } from "@/app/_components/ui/badge";
import { TRANSACTION_TYPE_OPTIONS } from "@/app/_constants/transactions";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="gap-1 bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="fill-primary" size={10} />
        {
          TRANSACTION_TYPE_OPTIONS.find(
            (item) => item.value === TransactionType.DEPOSIT,
          )?.label
        }
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger text-danger hover:bg-danger gap-1 bg-opacity-10 font-bold">
        <CircleIcon className="fill-danger" size={10} />
        {
          TRANSACTION_TYPE_OPTIONS.find(
            (item) => item.value === TransactionType.EXPENSE,
          )?.label
        }
      </Badge>
    );
  }
  return (
    <Badge className="gap-1 bg-white bg-opacity-10 font-bold text-white hover:bg-white">
      <CircleIcon className="fill-white" size={10} />
      {
        TRANSACTION_TYPE_OPTIONS.find(
          (item) => item.value === TransactionType.INVESTMENT,
        )?.label
      }
    </Badge>
  );
};

export default TransactionTypeBadge;
