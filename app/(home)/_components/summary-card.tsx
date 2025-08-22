import { formatCurrency } from "@/app/_utils/currency";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import AddTransactionButton from "@/app/_components/add-transaction-button";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>

      <CardContent className="flex justify-between">
        <p
          className={`truncate font-bold ${size === "small" ? "text-2xl" : "text-2xl md:text-4xl"}`}
        >
          {formatCurrency(amount)}
        </p>

        <div className="hidden sm:block">
          {size === "large" && (
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
