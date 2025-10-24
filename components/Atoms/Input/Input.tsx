import * as React from "react";

import { cn } from "@/utils/shadcn-ui";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 border bg-transparent px-3 py-1 outline-none transition-[color,box-shadow]",
        "rounded-[--radius-md] border-[--color-neutral-300] text-[--color-text] text-[--font-size-body]",
        "placeholder:text-[--color-neutral-500]",
        "focus-visible:border-[--color-brand-dodger-blue] focus-visible:ring-[3px] focus-visible:ring-[--color-brand-dodger-blue]/20",
        "aria-invalid:border-[--color-state-error] aria-invalid:ring-[--color-state-error]/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[--color-neutral-100] disabled:text-[--color-neutral-400]",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-[--font-size-small] file:font-medium file:text-[--color-text]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
