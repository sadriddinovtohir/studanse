import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        primary:
          "flex items-center gap-3 px-10 py-5 text-white font-medium rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "px-12 py-4 font-semibold bg-red-300 text-red-700 border-2 border-red-400 rounded-full",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-textColor",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      startIcon,
      endIcon,
      loading = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        )}
        <span className="inline-flex items-center gap-2">
          {startIcon && <span className="mr-1">{startIcon}</span>}
          {loading ? "Loading..." : children}
          {endIcon && <span className="ml-1">{endIcon}</span>}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };