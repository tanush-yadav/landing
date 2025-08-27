import React from 'react';

interface AvatarProps {
  size?: number;
  className?: string;
}

// Alex - Junior Engineer (Blue/Cyan theme)
export const AlexAvatar: React.FC<AvatarProps> = ({ size = 80, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={`rounded-full ${className}`}
    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
  >
    <defs>
      <linearGradient id="alex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <pattern id="alex-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="transparent" />
        <circle cx="8" cy="8" r="1" fill="rgba(255,255,255,0.1)" />
      </pattern>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#alex-gradient)" />
    <circle cx="40" cy="40" r="40" fill="url(#alex-pattern)" />
    <circle cx="40" cy="32" r="12" fill="rgba(255,255,255,0.2)" />
    <path d="M20 65 C20 55, 28 50, 40 50 C52 50, 60 55, 60 65 L60 80 L20 80 Z" fill="rgba(255,255,255,0.2)" />
    <text x="40" y="48" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="system-ui">A</text>
  </svg>
);

// Sophia - Blog Writer (Purple/Pink theme)
export const SophiaAvatar: React.FC<AvatarProps> = ({ size = 80, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={`rounded-full ${className}`}
    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
  >
    <defs>
      <linearGradient id="sophia-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <pattern id="sophia-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="transparent" />
        <path d="M0 6 L6 0 L12 6 L6 12 Z" fill="rgba(255,255,255,0.08)" />
      </pattern>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#sophia-gradient)" />
    <circle cx="40" cy="40" r="40" fill="url(#sophia-pattern)" />
    <circle cx="40" cy="32" r="12" fill="rgba(255,255,255,0.2)" />
    <path d="M20 65 C20 55, 28 50, 40 50 C52 50, 60 55, 60 65 L60 80 L20 80 Z" fill="rgba(255,255,255,0.2)" />
    <text x="40" y="48" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="system-ui">S</text>
  </svg>
);

// Maya - Marketer (Orange/Red theme)
export const MayaAvatar: React.FC<AvatarProps> = ({ size = 80, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={`rounded-full ${className}`}
    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
  >
    <defs>
      <linearGradient id="maya-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <pattern id="maya-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="transparent" />
        <polygon points="10,2 18,8 18,12 10,18 2,12 2,8" fill="rgba(255,255,255,0.06)" />
      </pattern>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#maya-gradient)" />
    <circle cx="40" cy="40" r="40" fill="url(#maya-pattern)" />
    <circle cx="40" cy="32" r="12" fill="rgba(255,255,255,0.2)" />
    <path d="M20 65 C20 55, 28 50, 40 50 C52 50, 60 55, 60 65 L60 80 L20 80 Z" fill="rgba(255,255,255,0.2)" />
    <text x="40" y="48" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="system-ui">M</text>
  </svg>
);

// Quinn - QA Engineer (Green/Emerald theme)
export const QuinnAvatar: React.FC<AvatarProps> = ({ size = 80, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={`rounded-full ${className}`}
    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
  >
    <defs>
      <linearGradient id="quinn-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <pattern id="quinn-pattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="transparent" />
        <rect x="2" y="2" width="4" height="4" fill="rgba(255,255,255,0.08)" />
        <rect x="8" y="8" width="4" height="4" fill="rgba(255,255,255,0.08)" />
      </pattern>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#quinn-gradient)" />
    <circle cx="40" cy="40" r="40" fill="url(#quinn-pattern)" />
    <circle cx="40" cy="32" r="12" fill="rgba(255,255,255,0.2)" />
    <path d="M20 65 C20 55, 28 50, 40 50 C52 50, 60 55, 60 65 L60 80 L20 80 Z" fill="rgba(255,255,255,0.2)" />
    <text x="40" y="48" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="system-ui">Q</text>
  </svg>
);

// Jordan - Sales Rep (Indigo/Blue theme)
export const JordanAvatar: React.FC<AvatarProps> = ({ size = 80, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={`rounded-full ${className}`}
    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
  >
    <defs>
      <linearGradient id="jordan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#4338ca" />
      </linearGradient>
      <pattern id="jordan-pattern" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
        <rect width="18" height="18" fill="transparent" />
        <circle cx="3" cy="3" r="1.5" fill="rgba(255,255,255,0.06)" />
        <circle cx="15" cy="15" r="1.5" fill="rgba(255,255,255,0.06)" />
        <circle cx="9" cy="9" r="2" fill="rgba(255,255,255,0.04)" />
      </pattern>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#jordan-gradient)" />
    <circle cx="40" cy="40" r="40" fill="url(#jordan-pattern)" />
    <circle cx="40" cy="32" r="12" fill="rgba(255,255,255,0.2)" />
    <path d="M20 65 C20 55, 28 50, 40 50 C52 50, 60 55, 60 65 L60 80 L20 80 Z" fill="rgba(255,255,255,0.2)" />
    <text x="40" y="48" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="system-ui">J</text>
  </svg>
);

// Riley - Executive Assistant (Violet/Purple theme)
export const RileyAvatar: React.FC<AvatarProps> = ({ size = 80, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={`rounded-full ${className}`}
    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
  >
    <defs>
      <linearGradient id="riley-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <pattern id="riley-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="transparent" />
        <path d="M8 2 L14 8 L8 14 L2 8 Z" fill="rgba(255,255,255,0.05)" />
        <circle cx="8" cy="8" r="2" fill="rgba(255,255,255,0.08)" />
      </pattern>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#riley-gradient)" />
    <circle cx="40" cy="40" r="40" fill="url(#riley-pattern)" />
    <circle cx="40" cy="32" r="12" fill="rgba(255,255,255,0.2)" />
    <path d="M20 65 C20 55, 28 50, 40 50 C52 50, 60 55, 60 65 L60 80 L20 80 Z" fill="rgba(255,255,255,0.2)" />
    <text x="40" y="48" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="system-ui">R</text>
  </svg>
);

// Avatar collection component for easy access
export const AgentAvatars = {
  Alex: AlexAvatar,
  Sophia: SophiaAvatar,
  Maya: MayaAvatar,
  Quinn: QuinnAvatar,
  Jordan: JordanAvatar,
  Riley: RileyAvatar,
};

// Helper function to get avatar by name
export const getAgentAvatar = (name: string) => {
  const normalizedName = name.toLowerCase();
  switch (normalizedName) {
    case 'alex':
      return AlexAvatar;
    case 'sophia':
      return SophiaAvatar;
    case 'maya':
      return MayaAvatar;
    case 'quinn':
      return QuinnAvatar;
    case 'jordan':
      return JordanAvatar;
    case 'riley':
      return RileyAvatar;
    default:
      return AlexAvatar; // Default fallback
  }
};

// Example usage component
export const AvatarShowcase: React.FC = () => (
  <div className="flex flex-wrap gap-4 p-4">
    <div className="text-center">
      <AlexAvatar size={80} />
      <p className="mt-2 text-sm">Alex</p>
    </div>
    <div className="text-center">
      <SophiaAvatar size={80} />
      <p className="mt-2 text-sm">Sophia</p>
    </div>
    <div className="text-center">
      <MayaAvatar size={80} />
      <p className="mt-2 text-sm">Maya</p>
    </div>
    <div className="text-center">
      <QuinnAvatar size={80} />
      <p className="mt-2 text-sm">Quinn</p>
    </div>
    <div className="text-center">
      <JordanAvatar size={80} />
      <p className="mt-2 text-sm">Jordan</p>
    </div>
    <div className="text-center">
      <RileyAvatar size={80} />
      <p className="mt-2 text-sm">Riley</p>
    </div>
  </div>
);