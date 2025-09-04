"use client";

import { useEffect } from "react";
import IntegrationsGrid from "@/components/sophia/IntegrationsGrid";

interface IntegrationsSetupProps {
  onUpdate: (key: string, value: unknown) => void;
  data: Record<string, unknown>;
  setSophiaMessage: (message: string) => void;
}

export default function IntegrationsSetup({ 
  onUpdate, 
  data, 
  setSophiaMessage 
}: IntegrationsSetupProps) {
  useEffect(() => {
    setSophiaMessage("Welcome! Let's start by connecting the tools you use every day. This helps me understand your workflow and create content that fits seamlessly.");
  }, [setSophiaMessage]);

  return (
    <IntegrationsGrid 
      onUpdate={onUpdate} 
      data={data} 
      setSophiaMessage={setSophiaMessage}
    />
  );
}