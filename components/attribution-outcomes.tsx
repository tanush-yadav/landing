'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  MousePointer,
  ShoppingCart,
  ExternalLink,
  Instagram,
  Youtube,
  Clock,
  Zap,
  ArrowUpRight,
  Star,
  Calendar,
  CheckCircle2,
  Eye,
  Users
} from 'lucide-react'
import { SiTiktok } from 'react-icons/si'
import { Card } from '@/components/ui/card'
import { cn, animations } from '@/lib/design-system'

// Types for our data
interface CreatorPerformance {
  id: string
  name: string
  avatar: string
  postLink: string
  reach: number
  clicks: number
  orders: number
  revenue: number
  roi: number
}

interface PostTimeline {
  id: string
  title: string
  platform: 'instagram' | 'tiktok' | 'youtube'
  thumbnail: string
  date: string
  status: 'live' | 'pending' | 'completed'
}

interface TopCreator {
  id: string
  name: string
  avatar: string
  conversionRate: number
}

interface RisingCreator {
  id: string
  name: string
  avatar: string
  growthRate: number
  category: string
  reach: number
}

// Sample Data
const kpiData = {
  reach: { value: '2.4M', change: '+12%' },
  clicks: { value: '47.2K', change: '+8%' },
  orders: { value: '1,847', change: '+23%' }
}

const creatorPerformanceData: CreatorPerformance[] = [
  {
    id: '1',
    name: 'Sarah Beauty',
    avatar: '/images/creators/sarah.jpg',
    postLink: 'Spring makeup tutorial',
    reach: 185000,
    clicks: 4200,
    orders: 67,
    revenue: 2380,
    roi: 285
  },
  {
    id: '2',
    name: 'Tech Tom',
    avatar: '/images/creators/tom.jpg',
    postLink: 'iPhone 15 review',
    reach: 92000,
    clicks: 2100,
    orders: 34,
    revenue: 1650,
    roi: 420
  },
  {
    id: '3',
    name: 'Fashion Bella',
    avatar: '/images/creators/bella.jpg',
    postLink: 'Summer wardrobe haul',
    reach: 156000,
    clicks: 3800,
    orders: 89,
    revenue: 3200,
    roi: 380
  },
  {
    id: '4',
    name: 'Fitness Mike',
    avatar: '/images/creators/mike.jpg',
    postLink: 'Home workout essentials',
    reach: 78000,
    clicks: 1850,
    orders: 45,
    revenue: 1890,
    roi: 340
  },
  {
    id: '5',
    name: 'Travel Emma',
    avatar: '/images/creators/emma.jpg',
    postLink: 'Travel gear must-haves',
    reach: 125000,
    clicks: 2900,
    orders: 52,
    revenue: 2150,
    roi: 295
  }
]

const postTimelineData: PostTimeline[] = [
  {
    id: '1',
    title: 'Spring Fashion Trends',
    platform: 'instagram',
    thumbnail: '/images/posts/fashion.jpg',
    date: '2 hours ago',
    status: 'live'
  },
  {
    id: '2',
    title: 'Tech Review Series',
    platform: 'youtube',
    thumbnail: '/images/posts/tech.jpg',
    date: '5 hours ago',
    status: 'live'
  },
  {
    id: '3',
    title: 'Workout Equipment Guide',
    platform: 'tiktok',
    thumbnail: '/images/posts/fitness.jpg',
    date: '8 hours ago',
    status: 'completed'
  },
  {
    id: '4',
    title: 'Beauty Routine Update',
    platform: 'instagram',
    thumbnail: '/images/posts/beauty.jpg',
    date: 'Tomorrow',
    status: 'pending'
  }
]

const topCreatorsData: TopCreator[] = [
  { id: '1', name: 'Tech Tom', avatar: '/images/creators/tom.jpg', conversionRate: 4.2 },
  { id: '2', name: 'Fashion Bella', avatar: '/images/creators/bella.jpg', conversionRate: 3.8 },
  { id: '3', name: 'Fitness Mike', avatar: '/images/creators/mike.jpg', conversionRate: 3.4 }
]

