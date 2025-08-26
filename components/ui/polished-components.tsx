'use client'

import React, { forwardRef, ButtonHTMLAttributes, HTMLAttributes, AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

// ============================================
// Advanced Button Components with Premium Polish
// ============================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow' | 'premium' | 'outline' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shine?: boolean
  pulse?: boolean
  magnetic?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    shine = false,
    pulse = false,
    magnetic = false,
    loading = false,
    icon,
    iconPosition = 'left',
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = cn(
      "relative inline-flex items-center justify-center font-semibold",
      "transition-all duration-300 ease-out-expo focus-ring",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
      "select-none touch-manipulation",
      magnetic && !disabled && "button-magnetic"
    )
    
    const variants = {
      primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]",
      secondary: "bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-[1.01] active:scale-[0.99] active:bg-gray-50",
      ghost: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-[1.01] active:scale-[0.99]",
      glow: "bg-gradient-to-r from-primary-400 to-primary-600 text-white shadow-glow-sm hover:shadow-glow-md animate-glow-pulse hover:scale-[1.02]",
      premium: "glass-medium text-white border-white/30 hover:glass-strong hover:scale-[1.02] shadow-soft-xl hover:shadow-soft-2xl",
      outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600 hover:scale-[1.01] active:scale-[0.99]",
      danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98]"
    }
    
    const sizes = {
      xs: "px-3 py-1.5 text-xs rounded-md gap-1",
      sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
      md: "px-6 py-3 text-base rounded-xl gap-2",
      lg: "px-8 py-4 text-lg rounded-xl gap-2",
      xl: "px-10 py-5 text-xl rounded-2xl gap-2.5",
      '2xl': "px-12 py-6 text-2xl rounded-2xl gap-3"
    }
    
    const iconSizes = {
      xs: "h-3 w-3",
      sm: "h-4 w-4", 
      md: "h-4 w-4",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
      '2xl': "h-7 w-7"
    }
    
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          shine && "button-shine",
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        
        {/* Button content */}
        <span className={cn("relative z-10 flex items-center", loading && "opacity-0")}>
          {icon && iconPosition === 'left' && (
            <span className={cn("optical-center-y", iconSizes[size], children && "mr-2")}>
              {icon}
            </span>
          )}
          
          {children && <span>{children}</span>}
          
          {icon && iconPosition === 'right' && (
            <span className={cn("optical-center-y", iconSizes[size], children && "ml-2")}>
              {icon}
            </span>
          )}
        </span>
        
        {/* Enhanced shine effect */}
        {shine && (
          <div className="absolute inset-0 overflow-hidden rounded-inherit">
            <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:top-full pointer-events-none" />
          </div>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// ============================================
// Advanced Card Components with Premium Glass Effects
// ============================================

interface CardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  variant?: 'default' | 'glass' | 'premium' | 'minimal' | 'elevated' | 'bordered'
  glow?: boolean | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean | 'lift' | 'glow' | 'float'
  depth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  interactive?: boolean
  children?: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    glow = false, 
    hover = false, 
    depth = 'md', 
    padding = 'md',
    interactive = false,
    children, 
    ...props 
  }, ref) => {
    const depths = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      '2xl': "shadow-2xl"
    }

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6", 
      lg: "p-8",
      xl: "p-10"
    }

    const glowStyles = {
      sm: "shadow-glow-xs",
      md: "shadow-glow-sm", 
      lg: "shadow-glow",
      xl: "shadow-glow-lg"
    }
    
    const variants = {
      default: "bg-white border border-gray-200",
      glass: "glass-frosted backdrop-blur-xl",
      premium: "card-premium backdrop-blur-2xl",
      minimal: "bg-white/80 backdrop-blur-sm",
      elevated: "bg-white shadow-soft-2xl border-0",
      bordered: "bg-white border-2 border-gray-100 hover:border-gray-200"
    }

    const hoverEffects = {
      lift: "hover-lift",
      glow: "hover-glow",
      float: "hover-float"
    }
    
    return (
      <motion.div
        ref={ref}
        whileHover={
          hover === true ? { y: -4, transition: { duration: 0.2, ease: "easeOut" } } : 
          hover === 'float' ? { y: -6, transition: { duration: 0.3, ease: "easeOut" } } :
          undefined
        }
        className={cn(
          "relative rounded-3xl transition-all duration-300",
          variants[variant],
          depths[depth],
          paddings[padding],
          typeof glow === 'string' ? glowStyles[glow] : glow && "shadow-glow",
          typeof hover === 'string' ? hoverEffects[hover] : hover && "hover-lift",
          interactive && "cursor-pointer select-none",
          className
        )}
        {...props}
      >
        {/* Enhanced gradient border effects */}
        {(variant === 'glass' || variant === 'premium') && (
          <>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/25 via-white/5 to-white/15 pointer-events-none" />
            <div className="absolute inset-px rounded-3xl bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
          </>
        )}
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
        
        {/* Interactive feedback */}
        {interactive && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-400/0 to-primary-600/0 hover:from-primary-400/5 hover:to-primary-600/5 transition-all duration-300 pointer-events-none" />
        )}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// ============================================
