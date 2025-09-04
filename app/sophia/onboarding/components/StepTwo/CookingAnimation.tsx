"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const cookingStages = [
  { stage: "Gathering ingredients", emoji: "🥘", progress: 20 },
  { stage: "Mixing your ideas", emoji: "🔄", progress: 40 },
  { stage: "Adding the secret sauce", emoji: "✨", progress: 60 },
  { stage: "Perfecting the flavor", emoji: "👨‍🍳", progress: 80 },
  { stage: "Final touches", emoji: "🎯", progress: 95 },
  { stage: "Ready to serve!", emoji: "🎉", progress: 100 },
];

const floatingIngredients = [
  { id: 1, emoji: "💡", label: "Ideas" },
  { id: 2, emoji: "📝", label: "Words" },
  { id: 3, emoji: "🎨", label: "Style" },
  { id: 4, emoji: "🚀", label: "Impact" },
  { id: 5, emoji: "❤️", label: "Passion" },
  { id: 6, emoji: "🌟", label: "Magic" },
];

export default function CookingAnimation() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < cookingStages.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(cookingStages[currentStage].progress);
  }, [currentStage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 z-50 flex items-center justify-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        {/* Sophia with Cauldron */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-64 h-64 mx-auto mb-8"
        >
          {/* Cauldron */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-b-full shadow-2xl"
          >
            {/* Bubbling Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-b-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-2 w-4 h-4 bg-purple-400/50 rounded-full"
                  initial={{
                    x: 20 + i * 30,
                    y: 0,
                  }}
                  animate={{
                    y: [-20, -60],
                    opacity: [1, 0],
                    scale: [1, 1.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Sophia */}
          <motion.div
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32"
          >
            <Image
              src="/images/sophia-agent.png"
              alt="Sophia Cooking"
              fill
              className="object-contain"
              priority
            />
            {/* Stirring Spoon */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-4 bottom-0 text-4xl"
            >
              🥄
            </motion.div>
          </motion.div>

          {/* Floating Ingredients */}
          {floatingIngredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.id}
              className="absolute"
              initial={{
                x: Math.cos((index / floatingIngredients.length) * 2 * Math.PI) * 120,
                y: Math.sin((index / floatingIngredients.length) * 2 * Math.PI) * 120,
              }}
              animate={{
                x: [
                  Math.cos((index / floatingIngredients.length) * 2 * Math.PI) * 120,
                  0,
                ],
                y: [
                  Math.sin((index / floatingIngredients.length) * 2 * Math.PI) * 120,
                  60,
                ],
                scale: [1, 0.5],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
              }}
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-1">{ingredient.emoji}</div>
                <span className="text-xs text-white/80">{ingredient.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cooking Status */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Cooking Your Content...
        </motion.h2>

        {/* Current Stage */}
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center gap-3 text-white/90 mb-8"
        >
          <span className="text-3xl">{cookingStages[currentStage].emoji}</span>
          <span className="text-lg">{cookingStages[currentStage].stage}</span>
        </motion.div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-white font-bold"
          >
            {progress}%
          </motion.span>
        </div>

        {/* Fun Messages */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 text-sm mt-8"
        >
          {currentStage % 2 === 0
            ? "This is going to be amazing!"
            : "Almost there, just a bit more magic..."}
        </motion.p>

        {/* Sparkles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * 600 - 300,
                y: Math.random() * 400 - 200,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}