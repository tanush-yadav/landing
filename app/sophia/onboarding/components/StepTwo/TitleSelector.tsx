"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Eye, Clock, Plus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestedTitles = [
  {
    id: 1,
    title: "The Hidden Cost of Technical Debt: A CTO's Guide to Prevention",
    category: "Technical",
    engagement: "High",
    readTime: "8 min",
    score: 92,
  },
  {
    id: 2,
    title: "Why Your Startup's First 100 Days Define Everything",
    category: "Startup",
    engagement: "Very High",
    readTime: "6 min",
    score: 95,
  },
  {
    id: 3,
    title: "Building Products People Love: A Data-Driven Approach",
    category: "Product",
    engagement: "High",
    readTime: "10 min",
    score: 88,
  },
  {
    id: 4,
    title: "The Art of Saying No: How to Focus on What Matters",
    category: "Leadership",
    engagement: "Medium",
    readTime: "5 min",
    score: 85,
  },
  {
    id: 5,
    title: "From Zero to IPO: Lessons from the Trenches",
    category: "Business",
    engagement: "Very High",
    readTime: "12 min",
    score: 97,
  },
];

interface TitleSelectorProps {
  onUpdate: (key: string, value: any) => void;
  data: any;
  setSophiaMessage: (message: string) => void;
}

export default function TitleSelector({ onUpdate, data, setSophiaMessage }: TitleSelectorProps) {
  const [selectedTitle, setSelectedTitle] = useState(data.selectedTitle || null);
  const [customTitle, setCustomTitle] = useState(data.customTitle || "");
  const [isCustom, setIsCustom] = useState(data.isCustomTitle || false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [titles, setTitles] = useState(suggestedTitles);

  useEffect(() => {
    setSophiaMessage("Let's create something amazing! Choose a title that sparks your creativity.");
  }, [setSophiaMessage]);

  const handleSelectTitle = (title: any) => {
    setSelectedTitle(title);
    setIsCustom(false);
    onUpdate("selectedTitle", title);
    onUpdate("isCustomTitle", false);
    setSophiaMessage(`"${title.title}" - Excellent choice! This will be fire content!`);
  };

  const handleCustomTitle = () => {
    if (customTitle.trim()) {
      const custom = {
        id: "custom",
        title: customTitle,
        category: "Custom",
        engagement: "Unknown",
        readTime: "TBD",
        score: 0,
      };
      setSelectedTitle(custom);
      setIsCustom(true);
      onUpdate("selectedTitle", custom);
      onUpdate("customTitle", customTitle);
      onUpdate("isCustomTitle", true);
      setSophiaMessage("Love the creativity! Let's make this your best piece yet!");
    }
  };

  const regenerateTitles = () => {
    setIsGenerating(true);
    setSophiaMessage("Generating fresh ideas based on your profile...");
    
    setTimeout(() => {
      // Simulate new titles generation
      const newTitles = titles.map(t => ({
        ...t,
        title: t.title + " (New)",
        score: Math.floor(Math.random() * 20) + 80,
      }));
      setTitles(newTitles);
      setIsGenerating(false);
      setSophiaMessage("Fresh titles ready! These are tailored just for you.");
    }, 2000);
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "Very High": return "text-green-600 bg-green-50 border-green-200";
      case "High": return "text-blue-600 bg-blue-50 border-blue-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your First Fire Piece 🔥</h2>
        <p className="text-gray-600">Select a title that resonates with you, or create your own masterpiece.</p>
      </div>

      {/* Regenerate Button */}
      <div className="flex justify-end">
        <button
          onClick={regenerateTitles}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <RefreshCw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
          {isGenerating ? "Generating..." : "Refresh Suggestions"}
        </button>
      </div>

      {/* Suggested Titles */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI-Suggested Titles
        </h3>
        <div className="space-y-3">
          {titles.map((title) => {
            const isSelected = selectedTitle?.id === title.id && !isCustom;
            
            return (
              <motion.button
                key={title.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectTitle(title)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  isSelected
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 pr-4 flex-1">{title.title}</h4>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                    {title.category}
                  </span>
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full border",
                    getEngagementColor(title.engagement)
                  )}>
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {title.engagement}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {title.readTime}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-gray-500">Score</span>
                    <div className="relative w-12 h-12">
                      <svg className="transform -rotate-90 w-12 h-12">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="#E5E7EB"
                          strokeWidth="4"
                          fill="none"
                        />
                        <motion.circle
                          initial={{ strokeDashoffset: 126 }}
                          animate={{ strokeDashoffset: 126 - (126 * title.score) / 100 }}
                          transition={{ duration: 0.5 }}
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="#8B5CF6"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="126"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">
                        {title.score}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Custom Title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Or Create Your Own</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Enter your brilliant title here..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onKeyDown={(e) => e.key === "Enter" && handleCustomTitle()}
          />
          <button
            onClick={handleCustomTitle}
            disabled={!customTitle.trim()}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2",
              customTitle.trim()
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
        
        {isCustom && selectedTitle && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg"
          >
            <p className="text-sm text-green-700">
              ✓ Custom title selected: "{selectedTitle.title}"
            </p>
          </motion.div>
        )}
      </div>

      {/* Selected Title Preview */}
      {selectedTitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
        >
          <h4 className="text-sm font-semibold text-purple-900 mb-2">Selected Title</h4>
          <p className="text-lg font-bold text-gray-900 mb-4">{selectedTitle.title}</p>
          <p className="text-sm text-gray-600">
            Ready to create amazing content with this title? Let's move to the editor!
          </p>
        </motion.div>
      )}
    </div>
  );
}