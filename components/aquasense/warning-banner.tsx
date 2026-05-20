"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Droplets, ShieldAlert, Waves } from "lucide-react";

interface WarningBannerProps {
  type: "leakage" | "overflow" | "quality" | "lowLevel";
  visible: boolean;
}

export function WarningBanner({ type, visible }: WarningBannerProps) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  if (!show) return null;

  const getBannerConfig = () => {
    switch (type) {
      case "leakage":
        return {
          icon: AlertTriangle,
          title: "Possible Leakage Detected",
          message: "Abnormal water flow detected in the system",
          gradient: "from-red-500/20 to-orange-500/20",
          border: "border-red-500/50",
          iconColor: "text-red-400",
        };
      case "overflow":
        return {
          icon: Waves,
          title: "Overflow Risk Alert",
          message: "Tank approaching maximum capacity",
          gradient: "from-amber-500/20 to-yellow-500/20",
          border: "border-amber-500/50",
          iconColor: "text-amber-400",
        };
      case "quality":
        return {
          icon: ShieldAlert,
          title: "Water Quality Warning",
          message: "TDS or turbidity levels exceed safe thresholds",
          gradient: "from-purple-500/20 to-pink-500/20",
          border: "border-purple-500/50",
          iconColor: "text-purple-400",
        };
      case "lowLevel":
        return {
          icon: Droplets,
          title: "Low Water Level",
          message: "Water level is critically low",
          gradient: "from-cyan-500/20 to-blue-500/20",
          border: "border-cyan-500/50",
          iconColor: "text-cyan-400",
        };
    }
  };

  const config = getBannerConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`relative overflow-hidden rounded-xl border ${config.border} bg-gradient-to-r ${config.gradient} backdrop-blur-sm p-4 mb-4`}
    >
      {/* Animated background pulse */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative flex items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className={`p-2 rounded-lg bg-slate-900/50 ${config.iconColor}`}
        >
          <Icon className="w-6 h-6" />
        </motion.div>

        <div className="flex-1">
          <h4 className="font-semibold text-white">{config.title}</h4>
          <p className="text-sm text-slate-300">{config.message}</p>
        </div>

        <button
          onClick={() => setShow(false)}
          className="px-3 py-1.5 rounded-lg bg-slate-900/50 text-slate-300 text-sm hover:bg-slate-900/70 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </motion.div>
  );
}
