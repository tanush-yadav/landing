import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-fraunces)',
  				'var(--font-plus-jakarta-sans)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
  			heading: [
  				'var(--font-plus-jakarta-sans)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			xs: [
  				'0.65rem',
  				{
  					lineHeight: '0.9rem'
  				}
  			],
  			sm: [
  				'0.75rem',
  				{
  					lineHeight: '1.15rem'
  				}
  			],
  			base: [
  				'0.875rem',
  				{
  					lineHeight: '1.4rem'
  				}
  			],
  			lg: [
  				'1rem',
  				{
  					lineHeight: '1.6rem'
  				}
  			],
  			xl: [
  				'1.125rem',
  				{
  					lineHeight: '1.65rem'
  				}
  			],
  			'2xl': [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'3xl': [
  				'1.5rem',
  				{
  					lineHeight: '1.9rem'
  				}
  			],
  			'4xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.1rem'
  				}
  			],
  			'5xl': [
  				'2.25rem',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'6xl': [
  				'2.75rem',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'7xl': [
  				'3.25rem',
  				{
  					lineHeight: '1.05'
  				}
  			],
  			'display-sm': [
  				'clamp(1.5rem, 3.5vw, 2.25rem)',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'display-md': [
  				'clamp(1.875rem, 4vw, 2.75rem)',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'display-lg': [
  				'clamp(2.25rem, 5vw, 3.5rem)',
  				{
  					lineHeight: '1'
  				}
  			]
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out forwards',
  			'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
  			'fade-in-down': 'fadeInDown 0.4s ease-out forwards',
  			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			shimmer: 'shimmer 2s linear infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeInDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '.5'
  				}
  			},
  			shimmer: {
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			}
  		},
  		colors: {
  			primary: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#3b82f6',
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#1e3a8a',
  				'950': '#172554',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			emerald: {
  				'50': '#ecfdf5',
  				'100': '#d1fae5',
  				'200': '#a7f3d0',
  				'300': '#6ee7b7',
  				'400': '#34d399',
  				'500': '#10b981',
  				'600': '#059669',
  				'700': '#047857',
  				'800': '#065f46',
  				'900': '#064e3b'
  			},
  			linear: {
  				bg: {
  					primary: '#1C1D1F',
  					secondary: '#2A2B2F',
  					tertiary: '#363739',
  					hover: '#3A3B3F',
  					active: '#404145'
  				},
  				border: {
  					subtle: '#363739',
  					default: '#464749',
  					strong: '#5A5B5F'
  				},
  				text: {
  					primary: '#FFFFFF',
  					secondary: '#9CA3AF',
  					tertiary: '#6B7280',
  					quaternary: '#4B5563'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-mesh': 'linear-gradient(to right bottom, #667eea 0%, #764ba2 25%, #f093fb 50%, #c471f5 75%, #667eea 100%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config