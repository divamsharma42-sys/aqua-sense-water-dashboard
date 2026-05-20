"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function DashboardCard({
  title,
  subtitle,
  children,
  className = "",
  action,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-xl ${className}`}
    >
      {/* Glassmorphism gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      {(title || action) && (
        <div className="relative flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}

      {/* Content */}
      <div className="relative p-5">{children}</div>
    </motion.div>
  );
}
