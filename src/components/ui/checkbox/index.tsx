import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@/components/icons";
export interface CheckboxProps {
  value: string;
  label: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Checkbox = ({
  value,
  checked,
  label,
  onCheckedChange,
}: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <Root
        checked={checked}
        id={value}
        onCheckedChange={onCheckedChange}
        className="peer h-6 w-6 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      >
        <Indicator className="flex items-center justify-center text-current">
          <CheckIcon />
        </Indicator>
      </Root>
      <label htmlFor={value}>{label}</label>
    </div>
  );
};
