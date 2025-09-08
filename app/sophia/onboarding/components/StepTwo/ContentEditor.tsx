"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bold, Italic, List, Link2, AlignLeft, AlignCenter, AlignRight, Type, Copy, RefreshCw, Save, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentEditorProps {
  onUpdate: (key: string, value: unknown) => void;
  data: Record<string, unknown>;
  setSophiaMessage: (message: string) => void;
}

const formatButtons = [
  { icon: Bold, command: "bold", tooltip: "Bold" },
  { icon: Italic, command: "italic", tooltip: "Italic" },
  { icon: List, command: "insertUnorderedList", tooltip: "Bullet List" },
  { icon: Link2, command: "createLink", tooltip: "Insert Link" },
  { icon: AlignLeft, command: "justifyLeft", tooltip: "Align Left" },
  { icon: AlignCenter, command: "justifyCenter", tooltip: "Align Center" },
  { icon: AlignRight, command: "justifyRight", tooltip: "Align Right" },
];

const sophiaMessages = [
  "Great start! Keep that momentum going!",
  "I love where this is heading!",
  "Your unique voice is really shining through!",
  "This is exactly the kind of content your audience needs!",
  "Brilliant point! Your readers will love this insight.",
];

export default function ContentEditor({ onUpdate, data, setSophiaMessage }: ContentEditorProps) {
  const [thesis, setThesis] = useState((data.thesis as string) || "");
  const [antithesis, setAntithesis] = useState((data.antithesis as string) || "");
  const [synthesis, setSynthesis] = useState((data.synthesis as string) || "");
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [activeSection, setActiveSection] = useState<"thesis" | "antithesis" | "synthesis">("thesis");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [sophiaReaction, setSophiaReaction] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  
  const thesisRef = useRef<HTMLDivElement>(null);
  const antithesisRef = useRef<HTMLDivElement>(null);
  const synthesisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSophiaMessage("Time to write! I'll help you craft something amazing. Start with your thesis.");
  }, [setSophiaMessage]);

  useEffect(() => {
    // Calculate word count and reading time
    const totalWords = `${thesis} ${antithesis} ${synthesis}`.split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(totalWords);
    setReadingTime(Math.ceil(totalWords / 200)); // Average reading speed
    
    // Update data
    onUpdate("thesis", thesis);
    onUpdate("antithesis", antithesis);
    onUpdate("synthesis", synthesis);
    onUpdate("wordCount", totalWords);
    
    // Check section completion
    const completed = [];
    if (thesis.split(/\s+/).length > 50) completed.push("thesis");
    if (antithesis.split(/\s+/).length > 50) completed.push("antithesis");
    if (synthesis.split(/\s+/).length > 50) completed.push("synthesis");
    setCompletedSections(completed);
    
    // Sophia reactions based on progress
    if (totalWords > 0 && totalWords % 50 === 0) {
      const randomMessage = sophiaMessages[Math.floor(Math.random() * sophiaMessages.length)];
      setSophiaMessage(randomMessage);
      setSophiaReaction("excited");
      setTimeout(() => setSophiaReaction(""), 2000);
    }
  }, [thesis, antithesis, synthesis, onUpdate, setSophiaMessage]);

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
  };

  const handleSectionChange = (section: "thesis" | "antithesis" | "synthesis", value: string) => {
    switch (section) {
      case "thesis":
        setThesis(value);
        break;
      case "antithesis":
        setAntithesis(value);
        break;
      case "synthesis":
        setSynthesis(value);
        break;
    }
  };

  const getSophiaSuggestion = () => {
    setShowSuggestion(true);
    setSophiaMessage("Here's a suggestion to enhance your writing!");
    setTimeout(() => setShowSuggestion(false), 5000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {(data.selectedTitle as any)?.title || "Your Content"}
        </h2>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {wordCount} words
          </span>
          <span>{readingTime} min read</span>
          <span className="ml-auto">
            {completedSections.length}/3 sections complete
          </span>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center gap-1">
        {formatButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.command}
              onClick={() => handleFormat(button.command)}
              className="p-2 rounded hover:bg-gray-100 transition-colors group relative"
              title={button.tooltip}
            >
              <Icon className="w-4 h-4 text-gray-600" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {button.tooltip}
              </span>
            </button>
          );
        })}
        
        <div className="ml-auto">
          <button
            onClick={getSophiaSuggestion}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Get AI Suggestion
          </button>
        </div>
      </div>

      {/* AI Suggestion */}
      <AnimatePresence>
        {showSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200"
          >
            <p className="text-sm text-purple-900">
              <strong>Suggestion:</strong> Consider adding a personal anecdote or case study to make your thesis more relatable and engaging for your readers.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Thesis Section */}
        <motion.div
          className={cn(
            "relative bg-white rounded-xl border-2 transition-all",
            activeSection === "thesis" ? "border-purple-400 shadow-lg" : "border-gray-200"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">Thesis</h3>
              {completedSections.includes("thesis") && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </div>
            <span className="text-xs text-gray-500">Present your main argument</span>
          </div>
          <div
            ref={thesisRef}
            contentEditable
            className="p-4 min-h-[150px] focus:outline-none"
            data-placeholder="Present your main argument..."
            onFocus={() => setActiveSection("thesis")}
            onInput={(e) => handleSectionChange("thesis", e.currentTarget.textContent || "")}
            dangerouslySetInnerHTML={{ __html: thesis }}
          />
        </motion.div>

        {/* Antithesis Section */}
        <motion.div
          className={cn(
            "relative bg-white rounded-xl border-2 transition-all",
            activeSection === "antithesis" ? "border-purple-400 shadow-lg" : "border-gray-200"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">Antithesis</h3>
              {completedSections.includes("antithesis") && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </div>
            <span className="text-xs text-gray-500">Explore the counterpoint</span>
          </div>
          <div
            ref={antithesisRef}
            contentEditable
            className="p-4 min-h-[150px] focus:outline-none"
            data-placeholder="Explore the counterpoint..."
            onFocus={() => setActiveSection("antithesis")}
            onInput={(e) => handleSectionChange("antithesis", e.currentTarget.textContent || "")}
            dangerouslySetInnerHTML={{ __html: antithesis }}
          />
        </motion.div>

        {/* Synthesis Section */}
        <motion.div
          className={cn(
            "relative bg-white rounded-xl border-2 transition-all",
            activeSection === "synthesis" ? "border-purple-400 shadow-lg" : "border-gray-200"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">Synthesis</h3>
              {completedSections.includes("synthesis") && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </div>
            <span className="text-xs text-gray-500">Bring it all together</span>
          </div>
          <div
            ref={synthesisRef}
            contentEditable
            className="p-4 min-h-[150px] focus:outline-none"
            data-placeholder="Bring it all together..."
            onFocus={() => setActiveSection("synthesis")}
            onInput={(e) => handleSectionChange("synthesis", e.currentTarget.textContent || "")}
            dangerouslySetInnerHTML={{ __html: synthesis }}
          />
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Content Progress</span>
          <span className="text-sm text-gray-600">{Math.round((completedSections.length / 3) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedSections.length / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
          />
        </div>
      </div>

      {/* Sophia Reaction Animation */}
      <AnimatePresence>
        {sophiaReaction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-8 right-8 bg-white rounded-xl shadow-xl p-4 border-2 border-purple-200"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎉</div>
              <p className="text-sm font-medium text-gray-800">Keep going! You're doing great!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}