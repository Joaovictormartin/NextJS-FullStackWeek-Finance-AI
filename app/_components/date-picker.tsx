"use client";

import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import { formatDate } from "@/app/_utils/locale-date";
import { Calendar } from "@/app/_components/ui/calendar";

interface DatePickerProps {
  value: Date;
  onChange: SelectSingleEventHandler;
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            formatDate(value, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          ) : (
            <span>Selecionar Dia</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          initialFocus
          locale={ptBR}
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
};
