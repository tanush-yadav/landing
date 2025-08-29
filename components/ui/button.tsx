/**
 * Button Component
 * 
 * Standard button implementation following design system patterns
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn, buttonStyles, type Size, type Variant } from '@/lib/design-system';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClass = buttonStyles.variants[variant as keyof typeof buttonStyles.variants] || buttonStyles.variants.primary;
    const sizeClass = buttonStyles.sizes[size as keyof typeof buttonStyles.sizes] || buttonStyles.sizes.md;
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonStyles.base,
          sizeClass,
          variantClass,
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        {children as React.ReactNode}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';