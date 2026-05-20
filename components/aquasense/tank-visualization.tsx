"use client";

import { motion } from "framer-motion";

interface TankVisualizationProps {
  level: number;
  status: "Full" | "Medium" | "Low" | "Critical";
}

export function TankVisualization({ level, status }: TankVisualizationProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Full":
        return "from-emerald-400 to-teal-500";
      case "Medium":
        return "from-blue-400 to-cyan-500";
      case "Low":
        return "from-yellow-400 to-amber-500";
      case "Critical":
        return "from-red-400 to-rose-500";
      default:
        return "from-blue-400 to-cyan-500";
    }
  };

  const getGlowColor = () => {
    switch (status) {
      case "Full":
        return "rgba(16, 185, 129, 0.3)";
      case "Medium":
        return "rgba(59, 130, 246, 0.3)";
      case "Low":
        return "rgba(245, 158, 11, 0.3)";
      case "Critical":
        return "rgba(239, 68, 68, 0.3)";
      default:
        return "rgba(59, 130, 246, 0.3)";
    }
  };

  return (
    <div className="relative w-full max-w-[200px] mx-auto">
      {/* Tank Container */}
      <div
        className="relative h-64 w-full rounded-2xl border-4 border-slate-600/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden"
        style={{ boxShadow: `0 0 40px ${getGlowColor()}` }}
      >
        {/* Water Level */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getStatusColor()} opacity-80`}
          initial={{ height: 0 }}
          animate={{ height: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Wave Animation */}
          <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
            <motion.div
              className="absolute w-[200%] h-full"
              animate={{ x: [0, "-50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  fill="rgba(255,255,255,0.1)"
                />
              </svg>
            </motion.div>
          </div>

          {/* Bubbles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/30"
              style={{ left: `${20 + i * 15}%` }}
              animate={{
                y: [0, -level * 2],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Level Markers */}
        <div className="absolute right-2 top-2 bottom-2 w-px bg-slate-600/50">
          {[100, 75, 50, 25, 0].map((mark) => (
            <div
              key={mark}
              className="absolute right-0 flex items-center"
              style={{ bottom: `${mark}%`, transform: "translateY(50%)" }}
            >
              <span className="text-[10px] text-slate-400 mr-1">{mark}%</span>
              <div className="w-2 h-px bg-slate-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Level Display */}
      <div className="text-center mt-4">
        <motion.div
          key={level}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-bold text-white"
        >
          {level}%
        </motion.div>
        <div
          className={`text-sm font-medium mt-1 ${
            status === "Critical"
              ? "text-red-400"
              : status === "Low"
              ? "text-amber-400"
              : status === "Medium"
              ? "text-blue-400"
              : "text-emerald-400"
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
