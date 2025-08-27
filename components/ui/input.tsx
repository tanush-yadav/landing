/**
 * Input Component
 * 
 * Standard input field following design system patterns
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   error="Invalid email address"
 * />
 * ```
 */

import React from 'react';
import { cn, inputStyles, type Size } from '@/lib/design-system';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  inputSize?: Size;
  variant?: keyof typeof inputStyles.variants;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      inputSize = 'md',
      variant = 'default',
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const sizeClass = inputStyles.sizes[inputSize as keyof typeof inputStyles.sizes] || inputStyles.sizes.md;
    const variantClass = error ? inputStyles.variants.error : inputStyles.variants[variant];
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-400">{leftIcon}</span>
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputStyles.base,
              sizeClass,
              variantClass,
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-neutral-400">{rightIcon}</span>
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
        {helper && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-neutral-500">
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';