/**
 * Card Component
 * 
 * Flexible card component following design system patterns
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" padding="md">
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *   </Card.Header>
 *   <Card.Content>
 *     Card content goes here
 *   </Card.Content>
 * </Card>
 * ```
 */

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn, cardStyles, animations } from '@/lib/design-system';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: keyof typeof cardStyles.variants;
  padding?: keyof typeof cardStyles.padding;
  hoverable?: boolean;
  clickable?: boolean;
}

interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', hoverable = false, clickable = false, className, ...props }, ref) => {
    const variantClass = cardStyles.variants[variant];
    const paddingClass = cardStyles.padding[padding];
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          cardStyles.base,
          variantClass,
          paddingClass,
          hoverable && 'transition-shadow hover:shadow-lg',
          clickable && 'cursor-pointer',
          className
        )}
        whileHover={hoverable ? { y: -2 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
) as CardComponent;

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-neutral-200', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-semibold text-neutral-900', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-neutral-600 mt-1', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

// Attach subcomponents
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export { Card };