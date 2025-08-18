"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/app/_components/ui/select";
import { MONTH_OPTIONS } from "@/app/_constants/month-options";

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");

  const handleMonthChange = (month: string) => push(`/?month=${month}`);

  return (
    <Select
      defaultValue={month ?? ""}
      onValueChange={(value) => handleMonthChange(value)}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>

      <SelectContent>
        {MONTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