const risingCreatorsData: RisingCreator[] = [
  { id: '1', name: 'Luna Lifestyle', avatar: '/images/creators/luna.jpg', growthRate: 185, category: 'Lifestyle', reach: 235000 },
  { id: '2', name: 'Chef Carlos', avatar: '/images/creators/carlos.jpg', growthRate: 142, category: 'Food', reach: 168000 },
  { id: '3', name: 'Art Alice', avatar: '/images/creators/alice.jpg', growthRate: 128, category: 'Art', reach: 121000 }
]

// Components
const KPICard = ({
  title,
  value,
  change,
  icon: Icon
}: {
  title: string
  value: string
  change: string
  icon: React.ComponentType<{ className?: string }>
}) => (
  <Card variant="elevated" padding="md" hoverable className="text-center">
    <Card.Content>
      <div className="flex items-center justify-center mb-3">
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600 mb-2">{title}</div>
      <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-medium">
        <ArrowUpRight className="w-4 h-4" />
        {change}
      </div>
    </Card.Content>
  </Card>
)

const CreatorAvatar = ({ src, name, size = 'sm' }: { src: string; name: string; size?: 'xs' | 'sm' | 'md' }) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12'
  }

  return (
    <div className={cn('rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-medium', sizeClasses[size])}>
      {name.charAt(0)}
    </div>
  )
}

