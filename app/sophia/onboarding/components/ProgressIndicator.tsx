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
    if (step <= 5) return 1; // Step 1: Context (including integrations)
    if (step <= 7) return 2; // Step 2: Content
    return 3; // Step 3: Delivery
  };

  const currentGroup = getStepGroup(currentStep);

  return (
    <div className="flex items-center gap-3">
      {/* Step Dots */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((group) => (
          <div key={group} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-150",
                currentGroup >= group
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {currentGroup > group ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                group
              )}
            </div>
            {group < 3 && (
              <div
                className={cn(
                  "w-8 h-0.5 transition-all duration-150",
                  currentGroup > group
                    ? "bg-gray-900"
                    : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress Text */}
      <div className="hidden sm:block">
        <p className="text-sm text-gray-500">{Math.round(progress)}% Complete</p>
      </div>
    </div>
  );
}