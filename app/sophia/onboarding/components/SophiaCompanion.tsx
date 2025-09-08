"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SophiaCompanionProps {
  message: string;
  currentStep: number;
  expression?: "friendly" | "thinking" | "excited" | "writing" | "celebrating";
}

export default function SophiaCompanion({ 
  message, 
  currentStep, 
  expression = "friendly" 
}: SophiaCompanionProps) {
  const getSophiaAnimation = () => {
    switch (expression) {
      case "thinking":
        return {
          y: [0, -5, 0],
          transition: { repeat: Infinity, duration: 2 }
        };
      case "excited":
        return {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 1.5 }
        };
      case "writing":
        return {
          x: [-2, 2, -2],
          transition: { repeat: Infinity, duration: 0.5 }
        };
      case "celebrating":
        return {
          rotate: [-5, 5, -5],
          transition: { repeat: Infinity, duration: 0.8 }
        };
      default:
        return {
          y: [0, -10, 0],
          transition: { repeat: Infinity, duration: 3 }
        };
    }
  };

  return (
    <div className="sticky top-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Sophia Character Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-100">
          <motion.div 
            animate={getSophiaAnimation()}
            className="relative w-48 h-48 mx-auto mb-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-2xl" />
            <Image
              src="/images/sophia-agent.png"
              alt="Sophia"
              fill
              className="object-contain relative z-10"
              priority
            />
            
            {/* Expression Indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn(
                "absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-white shadow-lg border-2",
                expression === "thinking" && "border-yellow-400",
                expression === "excited" && "border-green-400",
                expression === "writing" && "border-blue-400",
                expression === "celebrating" && "border-purple-400",
                expression === "friendly" && "border-pink-400"
              )}
            >
              {expression === "thinking" && "🤔"}
              {expression === "excited" && "✨"}
              {expression === "writing" && "✍️"}
              {expression === "celebrating" && "🎉"}
              {expression === "friendly" && "😊"}
            </motion.div>
          </motion.div>

          {/* Speech Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-l border-t border-purple-200 rotate-45" />
                <p className="text-gray-800 text-sm leading-relaxed relative z-10">
                  {message}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentStep >= i ? "bg-purple-500" : "bg-gray-200"
                )}
              />
            ))}
          </div>
        </div>

        {/* Fun Facts Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-purple-100"
        >
          <h3 className="text-sm font-semibold text-purple-900 mb-2">Did you know?</h3>
          <p className="text-xs text-purple-700">
            I can learn your writing style in just a few minutes and create content that sounds exactly like you!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}