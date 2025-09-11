'use client'

import { SVGProps } from 'react'

// Company logo SVG components - These are placeholder designs
// Replace with actual company logos when available

export const YCombinatorLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="120" height="40" rx="8" fill="url(#yc-gradient)" />
    <text 
      x="60" 
      y="26" 
      textAnchor="middle" 
      fontSize="18" 
      fontWeight="bold" 
      fill="white"
    >
      YC
    </text>
    <defs>
      <linearGradient id="yc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="100%" stopColor="#F7931E" />
      </linearGradient>
    </defs>
  </svg>
)

export const SomaCapitalLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 140 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="140" height="42" rx="8" fill="url(#soma-gradient)" />
    <text 
      x="70" 
      y="20" 
      textAnchor="middle" 
      fontSize="12" 
      fontWeight="600" 
      fill="white"
    >
      SOMA
    </text>
    <text 
      x="70" 
      y="32" 
      textAnchor="middle" 
      fontSize="10" 
      fontWeight="400" 
      fill="white"
      opacity="0.8"
    >
      CAPITAL
    </text>
    <defs>
      <linearGradient id="soma-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
)

export const LangChainLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 130 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="130" height="38" rx="8" fill="url(#langchain-gradient)" />
    <g transform="translate(20, 8)">
      <circle cx="6" cy="6" r="3" fill="white" opacity="0.9" />
      <circle cx="16" cy="6" r="3" fill="white" opacity="0.7" />
      <circle cx="26" cy="6" r="3" fill="white" opacity="0.5" />
      <path 
        d="M3 12 L9 18 L15 12 L21 18 L27 12" 
        stroke="white" 
        strokeWidth="2" 
        fill="none" 
        opacity="0.8"
      />
    </g>
    <text 
      x="65" 
      y="26" 
      textAnchor="middle" 
      fontSize="11" 
      fontWeight="600" 
      fill="white"
    >
      LangChain
    </text>
    <defs>
      <linearGradient id="langchain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
)

// Logo component mapping
export const CompanyLogos = {
  YCombinator: YCombinatorLogo,
  'Soma Capital': SomaCapitalLogo,
  LangChain: LangChainLogo,
} as const

export type CompanyLogoKey = keyof typeof CompanyLogos