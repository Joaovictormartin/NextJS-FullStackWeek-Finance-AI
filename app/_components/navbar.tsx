"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransactions = pathname === "/transactions";
  const isSubscription = pathname === "/subscription";

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        </Link>

        <Link
          href="/"
          className={
            isHome ? "font-bold text-primary" : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            isTransactions ? "font-bold text-primary" : "text-muted-foreground"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            isSubscription ? "font-bold text-primary" : "text-muted-foreground"
          }
        >
          Assinatura
        </Link>
      </div>

      <UserButton showName />
    </nav>
  );
};
