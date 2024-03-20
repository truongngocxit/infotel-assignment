import * as Popover from "@radix-ui/react-popover";

import { Checkbox } from "../checkbox";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
export interface CheckboxesDropdown {
  label?: React.ReactNode;
  options: {
    value: string;
    label: string;
    checked: boolean;
    [key: string]: any;
  }[];
  onCheckedChange?: (id: string, checked: boolean) => void;
  className?: string;
}

export const CheckboxesDropdown = ({
  options,
  label = "Select",
  onCheckedChange,
  className = "",
}: CheckboxesDropdown) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={cn(
            "border rounded-md px-2 py-1 gap-2 w-max flex items-center",
            className
          )}
        >
          {label}
          <ChevronDownIcon className="w-5" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={4}
          className="p-2 bg-background border rounded-md shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <form className="flex flex-col gap-2">
            {options.map((option) => (
              <Checkbox
                {...option}
                key={option.value}
                onCheckedChange={(e) =>
                  onCheckedChange?.(option.value, Boolean(e))
                }
              />
            ))}
          </form>
          {/* <Popover.Close aria-label="Close">Close</Popover.Close> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
