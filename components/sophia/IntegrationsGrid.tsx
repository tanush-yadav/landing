"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { 
  SiSlack,
  SiGoogleworkspace,
  SiNotion,
  SiGithub,
  SiLinear,
  SiFigma
} from "react-icons/si";
import { cn } from "@/lib/utils";

// Professional integration data
const integrations = [
  {
    id: "slack",
    name: "Slack",
    icon: SiSlack,
    description: "Team communication",
    color: "#4A154B"
  },
  {
    id: "google",
    name: "Google Workspace",
    icon: SiGoogleworkspace,
    description: "Documents & Drive",
    color: "#4285F4"
  },
  {
    id: "notion",
    name: "Notion",
    icon: SiNotion,
    description: "Knowledge management",
    color: "#000000"
  },
  {
    id: "github",
    name: "GitHub",
    icon: SiGithub,
    description: "Code repositories",
    color: "#181717"
  },
  {
    id: "linear",
    name: "Linear",
    icon: SiLinear,
    description: "Issue tracking",
    color: "#5E6AD2"
  },
  {
    id: "figma",
    name: "Figma",
    icon: SiFigma,
    description: "Design collaboration",
    color: "#F24E1E"
  }
];

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

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage("Select the tools you use to help Sophia understand your workflow");
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
      const count = updated.length;
      if (count === 0) {
        setSophiaMessage("Select the tools you use to help Sophia understand your workflow");
      } else {
        setSophiaMessage(`${count} ${count === 1 ? 'integration' : 'integrations'} selected`);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Clean Header */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-medium text-slate-900">
          Connect Your Workspace
        </h2>
        <p className="font-body text-base text-slate-500">
          Select the tools you use to help Sophia understand your workflow
        </p>
      </div>

      {/* Minimal Status */}
      <div className="space-y-3">
        <p className="font-body text-sm text-slate-500">
          {selectedIntegrations.length} of {integrations.length} selected
        </p>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(selectedIntegrations.length / integrations.length) * 100}%` 
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Professional Integration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const isSelected = selectedIntegrations.includes(integration.id);

          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: integrations.indexOf(integration) * 0.05 }}
            >
              <button
                onClick={() => handleIntegrationToggle(integration.id)}
                className={cn(
                  "relative w-full p-6 bg-white rounded-lg border text-left transition-all duration-150 group",
                  isSelected
                    ? "border-blue-500 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                )}
              >
                {/* Simple Checkbox */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150",
                    isSelected 
                      ? "bg-blue-500 border-blue-500 opacity-100" 
                      : "border-slate-300 bg-white"
                  )}>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Minimal Card Content */}
                <div className="space-y-3">
                  {/* Icon */}
                  {Icon && (
                    <Icon 
                      className="w-8 h-8 transition-colors duration-150" 
                      style={{ color: isSelected ? integration.color : '#94a3b8' }}
                    />
                  )}

                  {/* Text */}
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-medium text-slate-900">
                      {integration.name}
                    </h3>
                    <p className="font-body text-sm text-slate-500">
                      {integration.description}
                    </p>
                  </div>
                </div>

                {/* Selected indicator - visible on selected cards */}
                {isSelected && (
                  <div className="absolute top-6 right-6">
                    <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Professional Footer */}
      <div className="pt-6 border-t border-slate-100">
        <p className="font-body text-xs text-slate-500 leading-relaxed">
          Your data remains secure and private. All integrations use industry-standard encryption and you maintain full control over permissions. 
          <a href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors duration-150 underline underline-offset-2">
            View our privacy policy
          </a>
        </p>
      </div>
    </div>
  );
}