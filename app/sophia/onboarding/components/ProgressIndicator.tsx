"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const getStepGroup = (step: number) => {
    if (step <= 4) return 1; // Step 1: Context
    if (step <= 6) return 2; // Step 2: Content
    return 3; // Step 3: Delivery
  };

  const currentGroup = getStepGroup(currentStep);

  return (
    <div className="flex items-center gap-4">
      {/* Step Indicators */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((group) => (
          <div key={group} className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: group * 0.1 }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                currentGroup >= group
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-400 border-2 border-gray-200"
              )}
            >
              {currentGroup > group ? (
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.svg>
              ) : (
                group
              )}
            </motion.div>
            {group < 3 && (
              <div
                className={cn(
                  "w-12 h-0.5 transition-all",
                  currentGroup > group
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                    : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="hidden sm:block">
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% Complete</p>
      </div>
    </div>
  );
}