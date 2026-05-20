"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Clock,
  Cpu,
} from "lucide-react";
import type { Alert } from "@/lib/mock-data";

interface AlertCardProps {
  alert: Alert;
  index: number;
}

export function AlertCard({ alert, index }: AlertCardProps) {
  const getAlertStyles = () => {
    switch (alert.type) {
      case "danger":
        return {
          border: "border-red-500/30",
          bg: "bg-red-500/10",
          icon: AlertCircle,
          iconColor: "text-red-400",
          badge: "bg-red-500/20 text-red-400",
        };
      case "warning":
        return {
          border: "border-amber-500/30",
          bg: "bg-amber-500/10",
          icon: AlertTriangle,
          iconColor: "text-amber-400",
          badge: "bg-amber-500/20 text-amber-400",
        };
      case "info":
        return {
          border: "border-blue-500/30",
          bg: "bg-blue-500/10",
          icon: Info,
          iconColor: "text-blue-400",
          badge: "bg-blue-500/20 text-blue-400",
        };
      case "success":
        return {
          border: "border-emerald-500/30",
          bg: "bg-emerald-500/10",
          icon: CheckCircle2,
          iconColor: "text-emerald-400",
          badge: "bg-emerald-500/20 text-emerald-400",
        };
    }
  };

  const getSeverityBadge = () => {
    switch (alert.severity) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-slate-900";
      case "low":
        return "bg-slate-500 text-white";
    }
  };

  const styles = getAlertStyles();
  const Icon = styles.icon;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      className={`relative overflow-hidden rounded-xl border ${styles.border} ${styles.bg} backdrop-blur-sm p-4`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`p-2 rounded-lg ${styles.badge}`}>
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-white truncate">{alert.title}</h4>
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getSeverityBadge()}`}
            >
              {alert.severity}
            </span>
          </div>

          <p className="text-sm text-slate-400 mb-3">{alert.message}</p>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              {alert.sensor}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimestamp(alert.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
