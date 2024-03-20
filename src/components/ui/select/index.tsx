import {
  Root,
  Trigger,
  Value,
  Portal,
  Item,
  ItemText,
  Content,
  Viewport,
} from "@radix-ui/react-select";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export interface SelectProps {
  options: {
    value: string;
    label: React.ReactNode;
    [key: string]: any;
  }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}

export const Select = ({
  options,
  onChange,
  value,
  className,
  placeholder = "Select...",
}: SelectProps) => {
  return (
    <Root onValueChange={onChange} value={value}>
      <Trigger
        className={cn(
          "border rounded-md px-2 py-1 gap-2 w-max flex items-center",
          className
        )}
      >
        <Value placeholder={placeholder} />
        <ChevronDownIcon className="w-5" />
      </Trigger>
      <Portal>
        <Content className="p-2 relative rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
          <Viewport>
            {options?.map((option) => (
              <Item
                key={option.value}
                value={option.value}
                className="rounded-md hover:bg-accent px-2 py-1 cursor-pointer outline-none"
              >
                <ItemText>{option.label}</ItemText>
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
};
