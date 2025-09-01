/**
 * Table of Contents Component
 * Generates and displays a navigable table of contents for blog posts
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, ChevronRight, ChevronDown } from 'lucide-react';
import { generateTableOfContents, trackBlogInteraction, type TableOfContentsItem } from '@/lib/blog-interlinking';
import { cn } from '@/lib/design-system';

interface TableOfContentsProps {
  content: string;
  postSlug: string;
  className?: string;
  sticky?: boolean;
  collapsible?: boolean;
  minHeadings?: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
  postSlug,
  className,
  sticky = true,
  collapsible = true,
  minHeadings = 3
}) => {
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate TOC from content
    const tocItems = generateTableOfContents(content);
    
    // Only show TOC if we have enough headings
    if (tocItems.length >= minHeadings) {
      setToc(tocItems);
      setIsVisible(true);
    }
  }, [content, minHeadings]);

  useEffect(() => {
    if (!isVisible || toc.length === 0) return;

    // Track active heading based on scroll position
    const handleScroll = () => {
      const headingElements = toc.flatMap(item => [
        item,
        ...item.children
      ]).map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(item => item.element);

      let activeHeading = '';
      const scrollY = window.scrollY;

      for (const { id, element } of headingElements) {
        if (element) {
          const offsetTop = element.offsetTop - 100; // Account for fixed header
          if (scrollY >= offsetTop) {
            activeHeading = id;
          }
        }
      }

      setActiveId(activeHeading);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc, isVisible]);

  const handleTocClick = (item: TableOfContentsItem) => {
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Track TOC navigation
      trackBlogInteraction(postSlug, 'view', {
        tocNavigation: true,
        targetHeading: item.text,
        headingLevel: item.level
      });
    }
  };

  const renderTocItem = (item: TableOfContentsItem, level: number = 0) => (
    <li key={item.id} className="relative">
      <button
        onClick={() => handleTocClick(item)}
        className={cn(
          'block w-full text-left py-1.5 px-3 rounded-md text-sm transition-all duration-200 hover:bg-gray-100',
          activeId === item.id
            ? 'text-indigo-600 bg-indigo-50 font-medium border-l-2 border-indigo-600'
            : 'text-gray-600 hover:text-gray-900',
          level === 1 ? 'pl-4' : level === 2 ? 'pl-6' : level >= 3 ? 'pl-8' : ''
        )}
      >
        <span className="line-clamp-2">{item.text}</span>
      </button>
      
      {item.children.length > 0 && (
        <ul className="space-y-0.5 mt-0.5">
          {item.children.map(child => renderTocItem(child, level + 1))}
        </ul>
      )}
    </li>
  );

  if (!isVisible || toc.length === 0) {
    return null;
  }

  return (
    <aside
      data-testid="table-of-contents"
      className={cn(
        'bg-white border border-gray-200 rounded-lg shadow-sm',
        sticky && 'sticky top-24',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Table of Contents</h3>
        </div>
        
        {collapsible && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </motion.div>
          </button>
        )}
      </div>

      {/* TOC Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <nav className="p-4 max-h-96 overflow-y-auto">
              <ul className="space-y-0.5">
                {toc.map(item => renderTocItem(item))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Progress Indicator */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Reading Progress</span>
          <span>{Math.round((Object.keys(toc).indexOf(activeId) + 1) / toc.length * 100) || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <motion.div
            className="bg-indigo-600 h-1.5 rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${(Object.keys(toc).indexOf(activeId) + 1) / toc.length * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </aside>
  );
};

export default TableOfContents;