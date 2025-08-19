"use client";

import { ShieldX } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { deleteTransaction } from "@/app/_actions/delete-transaction";

interface ModalDeleteTransactionProps {
  isOpen: boolean;
  transactionId: string;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalDeleteTransaction = ({
  isOpen,
  setIsOpen,
  transactionId,
}: ModalDeleteTransactionProps) => {
  const handleDeleteTransaction = async (id: string) => {
    await deleteTransaction(id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldX className="size-6 text-[#E93030]" />

            <DialogTitle className="font-bold text-white">
              Deseja deletar essa transação?
            </DialogTitle>
          </div>

          <DialogDescription className="text-sm text-muted-foreground">
            Uma vez deletada não poderá recuperá-la.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          </DialogClose>

          <Button
            variant={"destructive"}
            onClick={() => handleDeleteTransaction(transactionId)}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
