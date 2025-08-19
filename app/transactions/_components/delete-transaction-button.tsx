"use client";

import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { Transaction } from "@prisma/client";

import { Button } from "@/app/_components/ui/button";
import { ModalDeleteTransaction } from "./modal-delete-transaction";

interface DeleteTransactionButtonProps {
  transaction: Transaction;
}

export const DeleteTransactionButton = ({
  transaction,
}: DeleteTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <TrashIcon />
      </Button>

      <ModalDeleteTransaction
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        transactionId={transaction.id}
      />
    </>
  );
};
