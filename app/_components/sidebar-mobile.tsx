"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetHeader,
  SheetContent,
} from "./ui/sheet";

interface SidebarMobileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const optionsMenu = [
  { id: 1, name: "Dashboard", href: "/" },
  { id: 2, name: "Transações", href: "/transactions" },
  { id: 3, name: "Assinatura", href: "/subscription" },
];

export const SidebarMobile = ({ open, setOpen }: SidebarMobileProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-full space-y-6 px-9">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetClose asChild className="py-2">
            <Link href="/">
              <Image
                priority
                alt="Logo"
                width={173}
                height={39}
                src={"/svg/logo.svg"}
                className="object-contain"
              />
            </Link>
          </SheetClose>
        </SheetHeader>

        <div className="space-y-4">
          {optionsMenu.map((item) => (
            <div key={item.id} className="w-full">
              <div className="font-dm-sans flex w-full items-center justify-between px-3 text-xs font-medium text-muted-foreground hover:underline">
                <SheetClose asChild className="py-2">
                  <Link href={item.href} className="flex-1 text-base">
                    {item.name}
                  </Link>
                </SheetClose>
              </div>
            </div>
          ))}
        </div>

        <UserButton showName />
      </SheetContent>
    </Sheet>
  );
};