// Badge Components with Animations
// ============================================

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  animated?: boolean
  pulse?: boolean
}

export const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = 'default', 
  animated = false, 
  pulse = false,
  children, 
  ...props 
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    error: "bg-red-50 text-red-700 border-red-200",
    info: "bg-blue-50 text-blue-700 border-blue-200"
  }
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200",
        variants[variant],
        animated && "animate-scale-in",
        pulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {variant === 'success' && pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      )}
      {children}
    </span>
  )
}

// ============================================
// Link with Underline Animation
// ============================================

interface AnimatedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: boolean
  gradient?: boolean
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ 
  className, 
  underline = true,
  gradient = false,
  children, 
  ...props 
}) => {
  return (
    <a
      className={cn(
        "relative inline-flex items-center gap-1 font-medium transition-colors duration-200",
        gradient ? "text-gradient" : "text-primary-600 hover:text-primary-700",
        underline && "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

// ============================================
// Loading States
// ============================================

export const Skeleton: React.FC<HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 rounded",
        className
      )}
      {...props}
    />
  )
}

export const ShimmerCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white rounded-2xl p-6 shadow-md",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer",
        "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className
      )}
      {...props}
    >
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

// ============================================
// Trust Indicator Component
// ============================================

interface TrustIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  items: Array<{
    icon: React.ReactNode
    label: string
    color?: string
  }>
}

export const TrustIndicator: React.FC<TrustIndicatorProps> = ({ 
  className, 
  items,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 py-4",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <span className={cn("text-base", item.color)}>{item.icon}</span>
          <span>{item.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// Animated Counter Component
// ============================================

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2000,
  prefix = '',
  suffix = '',
  className 
}) => {
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => {
    const startTime = Date.now()
    const endValue = value
    
    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(easeOutQuart * endValue)
      
      setCount(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }
    
    requestAnimationFrame(updateCount)
  }, [value, duration])
  
  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// ============================================
// Gradient Text Component
// ============================================

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  animate?: boolean
}

