import { cn } from "@/lib/utils/cn";

export const Card = ({
  children,
  className,
  as: Comp = "div",
}: {
  className?: string;
  as?: JSX.ElementType;
  children: React.ReactNode;
}) => {
  return (
    <Comp
      className={cn("p-4 bg-background rounded-md border shadow", className)}
    >
      {children}
    </Comp>
  );
};
