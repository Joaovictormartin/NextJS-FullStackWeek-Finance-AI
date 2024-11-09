"use client";

import { z } from "zod";
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { useForm } from "react-hook-form";
import { ArrowDownUpIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  TRANSACTION_TYPE_OPTIONS,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
} from "@/app/_constants/transactions";
import Select from "@/app/_components/select";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { MoneyInput } from "@/app/_components/ui/money-inputs";
import { DatePicker } from "./date-picker";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
  amount: z.string().min(1, { message: "O valor é obrigatório" }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatório",
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "A categoria é obrigatória",
  }),
  payment: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamneto é obrigatório",
  }),
  date: z.date({
    required_error: "A data é obrigatória",
  }),
});

const AddTransactionButton = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      date: new Date(),
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      payment: TransactionPaymentMethod.CASH,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) form.reset();
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
          Adicionar Transação <ArrowDownUpIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput placeholder="Digite o valor..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo da transação</FormLabel>
                  <FormControl>
                    <Select options={TRANSACTION_TYPE_OPTIONS} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select {...field} options={TRANSACTION_CATEGORY_OPTIONS} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={TRANSACTION_PAYMENT_METHOD_OPTIONS}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DatePicker value={value} onChange={onChange} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className="w-full rounded-xl"
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button type="submit" className="w-full rounded-xl">
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
