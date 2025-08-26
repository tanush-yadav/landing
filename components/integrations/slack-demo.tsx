"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hash, ChevronDown, Plus, Search, AtSign } from 'lucide-react'

interface Message {
  id: string
  user: string
  avatar: string
  content: string
  timestamp: string
  isBot?: boolean
  isTyping?: boolean
}

const initialMessages: Message[] = [
  {
    id: '1',
    user: 'Alex Chen',
    avatar: 'AC',
    content: '@codegen can you help me implement a logout route that clears the session and redirects to login?',
    timestamp: '2:15 PM'
  }
]

const botResponses = [
  {
    id: '2',
    user: 'Codegen',
    avatar: 'CG',
    content: "I'll help you implement a logout route with session clearing and redirect functionality.",
    timestamp: '2:15 PM',
    isBot: true
  },
  {
    id: '3',
    user: 'Codegen',
    avatar: 'CG',
    content: "I've created the logout route with:\n• Session clearing using destroySession()\n• Secure cookie removal\n• Redirect to /login page\n• CSRF protection",
    timestamp: '2:16 PM',
    isBot: true
  },
  {
    id: '4',
    user: 'Codegen',
    avatar: 'CG',
    content: "✅ Pull request created: #487 - Add logout route with session management",
    timestamp: '2:16 PM',
    isBot: true
  }
]

interface SlackDemoProps {
  isPlaying: boolean
}

export default function SlackDemo({ isPlaying }: SlackDemoProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentResponseIndex < botResponses.length) {
        setShowTyping(true)
        
        setTimeout(() => {
          setMessages(prev => [...prev, botResponses[currentResponseIndex]])
          setShowTyping(false)
          setCurrentResponseIndex(prev => prev + 1)
        }, 1500)
      } else {
        // Reset animation
        setTimeout(() => {
          setMessages(initialMessages)
          setCurrentResponseIndex(0)
        }, 3000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [currentResponseIndex, isPlaying])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Slack Header */}
      <div className="bg-[#4A154B] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-white">
            <Hash className="w-5 h-5" />
            <span className="font-semibold">development</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-white/80 hover:text-white">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white/80 hover:text-white">
            <AtSign className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Plus className="w-4 h-4" />
            <span>Add a bookmark</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto bg-white p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-md flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${
                message.isBot ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.avatar}
              </div>

              {/* Message Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{message.user}</span>
                  {message.isBot && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      APP
                    </span>
                  )}
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <div className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap">
                  {message.content.includes('@codegen') ? (
                    <>
                      <span className="bg-blue-100 text-blue-700 font-medium px-1 rounded">@codegen</span>
                      {message.content.replace('@codegen', '')}
                    </>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                CG
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="font-semibold text-gray-900">Codegen</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  APP
                </span>
                <div className="flex gap-1">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-3">
        <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-2">
          <Plus className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Message #development"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            disabled
          />
        </div>
      </div>
    </motion.div>
  )
}