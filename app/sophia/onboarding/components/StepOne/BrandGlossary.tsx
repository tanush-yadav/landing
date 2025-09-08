'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  X, 
  Hash, 
  BookOpen, 
  Tag,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlossaryTerm {
  id: string
  term: string
  category?: 'brand' | 'product' | 'industry' | 'custom'
}

interface BrandGlossaryProps {
  onUpdate?: (key: string, value: unknown) => void
  data?: Record<string, unknown>
  setSophiaMessage?: (message: string) => void
}

// Sample glossary terms to start with
const sampleTerms: GlossaryTerm[] = [
  { id: '1', term: 'Innovation', category: 'brand' },
  { id: '2', term: 'Customer-centric', category: 'brand' },
  { id: '3', term: 'AI-powered', category: 'product' },
  { id: '4', term: 'Scalable', category: 'product' },
  { id: '5', term: 'Enterprise-grade', category: 'product' },
  { id: '6', term: 'Digital transformation', category: 'industry' },
  { id: '7', term: 'Machine learning', category: 'industry' },
  { id: '8', term: 'ROI', category: 'industry' },
]

export default function BrandGlossary({
  onUpdate,
  data,
  setSophiaMessage,
}: BrandGlossaryProps) {
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>(
    (data?.glossaryTerms as GlossaryTerm[]) || sampleTerms
  )
  const [newTerm, setNewTerm] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null)

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage('Add key terms and phrases that define your brand vocabulary and industry language')
    }
  }, [setSophiaMessage])

  // Add new term
  const addTerm = async () => {
    if (!newTerm.trim()) return

    setIsAdding(true)

    // Simulate processing delay
    setTimeout(() => {
      const newGlossaryTerm: GlossaryTerm = {
        id: Date.now().toString(),
        term: newTerm.trim(),
        category: 'custom'
      }

      const updated = [...glossaryTerms, newGlossaryTerm]
      setGlossaryTerms(updated)
      setNewTerm('')
      setIsAdding(false)

      if (onUpdate) {
        onUpdate('glossaryTerms', updated)
      }

      if (setSophiaMessage) {
        setSophiaMessage(`Added "${newTerm.trim()}" to your brand glossary`)
      }
    }, 300)
  }

  // Remove term
  const removeTerm = (termId: string) => {
    const termToRemove = glossaryTerms.find(t => t.id === termId)
    const updated = glossaryTerms.filter(term => term.id !== termId)
    setGlossaryTerms(updated)

    if (onUpdate) {
      onUpdate('glossaryTerms', updated)
    }

    if (setSophiaMessage && termToRemove) {
      setSophiaMessage(`Removed "${termToRemove.term}" from your glossary`)
    }
  }

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTerm.trim() && !isAdding) {
      addTerm()
    }
  }

  // Get category color
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'brand':
        return '#2563eb'
      case 'product':
        return '#16a34a'
      case 'industry':
        return '#dc2626'
      case 'custom':
        return '#7c3aed'
      default:
        return '#64748b'
    }
  }

  // Get category label
  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'brand':
        return 'Brand'
      case 'product':
        return 'Product'
      case 'industry':
        return 'Industry'
      case 'custom':
        return 'Custom'
      default:
        return 'General'
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-medium text-slate-900">
          Define your brand vocabulary
        </h2>
        <p className="font-body text-base text-slate-500">
          Add key terms, phrases, and industry language that define your brand&apos;s communication style
        </p>
      </div>

      {/* Stats and Input */}
      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between">
          <p className="font-body text-sm text-slate-500">
            {glossaryTerms.length} terms in your glossary
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              Terms
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Categories
            </span>
          </div>
        </div>

        {/* Add new term input */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new term (e.g., innovative, customer-first, AI-driven)"
              className={cn(
                "w-full pl-11 pr-4 py-3 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-150",
                "border-slate-200 focus:border-blue-500 focus:ring-blue-500",
                "focus:outline-none focus:ring-2 focus:ring-opacity-50"
              )}
              disabled={isAdding}
            />
          </div>
          <button
            onClick={addTerm}
            disabled={!newTerm.trim() || isAdding}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-150 flex items-center gap-2",
              !newTerm.trim() || isAdding
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
            )}
          >
            {isAdding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Term
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terms Grid */}
      {glossaryTerms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-medium text-slate-900">
              Your Brand Glossary
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              {['brand', 'product', 'industry', 'custom'].map(category => {
                const count = glossaryTerms.filter(term => term.category === category).length
                if (count === 0) return null
                return (
                  <div key={category} className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    />
                    <span>{getCategoryLabel(category)}: {count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Terms as pills/tags */}
          <div className="flex flex-wrap gap-3">
            <AnimatePresence>
              {glossaryTerms.map((term, index) => (
                <motion.div
                  key={term.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15, delay: index * 0.02 }}
                  onMouseEnter={() => setHoveredTerm(term.id)}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  <div 
                    className={cn(
                      "group relative flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium transition-all duration-150",
                      "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-sm"
                    )}
                  >
                    {/* Category indicator */}
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCategoryColor(term.category) }}
                    />
                    
                    {/* Term text */}
                    <span className="select-none">
                      {term.term}
                    </span>

                    {/* Remove button */}
                    <button
                      onClick={() => removeTerm(term.id)}
                      className={cn(
                        "ml-1 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-150",
                        "text-slate-400 hover:text-slate-600 hover:bg-slate-100",
                        hoveredTerm === term.id ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                      )}
                      title={`Remove "${term.term}"`}
                    >
                      <X className="w-3 h-3" strokeWidth={2} />
                    </button>

                    {/* Category tooltip on hover */}
                    <AnimatePresence>
                      {hoveredTerm === term.id && term.category && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
                        >
                          <div 
                            className="px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                            style={{ backgroundColor: getCategoryColor(term.category) }}
                          >
                            {getCategoryLabel(term.category)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Category legend */}
          <div className="pt-4 border-t border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {[
                { key: 'brand', label: 'Brand Values', color: getCategoryColor('brand') },
                { key: 'product', label: 'Product Features', color: getCategoryColor('product') },
                { key: 'industry', label: 'Industry Terms', color: getCategoryColor('industry') },
                { key: 'custom', label: 'Custom Terms', color: getCategoryColor('custom') }
              ].map(category => (
                <div key={category.key} className="flex items-center gap-2 text-slate-500">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {glossaryTerms.length === 0 && (
        <div className="bg-slate-50 rounded-lg p-8 border-2 border-dashed border-slate-200 text-center">
          <Hash className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <p className="text-sm text-slate-600 mb-2">
            No terms in your glossary yet
          </p>
          <p className="text-xs text-slate-500">
            Add terms that define your brand&apos;s voice and industry language
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="pt-6 border-t border-slate-100">
        <p className="font-body text-xs text-slate-500 leading-relaxed">
          Build your brand vocabulary by adding key terms, phrases, and industry language. 
          Sophia will use these terms to better understand and match your communication style when generating content.{' '}
          <span className="text-slate-600">
            Click the × to remove any term, or add new ones using the input above.
          </span>
        </p>
      </div>
    </div>
  )
}