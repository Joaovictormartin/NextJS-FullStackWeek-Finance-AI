"use client";

import {
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import TransactionTypeBadge from "@/app/transactions/_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { Pencil, TrashIcon } from "lucide-react";

const TRANSACTION_CATEGORY_LABELS = {
  [TransactionCategory.HOUSING]: "Moradia",
  [TransactionCategory.TRANSPORTATION]: "Transporte",
  [TransactionCategory.FOOD]: "Alimentação",
  [TransactionCategory.ENTERTAINMENT]: "Entretenimento",
  [TransactionCategory.HEALTH]: "Saúde",
  [TransactionCategory.UTILITY]: "Utilidade",
  [TransactionCategory.SALARY]: "Salário",
  [TransactionCategory.EDUCATION]: "Educação",
  [TransactionCategory.OTHER]: "Outros",
};

const TRANSACTION_PATMENT_METHOD_LABELS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "Cartão de Crédito",
  [TransactionPaymentMethod.DEBIT_CARD]: "Cartão de Débito",
  [TransactionPaymentMethod.BANK_TRANSFER]: "Transferência Bancária",
  [TransactionPaymentMethod.BANK_SLIP]: "Boleto Bancário",
  [TransactionPaymentMethod.CASH]: "Dinheiro",
  [TransactionPaymentMethod.PIX]: "Pix",
  [TransactionPaymentMethod.OTHER]: "Outros",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  { accessorKey: "name", header: "Nome" },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "payment",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PATMENT_METHOD_LABELS[transaction.payment],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return (
        <div className="space-x-1">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-muted-foreground"
          >
            <Pencil />
          </Button>

          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-muted-foreground"
          >
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
