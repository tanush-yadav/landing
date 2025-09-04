"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Type, Mic, Sparkles, RefreshCw, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface StyleGuideProps {
  onUpdate: (key: string, value: any) => void;
  data: any;
  setSophiaMessage: (message: string) => void;
}

const toneOptions = [
  { id: "professional", label: "Professional", icon: "👔" },
  { id: "casual", label: "Casual", icon: "😊" },
  { id: "witty", label: "Witty", icon: "😄" },
  { id: "authoritative", label: "Authoritative", icon: "🎓" },
  { id: "friendly", label: "Friendly", icon: "🤗" },
  { id: "inspirational", label: "Inspirational", icon: "✨" },
];

const colorPalettes = [
  { id: 1, name: "Ocean", colors: ["#0EA5E9", "#0284C7", "#0369A1", "#075985", "#0C4A6E"] },
  { id: 2, name: "Forest", colors: ["#10B981", "#059669", "#047857", "#065F46", "#064E3B"] },
  { id: 3, name: "Sunset", colors: ["#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F"] },
  { id: 4, name: "Royal", colors: ["#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6", "#4C1D95"] },
];

export default function StyleGuide({ onUpdate, data, setSophiaMessage }: StyleGuideProps) {
  const [selectedTones, setSelectedTones] = useState<string[]>(data.tones || []);
  const [selectedPalette, setSelectedPalette] = useState(data.palette || null);
  const [customColors, setCustomColors] = useState<string[]>(data.customColors || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [styleGuideGenerated, setStyleGuideGenerated] = useState(false);
  const [typography, setTypography] = useState(data.typography || {
    heading: "Modern Sans",
    body: "Clean Sans",
    accent: "Display Serif"
  });

  useEffect(() => {
    setSophiaMessage("I'll capture your visual essence! Let's create your unique brand style guide.");
  }, [setSophiaMessage]);

  const handleToneToggle = (toneId: string) => {
    const updated = selectedTones.includes(toneId)
      ? selectedTones.filter(t => t !== toneId)
      : [...selectedTones, toneId];
    
    setSelectedTones(updated);
    onUpdate("tones", updated);
  };

  const handleGenerateStyleGuide = () => {
    setIsGenerating(true);
    setSophiaMessage("Creating your perfect style guide... This is going to be amazing!");
    
    setTimeout(() => {
      setStyleGuideGenerated(true);
      setIsGenerating(false);
      setSophiaMessage("Your style guide is ready! Looking fantastic!");
      onUpdate("styleGuideGenerated", true);
    }, 3000);
  };

  const addCustomColor = () => {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const updated = [...customColors, randomColor];
    setCustomColors(updated);
    onUpdate("customColors", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Style Guide</h2>
        <p className="text-gray-600">Let's define your visual identity and communication style.</p>
      </div>

      {/* Tone of Voice */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Mic className="w-5 h-5 text-purple-600" />
          Tone of Voice
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {toneOptions.map((tone) => {
            const isSelected = selectedTones.includes(tone.id);
            
            return (
              <motion.button
                key={tone.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleToneToggle(tone.id)}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-all",
                  isSelected
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
                <div className="text-2xl mb-2">{tone.icon}</div>
                <p className="text-sm font-medium text-gray-800">{tone.label}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-600" />
          Color Palette
        </h3>
        <div className="space-y-3">
          {colorPalettes.map((palette) => {
            const isSelected = selectedPalette?.id === palette.id;
            
            return (
              <motion.button
                key={palette.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  setSelectedPalette(palette);
                  onUpdate("palette", palette);
                }}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all",
                  isSelected
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{palette.name}</span>
                  {isSelected && (
                    <span className="text-xs text-purple-600 font-medium">Selected</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {palette.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex-1 h-12 rounded-lg shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </motion.button>
            );
          })}
          
          {/* Custom Colors */}
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Custom Colors</span>
              <button
                onClick={addCustomColor}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                + Add Color
              </button>
            </div>
            {customColors.length > 0 ? (
              <div className="flex gap-2">
                {customColors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-lg shadow-sm cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No custom colors added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Type className="w-5 h-5 text-purple-600" />
          Typography
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Headings</p>
            <p className="text-lg font-bold text-gray-900">{typography.heading}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Body Text</p>
            <p className="text-lg text-gray-900">{typography.body}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Accent</p>
            <p className="text-lg italic text-gray-900">{typography.accent}</p>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGenerateStyleGuide}
        disabled={isGenerating || styleGuideGenerated}
        className={cn(
          "w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3",
          styleGuideGenerated
            ? "bg-green-500 text-white"
            : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
        )}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Generating Your Style Guide...
          </>
        ) : styleGuideGenerated ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Style Guide Generated!
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate My Style Guide
          </>
        )}
      </motion.button>

      {/* Generated Preview */}
      <AnimatePresence>
        {styleGuideGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Your Style Guide is Ready!</h4>
              <button className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg text-sm text-purple-600 hover:bg-purple-50">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Voice Characteristics</p>
                <p className="text-sm text-gray-800">
                  {selectedTones.map(t => toneOptions.find(opt => opt.id === t)?.label).join(", ")}
                </p>
              </div>
              
              {selectedPalette && (
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-2">Brand Colors</p>
                  <div className="flex gap-1">
                    {selectedPalette.colors.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="flex-1 h-6 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Typography System</p>
                <p className="text-sm text-gray-800">
                  {typography.heading} / {typography.body}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}