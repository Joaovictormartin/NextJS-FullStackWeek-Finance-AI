"use client";

import { useState } from "react";
import { ArrowDownUpIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import UpsertTransactionDialog from "./upsert-transaction-dialog";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const messageLimit =
    "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas.";

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!userCanAddTransaction}
              className="rounded-full font-bold"
              onClick={() => setDialogIsOpen(true)}
            >
              Adicionar transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            {!userCanAddTransaction && messageLimit}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
