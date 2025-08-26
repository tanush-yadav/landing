'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Zap, Target, TrendingUp, Award, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Achievement, LeaderboardEntry } from '@/lib/demo-workflows'

interface GamificationUIProps {
  points: number
  xp: number
  maxXp: number
  streak: number
  achievements: Achievement[]
  timeSaved: string
  showAchievement?: Achievement | null
  leaderboard?: LeaderboardEntry[]
}

export function GamificationUI({
  points,
  xp,
  maxXp,
  streak,
  achievements,
  timeSaved,
  showAchievement,
  leaderboard,
}: GamificationUIProps) {
  const xpPercentage = (xp / maxXp) * 100

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="bg-linear-bg-secondary border border-linear-border-subtle rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-6">
            {/* Points */}
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-xs text-linear-text-secondary">Points</p>
                <p className="text-lg font-bold text-linear-text-primary">
                  {points.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs text-linear-text-secondary">Streak</p>
                <p className="text-lg font-bold text-linear-text-primary">
                  {streak}x
                </p>
              </div>
            </div>

            {/* Time Saved */}
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-linear-text-secondary">Time Saved</p>
                <p className="text-lg font-bold text-linear-text-primary">
                  {timeSaved}
                </p>
              </div>
            </div>
          </div>

          {/* Achievements Count */}
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-linear-text-secondary">
              {achievements.length} achievements
            </span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-linear-text-secondary">Level Progress</span>
            <span className="text-linear-text-tertiary">
              {xp}/{maxXp} XP
            </span>
          </div>
          <div className="h-2 bg-linear-bg-tertiary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-20 right-8 z-50"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{showAchievement.icon}</div>
                <div>
                  <p className="text-white font-bold">Achievement Unlocked!</p>
                  <p className="text-white/90 text-sm">{showAchievement.name}</p>
                  <p className="text-white/70 text-xs">{showAchievement.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface PointsAnimationProps {
  points: number
  x?: number
  y?: number
}

export function PointsAnimation({ points, x = 0, y = 0 }: PointsAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -30 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute pointer-events-none font-bold text-green-500"
      style={{ left: x, top: y }}
    >
      +{points}
    </motion.div>
  )
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentEmployee?: string
  compact?: boolean
}

export function Leaderboard({ entries, currentEmployee, compact = false }: LeaderboardProps) {
  return (
    <div className={cn(
      "bg-linear-bg-secondary border border-linear-border-subtle rounded-lg",
      compact ? "p-3" : "p-4"
    )}>
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-linear-text-secondary" />
        <h3 className="text-sm font-semibold text-linear-text-primary">
          AI Employee Leaderboard
        </h3>
      </div>

      <div className="space-y-2">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.employee}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex items-center justify-between p-2 rounded-lg transition-colors",
              currentEmployee === entry.employee 
                ? "bg-purple-500/10 border border-purple-500/20"
                : "bg-linear-bg-tertiary/50 hover:bg-linear-bg-tertiary"
            )}
          >
            <div className="flex items-center gap-3">
              {/* Rank */}
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                index === 0 && "bg-yellow-500 text-white",
                index === 1 && "bg-gray-400 text-white",
                index === 2 && "bg-orange-600 text-white",
                index > 2 && "bg-linear-bg-tertiary text-linear-text-secondary"
              )}>
                {index + 1}
              </div>

              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm",
                entry.employee === 'Zoe' && "bg-gradient-to-br from-purple-500 to-pink-500",
                entry.employee === 'Bella' && "bg-gradient-to-br from-blue-500 to-cyan-500",
                entry.employee === 'Alex' && "bg-gradient-to-br from-green-500 to-emerald-500",
                entry.employee === 'Morgan' && "bg-gradient-to-br from-orange-500 to-red-500"
              )}>
                {entry.avatar}
              </div>

              {/* Name and Achievement */}
              <div>
                <p className="text-sm font-medium text-linear-text-primary">
                  {entry.employee}
                </p>
                {!compact && (
                  <p className="text-xs text-linear-text-secondary">
                    {entry.topAchievement.icon} {entry.topAchievement.name}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <p className="text-sm font-bold text-linear-text-primary">
                {entry.points.toLocaleString()} pts
              </p>
              {!compact && (
                <p className="text-xs text-linear-text-secondary">
                  {entry.tasksToday} tasks • {entry.streak} streak
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

interface AchievementBadgeProps {
  achievement: Achievement
  unlocked?: boolean
  compact?: boolean
}

export function AchievementBadge({ achievement, unlocked = true, compact = false }: AchievementBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative rounded-lg border p-2 transition-all cursor-pointer",
        unlocked
          ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20"
          : "bg-linear-bg-tertiary border-linear-border-subtle opacity-50"
      )}
    >
      <div className={cn(
        "flex items-center",
        compact ? "gap-2" : "gap-3"
      )}>
        <div className={cn(
          "text-2xl",
          !unlocked && "grayscale"
        )}>
          {achievement.icon}
        </div>
        {!compact && (
          <div>
            <p className="text-sm font-medium text-linear-text-primary">
              {achievement.name}
            </p>
            <p className="text-xs text-linear-text-secondary">
              {achievement.description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface StreakIndicatorProps {
  streak: number
  maxStreak?: number
}

export function StreakIndicator({ streak, maxStreak = 10 }: StreakIndicatorProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: Math.min(streak, maxStreak) }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05, type: "spring" }}
          className={cn(
            "w-2 h-2 rounded-full",
            i < streak ? "bg-orange-500" : "bg-linear-bg-tertiary"
          )}
        />
      ))}
      {streak > maxStreak && (
        <span className="text-xs text-orange-500 font-bold ml-1">
          +{streak - maxStreak}
        </span>
      )}
    </div>
  )
}

export default {
  GamificationUI,
  PointsAnimation,
  Leaderboard,
  AchievementBadge,
  StreakIndicator,
}