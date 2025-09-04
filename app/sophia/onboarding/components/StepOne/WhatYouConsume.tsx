"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Check, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

const popularCreators = [
  { 
    id: 1, 
    name: "Paul Graham", 
    handle: "@paulg", 
    avatar: "PG",
    description: "Founder of Y Combinator",
    topics: ["Startups", "Essays", "Tech"],
    preview: "The best way to get startup ideas is not to try to think of startup ideas. It's to look for problems..."
  },
  { 
    id: 2, 
    name: "Naval Ravikant", 
    handle: "@naval", 
    avatar: "NR",
    description: "Entrepreneur & Angel Investor",
    topics: ["Philosophy", "Wealth", "Happiness"],
    preview: "Seek wealth, not money or status. Wealth is having assets that earn while you sleep..."
  },
  { 
    id: 3, 
    name: "Balaji Srinivasan", 
    handle: "@balajis", 
    avatar: "BS",
    description: "Author of The Network State",
    topics: ["Crypto", "Tech", "Future"],
    preview: "The Network State is a social network with a moral innovation, a sense of national consciousness..."
  },
  { 
    id: 4, 
    name: "Patrick Collison", 
    handle: "@patrickc", 
    avatar: "PC",
    description: "CEO of Stripe",
    topics: ["Progress", "Science", "Business"],
    preview: "We should think more about how to accelerate the rate of scientific progress..."
  },
  { 
    id: 5, 
    name: "Lenny Rachitsky", 
    handle: "@lennysan", 
    avatar: "LR",
    description: "Product & Growth Expert",
    topics: ["Product", "Growth", "Strategy"],
    preview: "The best product managers are the ones who can zoom in and zoom out seamlessly..."
  },
  { 
    id: 6, 
    name: "Julie Zhuo", 
    handle: "@joulee", 
    avatar: "JZ",
    description: "Former VP of Design at Meta",
    topics: ["Design", "Leadership", "Product"],
    preview: "Good design is not just about how something looks, but how it works in people's lives..."
  },
];

interface WhatYouConsumeProps {
  onUpdate: (key: string, value: any) => void;
  data: any;
  setSophiaMessage: (message: string) => void;
}

export default function WhatYouConsume({ onUpdate, data, setSophiaMessage }: WhatYouConsumeProps) {
  const [selectedCreators, setSelectedCreators] = useState<number[]>(data.creators || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPreview, setSelectedPreview] = useState<typeof popularCreators[0] | null>(null);
  const [customLinks, setCustomLinks] = useState(data.customLinks || "");

  useEffect(() => {
    setSophiaMessage("Show me your reading diet! Select creators you follow or share your own writing.");
  }, [setSophiaMessage]);

  const handleCreatorToggle = (creatorId: number) => {
    const creator = popularCreators.find(c => c.id === creatorId);
    const updated = selectedCreators.includes(creatorId)
      ? selectedCreators.filter(id => id !== creatorId)
      : [...selectedCreators, creatorId];
    
    setSelectedCreators(updated);
    onUpdate("creators", updated);
    
    if (!selectedCreators.includes(creatorId) && creator) {
      setSelectedPreview(creator);
      setSophiaMessage(`Great choice! ${creator.name} writes amazing content.`);
    }
  };

  const filteredCreators = popularCreators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What Do You Consume?</h2>
        <p className="text-gray-600">Select creators whose content resonates with you, or share your own writing.</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search creators by name or topic..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Creator Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Creators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCreators.map((creator) => {
              const isSelected = selectedCreators.includes(creator.id);
              
              return (
                <motion.button
                  key={creator.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCreatorToggle(creator.id)}
                  onMouseEnter={() => setSelectedPreview(creator)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 text-left transition-all",
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
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {creator.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{creator.name}</h4>
                      <p className="text-xs text-gray-500">{creator.handle}</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">{creator.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {creator.topics.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Preview Panel */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Preview</h3>
          <AnimatePresence mode="wait">
            {selectedPreview ? (
              <motion.div
                key={selectedPreview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    {selectedPreview.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedPreview.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPreview.description}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <BookOpen className="w-5 h-5 text-gray-400 mb-2" />
                  <p className="text-gray-700 italic">"{selectedPreview.preview}"</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedPreview.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-white text-sm text-gray-700 rounded-full border border-purple-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300"
              >
                <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-center text-gray-500">
                  Hover over a creator to preview their content
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom Links Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Or Share Your Own Writing</h3>
        <textarea
          value={customLinks}
          onChange={(e) => {
            setCustomLinks(e.target.value);
            onUpdate("customLinks", e.target.value);
          }}
          placeholder="Paste links to your blog posts, articles, or any writing samples..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>
    </div>
  );
}