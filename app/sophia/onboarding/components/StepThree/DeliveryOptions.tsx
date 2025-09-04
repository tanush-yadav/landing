"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Download, Globe, FileText, Code, Cloud, Check, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const deliveryOptions = [
  {
    id: "wordpress",
    name: "WordPress",
    description: "One-click publish to your blog",
    icon: Globe,
    color: "from-blue-500 to-blue-600",
    popular: false,
    comingSoon: false,
  },
  {
    id: "ghost",
    name: "Ghost CMS",
    description: "Publish to your Ghost blog",
    icon: FileText,
    color: "from-gray-600 to-gray-800",
    popular: false,
    comingSoon: false,
  },
  {
    id: "webflow",
    name: "Webflow",
    description: "Update your Webflow site",
    icon: Cloud,
    color: "from-purple-500 to-purple-600",
    popular: false,
    comingSoon: true,
  },
  {
    id: "medium",
    name: "Medium",
    description: "Share on Medium platform",
    icon: FileText,
    color: "from-green-500 to-green-600",
    popular: false,
    comingSoon: false,
  },
  {
    id: "substack",
    name: "Substack",
    description: "Send to your subscribers",
    icon: Mail,
    color: "from-orange-500 to-orange-600",
    popular: false,
    comingSoon: false,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Save as markdown file",
    icon: Code,
    color: "from-gray-700 to-gray-900",
    popular: false,
    comingSoon: false,
  },
  {
    id: "email",
    name: "Email Delivery",
    description: "Get it in your inbox",
    icon: Mail,
    color: "from-indigo-500 to-purple-600",
    popular: true,
    comingSoon: false,
    easiest: true,
  },
  {
    id: "copy",
    name: "Copy to Clipboard",
    description: "Quick copy for anywhere",
    icon: Copy,
    color: "from-teal-500 to-cyan-600",
    popular: false,
    comingSoon: false,
  },
];

interface DeliveryOptionsProps {
  onUpdate: (key: string, value: any) => void;
  data: any;
  setSophiaMessage: (message: string) => void;
}

export default function DeliveryOptions({ onUpdate, data, setSophiaMessage }: DeliveryOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(data.deliveryOption || null);
  const [email, setEmail] = useState(data.deliveryEmail || "");
  const [isDelivering, setIsDelivering] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {
    setSophiaMessage("Fresh content, ready to serve! Choose how you'd like to deliver your masterpiece.");
  }, [setSophiaMessage]);

  const handleSelectOption = (optionId: string) => {
    if (deliveryOptions.find(o => o.id === optionId)?.comingSoon) {
      setSophiaMessage("This integration is coming soon! Choose another option for now.");
      return;
    }
    
    setSelectedOption(optionId);
    onUpdate("deliveryOption", optionId);
    
    const option = deliveryOptions.find(o => o.id === optionId);
    if (option?.easiest) {
      setSophiaMessage("Great choice! Email is the easiest way to get started. Just enter your email below!");
    } else {
      setSophiaMessage(`Perfect! Let's deliver your content via ${option?.name}.`);
    }
  };

  const handleDeliver = () => {
    if (!selectedOption) {
      setSophiaMessage("Please select a delivery option first!");
      return;
    }

    if (selectedOption === "email" && !email) {
      setSophiaMessage("Please enter your email address!");
      return;
    }

    setIsDelivering(true);
    setSophiaMessage("Delivering your content... Almost there!");

    setTimeout(() => {
      setIsDelivering(false);
      setDelivered(true);
      
      if (selectedOption === "copy") {
        setCopiedToClipboard(true);
        navigator.clipboard.writeText(JSON.stringify(data));
        setSophiaMessage("Content copied to clipboard! You can paste it anywhere now.");
        setTimeout(() => setCopiedToClipboard(false), 3000);
      } else {
        setSophiaMessage("Success! Your content has been delivered. Check your destination!");
      }
      
      onUpdate("delivered", true);
      onUpdate("deliveryMethod", selectedOption);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How Do You Want This Dish Served? 🍽️</h2>
        <p className="text-gray-600">Your content is ready! Choose your preferred delivery method.</p>
      </div>

      {/* Content Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Content Ready!</h3>
            <p className="text-sm text-gray-600">
              {data.wordCount || 0} words • {Math.ceil((data.wordCount || 0) / 200)} min read
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-green-100">
          <h4 className="font-bold text-gray-900 mb-2">{data.selectedTitle?.title || "Your Content"}</h4>
          <p className="text-sm text-gray-600 line-clamp-3">
            {data.thesis || "Your amazing content is ready to be shared with the world..."}
          </p>
        </div>
      </motion.div>

      {/* Delivery Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {deliveryOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedOption === option.id;
          
          return (
            <motion.button
              key={option.id}
              whileHover={{ scale: option.comingSoon ? 1 : 1.02 }}
              whileTap={{ scale: option.comingSoon ? 1 : 0.98 }}
              onClick={() => handleSelectOption(option.id)}
              disabled={option.comingSoon}
              className={cn(
                "relative p-4 rounded-xl border-2 text-left transition-all",
                isSelected
                  ? "border-purple-400 bg-purple-50"
                  : option.comingSoon
                  ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              {option.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full"
                >
                  Popular
                </motion.div>
              )}
              
              {option.easiest && (
                <motion.div
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 5 }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  className="absolute -top-4 -right-4 w-16 h-16"
                >
                  <Image
                    src="/images/sophia-agent.png"
                    alt="Sophia pointing"
                    fill
                    className="object-contain"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-2 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
                  >
                    Easiest!
                  </motion.div>
                </motion.div>
              )}
              
              {option.comingSoon && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-400 text-white text-xs font-medium rounded">
                  Coming Soon
                </div>
              )}
              
              {isSelected && !option.comingSoon && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -left-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <div className={cn("w-12 h-12 rounded-lg bg-gradient-to-br mb-3", option.color)}>
                <Icon className="w-full h-full p-3 text-white" />
              </div>
              
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{option.name}</h4>
              <p className="text-xs text-gray-600">{option.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Email Input (if email selected) */}
      <AnimatePresence>
        {selectedOption === "email" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-purple-50 rounded-xl p-6 border border-purple-200"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your email address
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  onUpdate("deliveryEmail", e.target.value);
                }}
                placeholder="you@example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              We'll send your content directly to your inbox, formatted and ready to use!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delivery Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDeliver}
        disabled={!selectedOption || isDelivering || delivered}
        className={cn(
          "w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3",
          delivered
            ? "bg-green-500 text-white"
            : selectedOption
            ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        )}
      >
        {isDelivering ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            Delivering Your Content...
          </>
        ) : delivered ? (
          <>
            <Check className="w-5 h-5" />
            Successfully Delivered!
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Deliver My Content
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </motion.button>

      {/* Copy Success Notification */}
      <AnimatePresence>
        {copiedToClipboard && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Confetti */}
      {delivered && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1,
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 600,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 600,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5,
              }}
            >
              {["🎉", "🎊", "✨", "⭐", "🌟"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}