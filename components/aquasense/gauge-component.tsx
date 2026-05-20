"use client";

import { motion } from "framer-motion";

interface GaugeComponentProps {
  value: number;
  maxValue: number;
  label: string;
  unit: string;
  status: "Safe" | "Moderate" | "Unsafe";
  size?: "sm" | "md" | "lg";
}

export function GaugeComponent({
  value,
  maxValue,
  label,
  unit,
  status,
  size = "md",
}: GaugeComponentProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;

  const getStatusColor = () => {
    switch (status) {
      case "Safe":
        return { stroke: "#10b981", text: "text-emerald-400", bg: "bg-emerald-500/20" };
      case "Moderate":
        return { stroke: "#f59e0b", text: "text-amber-400", bg: "bg-amber-500/20" };
      case "Unsafe":
        return { stroke: "#ef4444", text: "text-red-400", bg: "bg-red-500/20" };
      default:
        return { stroke: "#10b981", text: "text-emerald-400", bg: "bg-emerald-500/20" };
    }
  };

  const colors = getStatusColor();

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg
          className="transform -rotate-[135deg] w-full h-full"
          viewBox="0 0 100 100"
        >
          {/* Background Arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            className="text-slate-700"
          />
          {/* Value Arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={colors.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${colors.stroke}40)` }}
          />
        </svg>
        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-white"
          >
            {value}
          </motion.span>
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-sm text-slate-300 font-medium">{label}</div>
        <div className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
          {status}
        </div>
      </div>
    </div>
  );
}
