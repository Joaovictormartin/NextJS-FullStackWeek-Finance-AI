import { isMatch } from "date-fns";
import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";

import { Navbar } from "@/app/_components/navbar";
import TimeSelect from "./_components/time-select";
import SummaryCards from "./_components/summary-cards";
import { getDashboard } from "@/app/_data/get-dashboard";
import AiReportButton from "./_components/ai-report-button";
import LastTransactions from "./_components/last-transactions";
import ExpensesPerCategory from "./_components/expenses-per-category";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { canUserAddTransaction } from "@/app/_data/can-user-add-transaction";

interface HomeProps {
  searchParams: { month: string };
}

const HomePage = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) redirect(`?month=${new Date().getMonth() + 1}`);

  const dashboard = await getDashboard(month);
  const user = await clerkClient().users.getUser(userId);
  const userCanAddTransaction = await canUserAddTransaction();
  const isPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <Navbar />

      <div className="container mx-auto flex h-full flex-col space-y-4 p-4 sm:px-6 sm:py-4 lg:overflow-hidden">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center justify-between gap-2">
            <AiReportButton month={month} hasPremiumPlan={isPremiumPlan} />
            <TimeSelect />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr,2fr] lg:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards
              month={month}
              userCanAddTransaction={userCanAddTransaction}
              {...dashboard}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TransactionsPieChart {...dashboard} />

              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
