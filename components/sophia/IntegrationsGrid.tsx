"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MessageSquare, 
  Github, 
  FileText, 
  Sheet, 
  ShoppingBag, 
  HardDrive, 
  Database, 
  Briefcase,
  Check,
  Shield,
  Key,
  Link2,
  TrendingUp,
  Users,
  Zap,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

// Integration data with descriptions and auth methods
const integrations = [
  {
    id: "gmail",
    name: "Gmail",
    icon: Mail,
    color: "from-red-400 to-red-600",
    bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
    borderColor: "border-red-200",
    description: "Connect your email to analyze communication patterns and writing style",
    authMethods: ["OAuth2", "Bearer Token"],
    metrics: {
      label: "Emails synced",
      value: "0"
    }
  },
  {
    id: "slack",
    name: "Slack",
    icon: MessageSquare,
    color: "from-purple-400 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    description: "Import team conversations and collaborative discussions",
    authMethods: ["OAuth2", "Bearer Token"],
    metrics: {
      label: "Messages analyzed",
      value: "0"
    }
  },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    color: "from-gray-700 to-gray-900",
    bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
    borderColor: "border-gray-300",
    description: "Sync repositories, issues, and pull requests for technical content",
    authMethods: ["OAuth2"],
    metrics: {
      label: "Repos connected",
      value: "0"
    }
  },
  {
    id: "notion",
    name: "Notion",
    icon: FileText,
    color: "from-gray-600 to-gray-800",
    bgColor: "bg-gradient-to-br from-gray-50 to-slate-50",
    borderColor: "border-gray-200",
    description: "Import your knowledge base, notes, and documentation",
    authMethods: ["OAuth2", "API Key"],
    metrics: {
      label: "Pages imported",
      value: "0"
    }
  },
  {
    id: "sheets",
    name: "Google Sheets",
    icon: Sheet,
    color: "from-green-400 to-green-600",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    description: "Connect spreadsheets for data-driven content creation",
    authMethods: ["OAuth2"],
    metrics: {
      label: "Sheets linked",
      value: "0"
    }
  },
  {
    id: "shopify",
    name: "Shopify",
    icon: ShoppingBag,
    color: "from-green-500 to-green-700",
    bgColor: "bg-gradient-to-br from-green-50 to-lime-50",
    borderColor: "border-green-200",
    description: "Sync product data and e-commerce analytics",
    authMethods: ["API Key", "OAuth2"],
    metrics: {
      label: "Products synced",
      value: "0"
    }
  },
  {
    id: "drive",
    name: "Google Drive",
    icon: HardDrive,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-sky-50",
    borderColor: "border-blue-200",
    description: "Access documents and files from your cloud storage",
    authMethods: ["OAuth2", "Bearer Token"],
    metrics: {
      label: "Files accessible",
      value: "0"
    }
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: Database,
    color: "from-emerald-400 to-teal-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    description: "Connect your database for dynamic content generation",
    authMethods: ["OAuth2", "API Key"],
    metrics: {
      label: "Tables connected",
      value: "0"
    }
  },
  {
    id: "hubspot",
    name: "HubSpot",
    icon: Briefcase,
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    borderColor: "border-orange-200",
    description: "Integrate CRM data for personalized content",
    authMethods: ["OAuth2", "Bearer Token"],
    metrics: {
      label: "Contacts synced",
      value: "0"
    }
  }
];

// Auth method badge component
function AuthBadge({ method }: { method: string }) {
  const getIcon = () => {
    switch (method) {
      case "OAuth2":
        return <Shield className="w-3 h-3" />;
      case "API Key":
        return <Key className="w-3 h-3" />;
      case "Bearer Token":
        return <Link2 className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (method) {
      case "OAuth2":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "API Key":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Bearer Token":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
      getColor()
    )}>
      {getIcon()}
      {method}
    </span>
  );
}

interface IntegrationsGridProps {
  onUpdate?: (key: string, value: any) => void;
  data?: any;
  setSophiaMessage?: (message: string) => void;
}

export default function IntegrationsGrid({ 
  onUpdate, 
  data, 
  setSophiaMessage 
}: IntegrationsGridProps) {
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(
    data?.selectedIntegrations || []
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage("Let's connect your favorite tools! I'll use these to understand your workflow and create content that fits perfectly.");
    }
  }, [setSophiaMessage]);

  const handleIntegrationToggle = (id: string) => {
    const updated = selectedIntegrations.includes(id)
      ? selectedIntegrations.filter(i => i !== id)
      : [...selectedIntegrations, id];
    
    setSelectedIntegrations(updated);
    
    if (onUpdate) {
      onUpdate("selectedIntegrations", updated);
    }

    // Update Sophia's message based on selection
    if (setSophiaMessage) {
      if (updated.length === 0) {
        setSophiaMessage("Select the tools you use daily. I'll adapt to your existing workflow!");
      } else if (updated.length === 1) {
        setSophiaMessage("Great start! Add more integrations to give me a complete picture.");
      } else if (updated.length >= 3) {
        setSophiaMessage("Perfect! With these integrations, I'll create content that truly sounds like you.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connect Your Tools
        </h2>
        <p className="text-gray-600">
          Select the integrations you'd like to connect. Sophia will use these to learn your style and automate content creation.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Zap className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {selectedIntegrations.length} of {integrations.length} integrations selected
            </p>
            <p className="text-xs text-gray-600">
              {selectedIntegrations.length > 0 
                ? "Click any integration to configure"
                : "Select integrations to get started"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-600">
            {selectedIntegrations.length > 0 ? "Active" : "Ready"}
          </span>
        </div>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            const isSelected = selectedIntegrations.includes(integration.id);
            const isHovered = hoveredCard === integration.id;

            return (
              <motion.div
                key={integration.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => handleIntegrationToggle(integration.id)}
                  onMouseEnter={() => setHoveredCard(integration.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={cn(
                    "relative w-full p-5 rounded-xl border-2 transition-all text-left",
                    "transform-gpu", // Enable GPU acceleration
                    isSelected
                      ? `${integration.bgColor} ${integration.borderColor} shadow-lg`
                      : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                  )}
                >
                  {/* Selected Indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Content */}
                  <div className="space-y-3">
                    {/* Icon and Name */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={cn(
                            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm",
                            integration.color
                          )}
                          animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {typeof integration.icon === 'function' ? (
                            <integration.icon />
                          ) : (
                            <Icon className="w-6 h-6 text-white" />
                          )}
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {integration.name}
                          </h3>
                          {/* Metrics */}
                          <p className="text-xs text-gray-500 mt-0.5">
                            {integration.metrics.label}: {integration.metrics.value}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {integration.description}
                    </p>

                    {/* Auth Methods */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {integration.authMethods.map((method) => (
                        <AuthBadge key={method} method={method} />
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-xl pointer-events-none",
                      "bg-gradient-to-br opacity-0",
                      integration.color
                    )}
                    animate={{ opacity: isHovered && !isSelected ? 0.03 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Shield className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Secure & Private
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your data is encrypted and never shared. Sophia only accesses what you explicitly authorize, and you can revoke access anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}