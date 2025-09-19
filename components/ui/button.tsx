import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white shadow-premium hover:bg-slate-800 hover:shadow-premium-lg hover:-translate-y-0.5",
        destructive:
          "bg-red-600 text-white shadow-premium hover:bg-red-700 hover:shadow-premium-lg hover:-translate-y-0.5",
        outline:
          "border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-slate-50/80 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-slate-100/80 text-slate-900 shadow-sm backdrop-blur-sm hover:bg-slate-200/80 hover:shadow-md hover:-translate-y-0.5",
        ghost: "hover:bg-slate-100/50 hover:text-slate-900 hover:backdrop-blur-sm",
        link: "text-slate-900 underline-offset-4 hover:underline hover:text-slate-700",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-10 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
