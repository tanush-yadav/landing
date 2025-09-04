'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit3, FileText, Save, RotateCcw, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StyleGuideProps {
  onUpdate: (key: string, value: any) => void
  data: any
  setSophiaMessage: (message: string) => void
}

// Sample brand style guide content
const defaultStyleGuideContent = `## Our Brand Mission

We believe that great content should inspire, educate, and drive meaningful action. Our mission is to create content that doesn't just inform, but transforms how people think and work.

## Voice & Tone

**Our Brand Voice:**
- **Conversational yet professional** - We speak like trusted advisors, not corporate robots
- **Confident but approachable** - We know our stuff, but we're not intimidating
- **Clear and direct** - No jargon, no fluff. Every word serves a purpose
- **Thoughtfully optimistic** - We believe in better outcomes and show the path forward

**Tone Guidelines:**
- **For tutorials:** Patient, encouraging, step-by-step
- **For insights:** Thoughtful, data-driven, perspective-shifting  
- **For announcements:** Excited but not hyperbolic, clear about benefits
- **For problem-solving:** Empathetic, solution-focused, actionable

## Word Choices & Terminology

**We say this:**
- "Help you succeed" (not "drive results")
- "Learn together" (not "upskill")
- "Make it simple" (not "streamline processes")  
- "Real impact" (not "ROI optimization")
- "Your team" (not "stakeholders")

**Avoid these words:**
- Synergy, paradigm, leverage, utilize, ideate, circle back, deep dive, low-hanging fruit

## Writing Style

**Sentence Structure:**
- Mix short, punchy sentences with longer, detailed explanations
- Start with the most important point, then add supporting details
- Use active voice: "We built this feature" not "This feature was built"

**Formatting Preferences:**
- Use bullet points for lists and key takeaways
- Bold important concepts on first mention
- Include concrete examples whenever possible
- Break up long paragraphs for better readability

## Brand Personality

**We are:**
- **The Trusted Guide** - We've been there, we know the challenges, we'll show you the way
- **The Thoughtful Expert** - We don't just know what works, we understand why it works
- **The Practical Visionary** - We see the bigger picture but focus on actionable next steps
- **The Authentic Voice** - We share real experiences, including failures and lessons learned

**We are not:**
- The know-it-all who talks down to people
- The trendy voice that chases every new buzzword
- The corporate entity that speaks in marketing-speak
- The perfectionist that never shows vulnerability

## Communication Principles

1. **Lead with value** - Every piece of content should make someone's work or life better
2. **Respect time** - Get to the point quickly, then provide depth for those who want it
3. **Show, don't just tell** - Use examples, case studies, and concrete evidence
4. **Admit what we don't know** - It's better to be honest than to appear all-knowing
5. **Connect the dots** - Help readers understand not just what to do, but why it matters

## Content Formatting Standards

**Headers:** Use sentence case, not title case
**Lists:** Parallel structure, consistent punctuation  
**Examples:** Always label clearly as "Example:" or "For instance:"
**Calls to action:** Specific and benefit-focused
**Links:** Descriptive anchor text, never "click here"`

