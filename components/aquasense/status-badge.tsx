"use client";

import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: "online" | "offline" | "warning" | "error";
  label?: string;
  pulse?: boolean;
}

export function StatusBadge({ status, label, pulse = true }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "online":
        return {
          bg: "bg-emerald-500",
          text: "text-emerald-400",
          glow: "shadow-emerald-500/50",
        };
      case "offline":
        return {
          bg: "bg-slate-500",
          text: "text-slate-400",
          glow: "shadow-slate-500/50",
        };
      case "warning":
        return {
          bg: "bg-amber-500",
          text: "text-amber-400",
          glow: "shadow-amber-500/50",
        };
      case "error":
        return {
          bg: "bg-red-500",
          text: "text-red-400",
          glow: "shadow-red-500/50",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`w-2.5 h-2.5 rounded-full ${styles.bg} shadow-lg ${styles.glow}`} />
        {pulse && status === "online" && (
          <motion.div
            className={`absolute inset-0 rounded-full ${styles.bg}`}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      {label && (
        <span className={`text-xs font-medium ${styles.text} capitalize`}>
          {label || status}
        </span>
      )}
    </div>
  );
}
