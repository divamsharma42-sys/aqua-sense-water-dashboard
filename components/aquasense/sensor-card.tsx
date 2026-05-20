"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Gauge,
  Activity,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: "droplets" | "gauge" | "activity" | "thermometer";
  status: "normal" | "warning" | "danger";
  trend?: "up" | "down" | "stable";
  description?: string;
}

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  gauge: Gauge,
  activity: Activity,
  thermometer: Thermometer,
};

export function SensorCard({
  title,
  value,
  unit,
  icon,
  status,
  trend,
  description,
}: SensorCardProps) {
  const Icon = iconMap[icon];

  const getStatusStyles = () => {
    switch (status) {
      case "normal":
        return {
          border: "border-emerald-500/30",
          glow: "shadow-emerald-500/10",
          icon: "text-emerald-400",
          badge: "bg-emerald-500/20 text-emerald-400",
        };
      case "warning":
        return {
          border: "border-amber-500/30",
          glow: "shadow-amber-500/10",
          icon: "text-amber-400",
          badge: "bg-amber-500/20 text-amber-400",
        };
      case "danger":
        return {
          border: "border-red-500/30",
          glow: "shadow-red-500/10",
          icon: "text-red-400",
          badge: "bg-red-500/20 text-red-400",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative overflow-hidden rounded-2xl border ${styles.border} bg-slate-800/50 backdrop-blur-xl p-5 shadow-xl ${styles.glow}`}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl ${styles.badge}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1">
            {status === "normal" ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className={`w-4 h-4 ${styles.icon}`} />
            )}
          </div>
        </div>

        {/* Value */}
        <div className="mb-2">
          <motion.div
            key={value}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-baseline gap-1"
          >
            <span className="text-3xl font-bold text-white">{value}</span>
            <span className="text-sm text-slate-400">{unit}</span>
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>

        {/* Description & Trend */}
        {(description || trend) && (
          <div className="mt-3 flex items-center justify-between text-xs">
            {description && <span className="text-slate-500">{description}</span>}
            {trend && (
              <span
                className={`flex items-center gap-1 ${
                  trend === "up"
                    ? "text-emerald-400"
                    : trend === "down"
                    ? "text-red-400"
                    : "text-slate-400"
                }`}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
                {trend === "stable" ? "Stable" : trend === "up" ? "Rising" : "Falling"}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
