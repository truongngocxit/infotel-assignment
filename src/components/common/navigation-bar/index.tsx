"use client";

import { DASHBOARD_ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { UserIcon } from "@/components/icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Logo } from "@/components/ui/logo";
import { SignOutButton } from "@clerk/nextjs";
import { Root as SeparatorRoot } from "@radix-ui/react-separator";

export const NavigationBar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="w-[240px] border-r flex flex-col h-full max-h-full">
      <div className="p-3">
        <Link href="/dashboard/overview" className="flex items-center gap-2">
          <Logo className="text-brand w-8" />
          <span className="font-bold text-2xl">HMS</span>
        </Link>

        <SeparatorRoot className="h-[1px] bg-border mt-4" />
      </div>
      <nav className={cn("flex flex-col")}>
        {DASHBOARD_ROUTES.map((route) => (
          <Link
            key={route.slug}
            href={`/dashboard/${route.slug}`}
            className={cn(
              "flex items-center gap-3 px-5 py-4 hover:bg-brand/20",
              segment === route.slug
                ? "bg-brand/20 text-brand border-r-2 border-brand"
                : ""
            )}
          >
            {<route.icon className="w-5" />}
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 mt-auto">
        <SeparatorRoot className="h-[1px] bg-border mb-4" />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="IconButton" aria-label="Customise options">
              <UserIcon />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="start"
              alignOffset={5}
              className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              sideOffset={5}
            >
              <DropdownMenu.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <SignOutButton>Log out</SignOutButton>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};