export const GradientText: React.FC<GradientTextProps> = ({ 
  className, 
  animate = false,
  children, 
  ...props 
}) => {
  return (
    <span
      className={cn(
        "text-transparent bg-clip-text",
        animate ? "text-gradient-shine" : "bg-gradient-to-r from-primary-400 to-primary-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// ============================================
// Section Container with Optimal Spacing
// ============================================

interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  container?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full'
}

export const Section: React.FC<SectionProps> = ({ 
  className, 
  size = 'lg',
  container = true,
  maxWidth = '7xl',
  children, 
  ...props 
}) => {
  const sizes = {
    xs: "py-12 md:py-16",
    sm: "py-16 md:py-20",
    md: "py-20 md:py-24",
    lg: "py-24 md:py-32",
    xl: "py-32 md:py-40",
    '2xl': "py-40 md:py-48"
  }

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    '2xl': "max-w-2xl",
    '4xl': "max-w-4xl",
    '6xl': "max-w-6xl",
    '7xl': "max-w-7xl",
    full: "max-w-full"
  }
  
  return (
    <section
      className={cn(
        sizes[size],
        className
      )}
      {...props}
    >
      {container ? (
        <div className={cn(maxWidths[maxWidth], "mx-auto px-4 sm:px-6 lg:px-8")}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}

// ============================================
// Advanced Input Components
// ============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'glass' | 'minimal' | 'premium'
  inputSize?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  error?: boolean
  success?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'default', 
    inputSize = 'md', 
    icon, 
    iconPosition = 'left',
    error = false,
    success = false,
    ...props 
  }, ref) => {
    const variants = {
      default: "bg-white border border-gray-200 focus:border-primary-500 focus:ring-primary-500/20",
      glass: "glass-light border-white/20 focus:border-white/40 text-white placeholder:text-white/60",
      minimal: "bg-transparent border-0 border-b-2 border-gray-200 focus:border-primary-500 rounded-none",
      premium: "glass-medium border-white/30 focus:border-white/50 text-white placeholder:text-white/70"
    }

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base", 
      lg: "px-5 py-4 text-lg",
      xl: "px-6 py-5 text-xl"
    }

    return (
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl transition-all duration-200 focus:outline-none focus:ring-2",
            variants[variant],
            sizes[inputSize],
            icon && iconPosition === 'left' && "pl-10",
            icon && iconPosition === 'right' && "pr-10",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            success && "border-green-500 focus:border-green-500 focus:ring-green-500/20",
            className
          )}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// ============================================
// Progress Indicators
// ============================================

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'default' | 'gradient' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  animated?: boolean
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showValue = false,
  animated = true,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const variants = {
    default: "bg-primary-500",
    gradient: "bg-gradient-to-r from-primary-500 to-primary-600",
    glow: "bg-gradient-to-r from-primary-400 to-primary-600 shadow-glow-sm"
  }

  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  }

  return (
    <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "transition-all duration-500 ease-out rounded-full",
          variants[variant],
          sizes[size],
          animated && "transition-all duration-1000 ease-out"
        )}
        style={{ width: `${percentage}%` }}
      />
      {showValue && (
        <div className="text-sm text-gray-600 mt-2 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}

// ============================================
// Status Indicators
// ============================================

interface StatusProps extends HTMLAttributes<HTMLDivElement> {
  status: 'online' | 'offline' | 'busy' | 'away' | 'loading'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showLabel?: boolean
  animated?: boolean
}

export const Status: React.FC<StatusProps> = ({
  status,
  size = 'md',
  showLabel = false,
  animated = true,
  className,
  ...props
}) => {
  const statusConfig = {
    online: { color: 'bg-green-500', label: 'Online' },
    offline: { color: 'bg-gray-400', label: 'Offline' },
    busy: { color: 'bg-red-500', label: 'Busy' },
    away: { color: 'bg-yellow-500', label: 'Away' },
    loading: { color: 'bg-blue-500', label: 'Loading' }
  }

  const sizes = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3', 
    lg: 'h-4 w-4',
    xl: 'h-5 w-5'
  }

  const config = statusConfig[status]

  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <div className="relative">
        <div
          className={cn(
            "rounded-full",
            config.color,
            sizes[size],
            animated && status === 'online' && "animate-pulse",
            animated && status === 'loading' && "animate-spin"
          )}
        />
        {animated && status === 'online' && (
          <div className={cn(
            "absolute inset-0 rounded-full animate-ping",
            config.color,
            "opacity-75"
          )} />
        )}
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600">{config.label}</span>
      )}
    </div>
  )
}

// ============================================
// Avatar Components
// ============================================

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'circular' | 'rounded' | 'square'
  status?: 'online' | 'offline' | 'busy' | 'away'
  border?: boolean
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  variant = 'circular',
  status,
  border = false,
  className,
  ...props
}) => {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg', 
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl'
  }

  const variants = {
    circular: 'rounded-full',
    rounded: 'rounded-xl',
    square: 'rounded-lg'
  }

  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
    '2xl': 'h-4 w-4'
  }

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 font-semibold overflow-hidden",
          sizes[size],
          variants[variant],
          border && "ring-2 ring-white shadow-md"
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      
      {status && (
        <div className="absolute -bottom-0.5 -right-0.5">
          <Status status={status} size="sm" animated />
        </div>
      )}
    </div>
  )
}

// ============================================
// Tooltip Component
// ============================================

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'default' | 'dark' | 'light'
  delay?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  variant = 'dark',
  delay = 200
}) => {
  const [visible, setVisible] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setVisible(false)
  }

  const variants = {
    default: 'glass-medium text-white border-white/20',
    dark: 'bg-gray-900 text-white border border-gray-700',
    light: 'bg-white text-gray-900 border border-gray-200 shadow-lg'
  }

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-2 text-sm rounded-lg backdrop-blur-sm pointer-events-none",
            "animate-fade-in-up origin-bottom",
            variants[variant],
            positions[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}