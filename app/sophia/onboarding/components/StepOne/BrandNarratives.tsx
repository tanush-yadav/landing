"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, FileText, BookOpen, Link2, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandNarrativesProps {
  onUpdate: (key: string, value: any) => void;
  data: any;
  setSophiaMessage: (message: string) => void;
}

export default function BrandNarratives({ onUpdate, data, setSophiaMessage }: BrandNarrativesProps) {
  const [websiteUrl, setWebsiteUrl] = useState(data.websiteUrl || "");
  const [docsUrl, setDocsUrl] = useState(data.docsUrl || "");
  const [blogUrl, setBlogUrl] = useState(data.blogUrl || "");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedContent, setScannedContent] = useState<any>(null);

  useEffect(() => {
    setSophiaMessage("Enlighten me with your brand story! I'll analyze your digital presence.");
  }, [setSophiaMessage]);

  const handleScan = async (url: string, type: string) => {
    if (!url) return;
    
    setIsScanning(true);
    setSophiaMessage("Analyzing your content... This is fascinating!");
    
    // Simulate content scanning
    setTimeout(() => {
      setScannedContent({
        type,
        url,
        preview: {
          title: type === "website" ? "Your Brand" : type === "docs" ? "Documentation" : "Blog Posts",
          description: "Successfully scanned and analyzed content structure",
          keywords: ["Innovation", "Technology", "Growth", "Community"],
          contentCount: Math.floor(Math.random() * 50) + 10
        }
      });
      setIsScanning(false);
      setSophiaMessage("Great content! I'm learning so much about your brand.");
    }, 2000);
  };

  const InputField = ({ 
    icon: Icon, 
    label, 
    placeholder, 
    value, 
    onChange, 
    type 
  }: {
    icon: any;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="url"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onUpdate(`${type}Url`, e.target.value);
          }}
          onBlur={() => value && handleScan(value, type)}
          placeholder={placeholder}
          className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {value && (
          <button
            onClick={() => handleScan(value, type)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors text-sm font-medium"
          >
            Scan
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Narratives</h2>
        <p className="text-gray-600">Share your brand's digital footprint so I can understand your story and voice.</p>
      </div>

      {/* Auto-detection Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Auto-Detection Active</p>
            <p className="text-xs text-gray-600">I'll automatically scan and analyze your content as you add links</p>
          </div>
        </div>
      </motion.div>

      {/* Input Fields */}
      <div className="space-y-4">
        <InputField
          icon={Globe}
          label="Website URL"
          placeholder="https://yourcompany.com"
          value={websiteUrl}
          onChange={setWebsiteUrl}
          type="website"
        />

        <InputField
          icon={FileText}
          label="Documentation / Knowledge Base"
          placeholder="https://docs.yourcompany.com"
          value={docsUrl}
          onChange={setDocsUrl}
          type="docs"
        />

        <InputField
          icon={BookOpen}
          label="Blog or Content Hub"
          placeholder="https://blog.yourcompany.com"
          value={blogUrl}
          onChange={setBlogUrl}
          type="blog"
        />
      </div>

      {/* Scanning Animation */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-gray-200" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-purple-600"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Scanning Content...</p>
              <p className="text-sm text-gray-600">Analyzing structure and extracting insights</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scanned Content Preview */}
      {scannedContent && !isScanning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Content Analyzed Successfully</h4>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-1">{scannedContent.preview.title}</p>
              <p className="text-xs text-gray-600">{scannedContent.preview.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs text-gray-500">
                  {scannedContent.preview.contentCount} pages analyzed
                </span>
                <span className="text-xs text-gray-500">
                  {scannedContent.preview.keywords.length} topics identified
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {scannedContent.preview.keywords.map((keyword: string) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-white text-xs text-gray-700 rounded-full border border-green-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Additional Resources */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Resources</h3>
        <p className="text-sm text-gray-600 mb-4">Have more content? Add any additional links here:</p>
        <textarea
          placeholder="Add any other relevant URLs (press releases, case studies, whitepapers...)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
          rows={3}
          onChange={(e) => onUpdate("additionalResources", e.target.value)}
          defaultValue={data.additionalResources || ""}
        />
      </div>
    </div>
  );
}