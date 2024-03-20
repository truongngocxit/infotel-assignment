"use client";

import { DASHBOARD_ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { UserIcon } from "@/components/icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Logo } from "@/components/ui/logo";
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
      <nav className={cn("flex flex-col gap-1 p-3")}>
        {DASHBOARD_ROUTES.map((route) => (
          <Link
            key={route.slug}
            href={`/dashboard/${route.slug}`}
            className={cn(
              "flex items-center gap-3 p-2 hover:bg-muted rounded",
              segment === route.slug ? "bg-muted" : ""
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
              className="DropdownMenuContent"
              sideOffset={5}
            >
              <DropdownMenu.Item className="DropdownMenuItem">
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};
