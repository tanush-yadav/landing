"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SophiaCompanion from "./components/SophiaCompanion";
import ProgressIndicator from "./components/ProgressIndicator";

// Step One Components
import IntegrationsSetup from "./components/StepOne/IntegrationsSetup";
import HowYouTalk from "./components/StepOne/HowYouTalk";
import WhatYouConsume from "./components/StepOne/WhatYouConsume";
import BrandNarratives from "./components/StepOne/BrandNarratives";
import SocialPresence from "./components/StepOne/SocialPresence";
import StyleGuide from "./components/StepOne/StyleGuide";

// Step Two Components
import TitleSelector from "./components/StepTwo/TitleSelector";
import ContentEditor from "./components/StepTwo/ContentEditor";
import CookingAnimation from "./components/StepTwo/CookingAnimation";

// Step Three Components
import DeliveryOptions from "./components/StepThree/DeliveryOptions";

const TOTAL_STEPS = 10; // 6 sub-steps in Step 1 (including integrations), 2 in Step 2, 1 cooking, 1 in Step 3

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({});
  const [isCooking, setIsCooking] = useState(false);
  const [sophiaMessage, setSophiaMessage] = useState("Welcome! Let's get to know each other better.");

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem("sophia-onboarding-progress");
    if (savedProgress) {
      const { step, data } = JSON.parse(savedProgress);
      setCurrentStep(step);
      setOnboardingData(data);
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem(
      "sophia-onboarding-progress",
      JSON.stringify({ step: currentStep, data: onboardingData })
    );
  }, [currentStep, onboardingData]);

  const handleNext = () => {
    if (currentStep === 7) {
      // After content editor, show cooking animation
      setIsCooking(true);
      setTimeout(() => {
        setIsCooking(false);
        setCurrentStep(currentStep + 1);
      }, 5000);
    } else {
      setCurrentStep(Math.min(currentStep + 1, TOTAL_STEPS - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const updateData = (key: string, value: any) => {
    setOnboardingData(prev => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <IntegrationsSetup onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      case 1:
        return <HowYouTalk onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      case 2:
        return <WhatYouConsume onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      case 3:
        return <BrandNarratives onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      case 4:
        return <SocialPresence onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      case 5:
        return <StyleGuide onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      case 6:
        return <TitleSelector onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      case 7:
        return <ContentEditor onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      case 8:
        return <DeliveryOptions onUpdate={updateData} data={onboardingData} setSophiaMessage={setSophiaMessage} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    if (currentStep <= 5) return "Share Your Brain's Context";
    if (currentStep <= 7) return "Your First Fire Piece";
    return "How Do You Want This Dish Served?";
  };

  const getMainStep = () => {
    if (currentStep <= 5) return 1;
    if (currentStep <= 7) return 2;
    return 3;
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        {isCooking ? (
          <CookingAnimation />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            
            {/* Header */}
            <div className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link
                      href="/sophia"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                      <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                      <span className="text-sm font-medium">Back to Sophia</span>
                    </Link>
                    <div className="border-l border-gray-300 h-8" />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Sophia Onboarding</h1>
                      <p className="text-sm text-gray-600 mt-1">Step {getMainStep()} of 3: {getStepTitle()}</p>
                    </div>
                  </div>
                  <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sophia Companion */}
                <div className="lg:col-span-3">
                  <SophiaCompanion 
                    message={sophiaMessage}
                    currentStep={currentStep}
                    expression={currentStep === 7 ? "writing" : "friendly"}
                  />
                </div>

                {/* Step Content */}
                <div className="lg:col-span-9">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px]"
                    >
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                        currentStep === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                      )}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Back
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={currentStep === TOTAL_STEPS - 1}
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                        currentStep === TOTAL_STEPS - 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                      )}
                    >
                      {currentStep === 7 ? "Cook My Content" : "Next"}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}