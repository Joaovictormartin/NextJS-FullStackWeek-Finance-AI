"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { SidebarMobile } from "./sidebar-mobile";

export const Navbar = () => {
  const pathname = usePathname();

  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const isHome = pathname === "/";
  const isTransactions = pathname === "/transactions";
  const isSubscription = pathname === "/subscription";

  const handleOpenMenuMobile = () => setIsOpenMobile(true);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between border-b border-solid px-8 py-4">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image
              width={173}
              height={39}
              alt="Finance AI"
              src="/svg/logo.svg"
            />
          </Link>

          <div className="hidden items-center gap-10 md:flex">
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
                isTransactions
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Transações
            </Link>
            <Link
              href="/subscription"
              className={
                isSubscription
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Assinatura
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <UserButton showName />
        </div>

        <div className="block md:hidden">
          <Menu className="cursor-pointer" onClick={handleOpenMenuMobile} />
        </div>
      </nav>

      <SidebarMobile open={isOpenMobile} setOpen={setIsOpenMobile} />
    </>
  );
};
