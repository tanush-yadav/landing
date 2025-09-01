/**
 * Breadcrumb Component
 * 
 * Navigation breadcrumb with glassmorphic design
 */

'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-system';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  className,
  showHome = true 
}) => {
  const allItems = showHome 
    ? [{ label: 'Home', href: '/' }, ...items]
    : items;

  return (
    <nav 
      aria-label="Breadcrumb"
      className={cn('py-4', className)}
    >
      <motion.ol 
        className="flex items-center space-x-2 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            )}
            
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 px-2 py-1 rounded-md',
                  'text-gray-600 hover:text-gray-900',
                  'hover:bg-gray-100/50 transition-all duration-200',
                  'min-h-[32px]', // Touch target
                  '-webkit-tap-highlight-color-transparent'
                )}
              >
                {index === 0 && showHome && (
                  <Home className="h-3.5 w-3.5" />
                )}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span 
                className={cn(
                  'flex items-center gap-1.5 px-2 py-1',
                  item.current 
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-600'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {index === 0 && showHome && (
                  <Home className="h-3.5 w-3.5" />
                )}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </motion.ol>
    </nav>
  );
};

export default Breadcrumb;