const StatusBadge = ({ status }: { status: 'live' | 'pending' | 'completed' }) => {
  const variants = {
    live: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    completed: 'bg-slate-100 text-slate-800 border-slate-200'
  }

  const icons = {
    live: <Zap className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />,
    completed: <CheckCircle2 className="w-3 h-3" />
  }

  return (
    <div className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border', variants[status])}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  )
}

const PlatformIcon = ({ platform }: { platform: 'instagram' | 'tiktok' | 'youtube' }) => {
  const icons = {
    instagram: <Instagram className="w-4 h-4 text-pink-600" />,
    tiktok: <SiTiktok className="w-4 h-4 text-black" />,
    youtube: <Youtube className="w-4 h-4 text-red-600" />
  }

  return icons[platform]
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(num)
}

export default function AttributionOutcomes() {
  // Derive insights fed by the tables on this section
  const bestRoi = creatorPerformanceData.reduce((a, b) => (b.roi > a.roi ? b : a))
  const topRevenue = creatorPerformanceData.reduce((a, b) => (b.revenue > a.revenue ? b : a))
  const withConv = creatorPerformanceData.map((c) => ({ ...c, conv: c.clicks ? (c.orders / c.clicks) * 100 : 0 }))
  const bestConv = withConv.reduce((a, b) => (b.conv > a.conv ? b : a))
  const liveByPlatform = postTimelineData
    .filter((p) => p.status === 'live')
    .reduce<Record<string, number>>((acc, p) => {
      acc[p.platform] = (acc[p.platform] || 0) + 1
      return acc
    }, {})
  const mostActivePlatform = Object.entries(liveByPlatform).sort((a, b) => b[1] - a[1])[0]?.[0]
  const fastestRiser = risingCreatorsData.reduce((a, b) => (b.growthRate > a.growthRate ? b : a))

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...animations.slideInUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 font-display">
            Now, See what each{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              creator drives
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto">
            Every link and code is auto-tagged. You see reach, clicks, trials, orders, and revenue by creator and post.
          </p>
        </motion.div>

        {/* KPI Row */}
        <motion.div
          {...animations.slideInUp}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          <KPICard
            title="Reach today"
            value={kpiData.reach.value}
            change={kpiData.reach.change}
            icon={Eye}
          />
          <KPICard
            title="Clicks to site"
            value={kpiData.clicks.value}
            change={kpiData.clicks.change}
            icon={MousePointer}
          />
          <KPICard
            title="Orders from creators"
            value={kpiData.orders.value}
            change={kpiData.orders.change}
            icon={ShoppingCart}
          />
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Creator Performance Table */}
          <motion.div
            {...animations.slideInLeft}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated" padding="none">
              <Card.Header className="p-6 pb-0">
                <Card.Title>Creator Performance</Card.Title>
              </Card.Header>
              <Card.Content className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left p-2 sm:p-4 text-xs sm:text-sm font-semibold text-slate-900">Creator</th>
                        <th className="text-left p-2 sm:p-4 text-xs sm:text-sm font-semibold text-slate-900 hidden sm:table-cell">Post link</th>
                        <th className="text-right p-2 sm:p-4 text-xs sm:text-sm font-semibold text-slate-900">Reach</th>
                        <th className="text-right p-2 sm:p-4 text-xs sm:text-sm font-semibold text-slate-900 hidden md:table-cell">Clicks</th>
                        <th className="text-right p-2 sm:p-4 text-xs sm:text-sm font-semibold text-slate-900">Orders</th>
                        <th className="text-right p-2 sm:p-4 text-xs sm:text-sm font-semibold text-slate-900 hidden lg:table-cell">Revenue</th>
                        <th className="text-right p-2 sm:p-4 text-xs sm:text-sm font-semibold text-slate-900">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creatorPerformanceData.map((creator, index) => (
                        <motion.tr
                          key={creator.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="p-2 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <CreatorAvatar src={creator.avatar} name={creator.name} size="xs" />
                              <span className="font-medium text-slate-900 text-sm sm:text-base">{creator.name}</span>
                            </div>
                          </td>
                          <td className="p-2 sm:p-4 hidden sm:table-cell">
                            <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                              <span className="text-sm">{creator.postLink}</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </td>
                          <td className="p-2 sm:p-4 text-right text-slate-900 text-sm sm:text-base">{formatNumber(creator.reach)}</td>
                          <td className="p-2 sm:p-4 text-right text-slate-900 text-sm sm:text-base hidden md:table-cell">{formatNumber(creator.clicks)}</td>
                          <td className="p-2 sm:p-4 text-right text-slate-900 text-sm sm:text-base">{creator.orders}</td>
                          <td className="p-2 sm:p-4 text-right text-slate-900 font-medium text-sm sm:text-base hidden lg:table-cell">{formatCurrency(creator.revenue)}</td>
                          <td className="p-2 sm:p-4 text-right">
                            <span className="text-green-600 font-semibold text-sm sm:text-base">{creator.roi}%</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Content>
            </Card>
          </motion.div>

          {/* Right Column - Two Cards + Mini Cards + Insights */}
          <motion.div
            {...animations.slideInRight}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Post Timeline Card */}
            <Card variant="elevated" padding="md">
              <Card.Header>
                <Card.Title className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Recent posts
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {postTimelineData.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                        <PlatformIcon platform={post.platform} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 truncate">{post.title}</div>
                        <div className="text-xs text-slate-500">{post.date}</div>
                      </div>
                      <StatusBadge status={post.status} />
                    </motion.div>
                  ))}
                </div>
              </Card.Content>
            </Card>

          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mini cards arranged in a row on md+ */}
              {/* Top Converting Creators Mini Card */}
              <Card variant="elevated" padding="md">
                <Card.Header>
                  <Card.Title className="text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Top converting creators this week
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-3">
                    {topCreatorsData.map((creator, index) => (
                      <motion.div
                        key={creator.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <CreatorAvatar src={creator.avatar} name={creator.name} size="xs" />
                          <span className="text-sm font-medium text-slate-900">{creator.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">{creator.conversionRate}%</span>
                      </motion.div>
                    ))}
                  </div>
                </Card.Content>
              </Card>

              {/* Rising Creators Mini Card */}
              <Card variant="elevated" padding="md">
                <Card.Header>
                  <Card.Title className="text-sm font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Rising micro influencers in your niche
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-3">
                    {risingCreatorsData.map((creator, index) => (
                      <motion.div
                        key={creator.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <CreatorAvatar src={creator.avatar} name={creator.name} size="xs" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">{creator.name}</div>
                            <div className="text-xs text-slate-500">{creator.category} • {formatNumber(creator.reach)} reach</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-blue-600">+{creator.growthRate}%</div>
                          <div className="text-xs text-slate-500">growth</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card.Content>
              </Card>
      </div>
      </div>
    </section>
  )
}
