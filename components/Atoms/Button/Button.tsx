import { forwardRef } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { CircularLoader } from "@/components";
import { cn } from "@/utils/shadcn-ui";

/**
 * Docs - https://ui.shadcn.com/docs/components/button
 * Extended to add loading state, icon support, and sizes based on Figma design system
 */
const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-1 rounded-md whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dodger-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100",
  {
    variants: {
      variant: {
        default:
          "bg-brand-dodger-blue text-white hover:bg-brand-dodger-blue/90",
        destructive: "bg-state-error text-white hover:bg-state-error",
        outline:
          "border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100",
        ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100",
      },
      size: {
        big: "h-12 px-3 py-3 text-[15px] leading-[100%] font-semibold", // H4 specs: 15px, weight 600, line-height 100%
        medium: "h-10 px-3 py-2.5 text-[15px] leading-[100%] font-semibold", // H4 specs: 15px, weight 600, line-height 100%
        small: "h-8 px-2 py-2 text-[12px] leading-[100%] font-semibold", // Small specs: 12px, weight 600, line-height 100%
      },
      iconPosition: {
        left: "",
        right: "",
        only: "px-0", // Remove horizontal padding for icon-only buttons
      },
      width: {
        default: "",
        lg: "min-w-[200px]",
        md: "min-w-[140px]",
      },
    },
    compoundVariants: [
      // Icon-only button sizing
      {
        iconPosition: "only",
        size: "big",
        className: "w-12", // Square button for big size
      },
      {
        iconPosition: "only",
        size: "medium",
        className: "w-10", // Square button for medium size
      },
      {
        iconPosition: "only",
        size: "small",
        className: "w-8", // Square button for small size
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "medium",
      iconPosition: "left",
      width: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    "data-testid"?: string;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "medium",
      iconPosition,
      width,
      asChild = false,
      loading,
      disabled,
      children,
      icon,
      type = "button",
      "data-testid": testId,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = loading || disabled;
    const isIconOnly = iconPosition === "only";

    // Determine if this is an icon-only button
    const shouldShowIconOnly = isIconOnly || (!children && icon);
    const finalIconPosition = shouldShowIconOnly ? "only" : iconPosition;

    // Disabled state classes - ensuring proper contrast and styling
    const getDisabledClasses = () => {
      if (!isDisabled) return "";

      switch (variant) {
        case "outline":
          return "border-neutral-400 bg-transparent text-neutral-400 hover:bg-transparent";
        case "ghost":
          return "bg-transparent text-neutral-400 hover:bg-transparent";
        case "destructive":
          return "bg-state-error text-white hover:bg-state-error";
        default:
          return "bg-neutral-400 text-white hover:bg-neutral-400";
      }
    };

    // Icon size based on button size
    const getIconSize = () => {
      switch (size) {
        case "big":
          return "w-6 h-6"; // 24px
        case "small":
          return "w-5 h-5"; // 20px
        case "medium":
        default:
          return "w-6 h-6"; // 24px
      }
    };

    // Icon color based on disabled state and variant
    const getIconColor = () => {
      if (!isDisabled) return "";

      switch (variant) {
        case "outline":
          return "[&>svg]:!text-neutral-400 text-neutral-400";
        case "ghost":
          return "[&>svg]:!text-neutral-400 text-neutral-400";
        case "destructive":
          return "[&>svg]:!text-neutral-400 text-neutral-400";
        case "default":
          return "[&>svg]:!text-neutral-400 text-neutral-400";
        default:
          return "text-white";
      }
    };

    // Icon margin compensation based on position
    const getIconMarginClass = () => {
      if (shouldShowIconOnly) return "";
      if (finalIconPosition === "left") return "ml-[-4px]";
      if (finalIconPosition === "right") return "mr-[-4px]";
      return "";
    };

    const iconElement = icon && (
      <span
        className={cn(
          "flex-shrink-0 flex items-center justify-center",
          getIconSize(),
          getIconColor(),
          getIconMarginClass()
        )}
      >
        {icon}
      </span>
    );

    const loadingElement = loading && (
      <CircularLoader
        size={size === "small" ? "xs" : "sm"}
        className="text-inherit"
      />
    );

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            iconPosition: finalIconPosition,
            width,
          }),
          getDisabledClasses(),
          className
        )}
        ref={ref}
        type={type}
        disabled={isDisabled}
        data-testid={testId}
        {...props}
      >
        {loading ? (
          loadingElement
        ) : (
          <>
            {shouldShowIconOnly ? (
              iconElement
            ) : (
              <>
                {finalIconPosition === "left" && iconElement}
                <span className="text-ellipsis w-full">
                  <Slottable>{children}</Slottable>
                </span>
                {finalIconPosition === "right" && iconElement}
              </>
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
