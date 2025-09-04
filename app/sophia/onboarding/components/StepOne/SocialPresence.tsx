"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Globe, TrendingUp, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const socialPlatforms = [
  { id: "twitter", name: "X / Twitter", icon: Twitter, color: "from-blue-400 to-blue-600" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-800" },
  { id: "github", name: "GitHub", icon: Github, color: "from-gray-600 to-gray-800" },
  { id: "personal", name: "Personal Site", icon: Globe, color: "from-purple-400 to-purple-600" },
];

interface SocialPresenceProps {
  onUpdate: (key: string, value: any) => void;
  data: any;
  setSophiaMessage: (message: string) => void;
}

export default function SocialPresence({ onUpdate, data, setSophiaMessage }: SocialPresenceProps) {
  const [connectedPlatforms, setConnectedPlatforms] = useState<any>(data.socialPlatforms || {});
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setSophiaMessage("Let me understand your social voice! Connect your profiles for personality analysis.");
  }, [setSophiaMessage]);

  const handleConnect = (platformId: string) => {
    setIsAnalyzing(true);
    setSophiaMessage("Analyzing your social presence...");
    
    // Simulate connection and analysis
    setTimeout(() => {
      const mockData = {
        posts: Math.floor(Math.random() * 1000) + 100,
        engagement: Math.floor(Math.random() * 10000) + 1000,
        topics: ["Technology", "Innovation", "Startups", "AI"],
        tone: ["Professional", "Insightful", "Engaging"],
        peakHours: ["9 AM", "2 PM", "7 PM"],
      };
      
      setConnectedPlatforms((prev: any) => ({
        ...prev,
        [platformId]: mockData
      }));
      onUpdate("socialPlatforms", { ...connectedPlatforms, [platformId]: mockData });
      setIsAnalyzing(false);
      setSophiaMessage("Excellent! I'm learning your communication style.");
      
      // Trigger personality analysis
      if (Object.keys(connectedPlatforms).length >= 1) {
        analyzePersonality();
      }
    }, 2000);
  };

  const analyzePersonality = () => {
    setTimeout(() => {
      setAnalysisResults({
        personality: {
          type: "Thought Leader",
          traits: ["Innovative", "Analytical", "Engaging", "Forward-thinking"],
          strengths: ["Clear communication", "Industry expertise", "Community building"],
        },
        insights: {
          bestTime: "Morning (9-11 AM)",
          topContent: "Educational threads and insights",
          audience: "Tech professionals and entrepreneurs",
        }
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Presence</h2>
        <p className="text-gray-600">Connect your social profiles to help me understand your online voice and personality.</p>
      </div>

      {/* Platform Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const isConnected = !!connectedPlatforms[platform.id];
          
          return (
            <motion.div
              key={platform.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative p-6 rounded-xl border-2 transition-all cursor-pointer",
                isConnected
                  ? "border-green-400 bg-green-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
              onClick={() => !isConnected && handleConnect(platform.id)}
            >
              {isConnected && (
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
              
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center", platform.color)}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                  {isConnected ? (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-600">
                        {connectedPlatforms[platform.id]?.posts} posts analyzed
                      </p>
                      <p className="text-xs text-green-600 font-medium">Connected</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">Click to connect</p>
                  )}
                </div>
              </div>

              {isConnected && connectedPlatforms[platform.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {connectedPlatforms[platform.id].posts}
                      </p>
                      <p className="text-xs text-gray-600">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {connectedPlatforms[platform.id].engagement}
                      </p>
                      <p className="text-xs text-gray-600">Engagement</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Activity Heatmap */}
      {Object.keys(connectedPlatforms).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Activity Analysis
          </h3>
          
          <div className="grid grid-cols-7 gap-1 mb-4">
            {Array.from({ length: 35 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                className={cn(
                  "aspect-square rounded",
                  Math.random() > 0.5
                    ? Math.random() > 0.7
                      ? "bg-purple-600"
                      : "bg-purple-400"
                    : Math.random() > 0.8
                    ? "bg-purple-200"
                    : "bg-gray-100"
                )}
                title={`Week ${Math.floor(i / 7) + 1}, Day ${(i % 7) + 1}`}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Less active</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-100 rounded" />
              <div className="w-3 h-3 bg-purple-200 rounded" />
              <div className="w-3 h-3 bg-purple-400 rounded" />
              <div className="w-3 h-3 bg-purple-600 rounded" />
            </div>
            <span>More active</span>
          </div>
        </motion.div>
      )}

      {/* Personality Analysis */}
      {analysisResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border-2 border-purple-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Personality Analysis
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Communication Type</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {analysisResults.personality.type}
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Key Traits</p>
              <div className="flex flex-wrap gap-2">
                {analysisResults.personality.traits.map((trait: string) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Strengths</p>
              <ul className="space-y-1">
                {analysisResults.personality.strengths.map((strength: string) => (
                  <li key={strength} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full"
              />
              <p className="font-medium text-gray-900">Analyzing your social presence...</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}