export default function StyleGuide({ onUpdate, data, setSophiaMessage }: StyleGuideProps) {
  const [content, setContent] = useState<string>(data.styleGuideContent || defaultStyleGuideContent)
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setSophiaMessage('Let me help you craft your brand style guide. Edit this content to match your unique voice and communication style.')
  }, [setSophiaMessage])

  const handleContentChange = (value: string) => {
    setContent(value)
    setHasChanges(true)
    if (onUpdate) {
      onUpdate('styleGuideContent', value)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSophiaMessage('Saving your style guide updates...')
    
    // Simulate save operation
    setTimeout(() => {
      setHasChanges(false)
      setLastSaved(new Date())
      setIsSaving(false)
      setSophiaMessage('Style guide saved! Your brand voice is looking sharp.')
    }, 1000)
  }

  const handleReset = () => {
    setContent(defaultStyleGuideContent)
    setHasChanges(true)
    setSophiaMessage('Reset to default style guide template.')
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing)
    if (!isEditing && textareaRef.current) {
      // Focus and move cursor to end when entering edit mode
      setTimeout(() => {
        textareaRef.current?.focus()
        const len = textareaRef.current?.value.length || 0
        textareaRef.current?.setSelectionRange(len, len)
      }, 100)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current && isEditing) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [content, isEditing])

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header matching other components */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-medium text-slate-900">
          Brand Style Guide
        </h2>
        <p className="font-body text-base text-slate-500">
          Define your brand voice, writing style, and communication principles that will guide all your content.
        </p>
      </div>

      {/* Status and Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="font-body text-sm text-slate-500">
              {isEditing ? 'Editing mode' : 'Preview mode'}
            </p>
            {hasChanges && (
              <span className="flex items-center gap-1 text-xs text-amber-600">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                Unsaved changes
              </span>
            )}
            {lastSaved && !hasChanges && (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <Check className="w-3 h-3" />
                Saved {formatLastSaved(lastSaved)}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors duration-150"
              title="Reset to default template"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
            
            {hasChanges && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors duration-150 disabled:opacity-50"
              >
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                ) : (
                  <Save className="w-3 h-3" />
                )}
                {isSaving ? 'Saving...' : 'Save'}
              </motion.button>
            )}

            <button
              onClick={toggleEditing}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition-colors duration-150',
                isEditing
                  ? 'bg-slate-500 text-white hover:bg-slate-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              {isEditing ? <FileText className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
              {isEditing ? 'Preview' : 'Edit'}
            </button>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: content.length > 100 ? '100%' : `${(content.length / 100) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Main Editor/Preview */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Editor */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <Edit3 className="w-4 h-4 text-slate-500" />
                  <h3 className="font-display text-sm font-medium text-slate-900">
                    Style Guide Editor
                  </h3>
                </div>
                
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full min-h-[600px] resize-none border-0 outline-none font-mono text-sm text-slate-700 leading-relaxed"
                  placeholder="Define your brand voice, writing style, and communication guidelines..."
                  style={{ 
                    fontFamily: 'ui-monospace, SFMono-Regular, Monaco, Cascadia Code, Roboto Mono, Menlo, monospace'
                  }}
                />
              </div>

              {/* Editor tips */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-display text-sm font-medium text-blue-900 mb-2">
                  Editing Tips
                </h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• Use ## for main sections and **bold** for emphasis</p>
                  <p>• Include specific examples of your preferred word choices</p>
                  <p>• Define what your brand is AND what it isn't</p>
                  <p>• Add formatting guidelines for consistent content creation</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <FileText className="w-4 h-4 text-slate-500" />
                <h3 className="font-display text-sm font-medium text-slate-900">
                  Style Guide Preview
                </h3>
              </div>
              
              <div 
                className="prose prose-slate max-w-none font-body text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-display font-semibold text-slate-900 mt-8 mb-4 first:mt-0">$1</h2>')
                    .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-semibold text-slate-900">$1</strong>')
                    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
                    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 list-decimal">$2</li>')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^(.+)$/gm, (match, p1) => {
                      if (p1.startsWith('<h2') || p1.startsWith('<li') || p1.startsWith('</p>') || p1.startsWith('<p')) {
                        return p1
                      }
                      return `<p class="mb-4">${p1}</p>`
                    })
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer matching other components */}
      <div className="pt-6 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Edit3 className="w-3 h-3" />
            <span>Click Edit to modify content</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-3 h-3" />
            <span>Preview to see formatted result</span>
          </div>
        </div>
        <p className="font-body text-xs text-slate-500 leading-relaxed">
          Your style guide will help Sophia understand your brand voice and create content that matches your communication style. Include specific examples and guidelines for best results.
        </p>
      </div>
    </div>
  )
}