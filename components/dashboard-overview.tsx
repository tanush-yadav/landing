import {
  IconArrowUpRight,
  IconBolt,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCheck,
  IconClockHour3,
  IconEye,
  IconShoppingBag,
  IconTrendingUp,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const metricCards = [
  {
    id: "reach",
    label: "Reach today",
    value: "2.4M",
    change: "+12%",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
    icon: IconEye,
  },
  {
    id: "clicks",
    label: "Clicks to site",
    value: "47.2K",
    change: "+8%",
    accent: "bg-purple-50 text-purple-600 border-purple-100",
    icon: IconTrendingUp,
  },
  {
    id: "orders",
    label: "Orders from creators",
    value: "1,847",
    change: "+23%",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
    icon: IconShoppingBag,
  },
]

const creatorPerformance = [
  {
    name: "Sarah Beauty",
    avatar: "S",
    avatarColor: "bg-blue-500",
    post: "Spring makeup tutorial",
    reach: "185.0K",
    clicks: "4.2K",
    orders: "67",
    revenue: "$2,380",
    roi: "285%",
  },
  {
    name: "Tech Tom",
    avatar: "T",
    avatarColor: "bg-purple-500",
    post: "iPhone 15 review",
    reach: "92.0K",
    clicks: "2.1K",
    orders: "34",
    revenue: "$1,650",
    roi: "420%",
  },
  {
    name: "Fashion Bella",
    avatar: "F",
    avatarColor: "bg-indigo-500",
    post: "Summer wardrobe haul",
    reach: "156.0K",
    clicks: "3.8K",
    orders: "89",
    revenue: "$3,200",
    roi: "380%",
  },
  {
    name: "Fitness Mike",
    avatar: "F",
    avatarColor: "bg-cyan-500",
    post: "Home workout essentials",
    reach: "78.0K",
    clicks: "1.9K",
    orders: "45",
    revenue: "$1,890",
    roi: "340%",
  },
  {
    name: "Travel Emma",
    avatar: "T",
    avatarColor: "bg-teal-500",
    post: "Travel gear must-haves",
    reach: "125.0K",
    clicks: "2.9K",
    orders: "52",
    revenue: "$2,150",
    roi: "295%",
  },
]

const recentPosts = [
  {
    title: "Spring Fashion Trends",
    time: "2 hours ago",
    status: "Live",
    icon: IconBrandInstagram,
    accent: "bg-pink-50 text-pink-600 border-pink-100",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    title: "Tech Review Series",
    time: "5 hours ago",
    status: "Live",
    icon: IconBrandYoutube,
    accent: "bg-red-50 text-red-600 border-red-100",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    title: "Workout Equipment Guide",
    time: "8 hours ago",
    status: "Completed",
    icon: IconBrandTiktok,
    accent: "bg-slate-50 text-slate-600 border-slate-100",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    title: "Beauty Routine Update",
    time: "Tomorrow",
    status: "Pending",
    icon: IconBrandInstagram,
    accent: "bg-purple-50 text-purple-600 border-purple-100",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
]

const topConverters = [
  { name: "Tech Tom", value: "+4.2%", avatar: "T", color: "bg-purple-500" },
  { name: "Fashion Bella", value: "+3.8%", avatar: "F", color: "bg-indigo-500" },
  { name: "Fitness Mike", value: "+3.4%", avatar: "F", color: "bg-cyan-500" },
]

const microInfluencers = [
  { name: "Luna Lifestyle", detail: "Lifestyle • 235.0K reach", change: "+185%" },
  { name: "Chef Carlos", detail: "Food • 168.0K reach", change: "+142%" },
  { name: "Art Alice", detail: "Art • 121.0K reach", change: "+128%" },
]

export function DashboardOverview() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metricCards.map((card) => (
            <Card key={card.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-bold text-foreground font-display">{card.value}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                        <IconArrowUpRight className="h-3 w-3" />
                        {card.change}
                      </span>
                    </div>
                  </div>
                  <div className={`rounded-lg border p-3 ${card.accent}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold font-display">Creator Performance</CardTitle>
                    <p className="text-sm text-muted-foreground">Campaign metrics for your top partners this week</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    Updated today
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Creator
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Post Link
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Reach
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Clicks
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ROI
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {creatorPerformance.map((creator) => (
                        <tr key={creator.name} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className={`text-xs font-semibold text-white ${creator.avatarColor}`}>
                                  {creator.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-foreground">{creator.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                              href="#"
                            >
                              {creator.post}
                              <IconArrowUpRight className="h-3 w-3" />
                            </a>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium text-foreground tabular-nums">
                            {creator.reach}
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium text-foreground tabular-nums">
                            {creator.clicks}
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium text-foreground tabular-nums">
                            {creator.orders}
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium text-foreground tabular-nums">
                            {creator.revenue}
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-semibold text-emerald-600 tabular-nums">
                            {creator.roi}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold font-display">Top converting creators this week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topConverters.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={`text-xs font-semibold text-white ${item.color}`}>
                            {item.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-emerald-600">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold font-display">Rising micro influencers in your niche</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {microInfluencers.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.detail}</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">{item.change}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold font-display">Recent posts</CardTitle>
                  <p className="text-sm text-muted-foreground">Track live status across each channel</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.title} className="flex items-start gap-3">
                    <div className={`rounded-lg border p-2 ${post.accent}`}>
                      <post.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-foreground leading-none">{post.title}</p>
                      <p className="text-sm text-muted-foreground">{post.time}</p>
                    </div>
                    <Badge variant="outline" className={`border ${post.badgeClass}`}>
                      <div className="flex items-center gap-1">
                        {post.status === "Live" && <IconBolt className="h-3 w-3" />}
                        {post.status === "Completed" && <IconCheck className="h-3 w-3" />}
                        {post.status === "Pending" && <IconClockHour3 className="h-3 w-3" />}
                        <span className="text-xs font-medium">{post.status}</span>
                      </div>
                    </Badge>
                  </div>
                ))}

                <Separator className="my-4" />

                <Button className="w-full" variant="default">
                  <span>View all posts</span>
                  <IconArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
