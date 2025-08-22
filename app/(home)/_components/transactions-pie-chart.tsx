"use client";

import { Pie, PieChart } from "recharts";
import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import {
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import PercentageItem from "./percentage-item";
import { chartConfig } from "@/app/_constants/chart-config";
import { Card, CardContent } from "@/app/_components/ui/card";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className="flex flex-col p-4">
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              nameKey="type"
              data={chartData}
              dataKey="amount"
              innerRadius={50}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentageItem
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
            icon={<TrendingUpIcon size={16} className="text-primary" />}
          />

          <PercentageItem
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE]}
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
          />

          <PercentageItem
            title="Investido"
            icon={<PiggyBankIcon size={16} />}
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
