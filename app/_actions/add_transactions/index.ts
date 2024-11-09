"use server";

import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { addTransactionSchema } from "./schema";

interface addTransactionParams {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  payment: TransactionPaymentMethod;
  date: Date;
}

export const addTransactions = async (params: addTransactionParams) => {
  addTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.transaction.create({ data: { ...params, userId } });

  revalidatePath("/transactions");
};
