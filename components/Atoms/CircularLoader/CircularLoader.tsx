import { cva, type VariantProps } from "class-variance-authority";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/utils/shadcn-ui";

const circularLoaderVariants = cva("animate-spin", {
  variants: {
    size: {
      default: "size-9",
      xs: "size-4",
      sm: "size-6",
      lg: "size-12",
    },
    variant: {
      background: "text-white",
      foreground: "text-neutral-1000",
    },
  },
  defaultVariants: {
    variant: "foreground",
    size: "default",
  },
});

export type CircularLoaderProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof circularLoaderVariants>;

const CircularLoader = ({ size, variant, className }: CircularLoaderProps) => {
  return (
    <IconLoader2
      className={cn(circularLoaderVariants({ className, variant, size }))}
    />
  );
};

export { CircularLoader };
