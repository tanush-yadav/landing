"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Link2, FileText, Video, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const integrations = [
  { id: "zoom", name: "Zoom", icon: Video, color: "from-blue-400 to-blue-600" },
  { id: "meet", name: "Google Meet", icon: Video, color: "from-green-400 to-green-600" },
  { id: "teams", name: "Teams", icon: Video, color: "from-purple-400 to-purple-600" },
  { id: "loom", name: "Loom", icon: Video, color: "from-red-400 to-red-600" },
];

interface HowYouTalkProps {
  onUpdate: (key: string, value: any) => void;
  data: any;
  setSophiaMessage: (message: string) => void;
}

export default function HowYouTalk({ onUpdate, data, setSophiaMessage }: HowYouTalkProps) {
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(data.integrations || []);
  const [notionLink, setNotionLink] = useState(data.notionLink || "");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(data.transcripts || []);

  useEffect(() => {
    setSophiaMessage("So I can speak your language! Upload your meeting transcripts or connect your favorite tools.");
  }, [setSophiaMessage]);

  const handleIntegrationToggle = (id: string) => {
    const updated = selectedIntegrations.includes(id)
      ? selectedIntegrations.filter(i => i !== id)
      : [...selectedIntegrations, id];
    setSelectedIntegrations(updated);
    onUpdate("integrations", updated);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
    onUpdate("transcripts", [...uploadedFiles, ...files]);
    setSophiaMessage("Great! I'm analyzing your communication style...");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How Do You Talk?</h2>
        <p className="text-gray-600">Help me understand your communication style by sharing your meeting transcripts and conversations.</p>
      </div>

      {/* Integration Cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect Your Meeting Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            const isSelected = selectedIntegrations.includes(integration.id);
            
            return (
              <motion.button
                key={integration.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleIntegrationToggle(integration.id)}
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
                <div className={cn("w-12 h-12 rounded-lg bg-gradient-to-br mx-auto mb-2", integration.color)}>
                  <Icon className="w-full h-full p-3 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-800">{integration.name}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Upload Zone */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Or Upload Transcript Files</h3>
        <motion.div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 transition-all",
            isDragging
              ? "border-purple-400 bg-purple-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          )}
        >
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-700 font-medium mb-2">Drop your transcript files here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setUploadedFiles(prev => [...prev, ...files]);
                onUpdate("transcripts", [...uploadedFiles, ...files]);
              }}
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
              Choose Files
            </label>
          </div>
        </motion.div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
              >
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700 flex-1">{file.name}</span>
                <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Notion Link */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Link Your Notion Docs</h3>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="url"
            value={notionLink}
            onChange={(e) => {
              setNotionLink(e.target.value);
              onUpdate("notionLink", e.target.value);
            }}
            placeholder="https://notion.so/your-workspace..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}