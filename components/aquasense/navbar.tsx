"use client";

import { motion } from "framer-motion";
import { Bell, Search, Moon, Sun, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { StatusBadge } from "./status-badge";

interface NavbarProps {
  title: string;
  subtitle?: string;
}

export function Navbar({ title, subtitle }: NavbarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? (theme === "dark" || resolvedTheme === "dark") : true;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/60 border-b border-slate-700/50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-white"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <p className="text-sm text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-40"
            />
          </div>

          {/* Live Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <StatusBadge status="online" />
            <span className="text-xs font-medium text-emerald-400">Live</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Profile */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
            AS
          </div>
        </div>
      </div>
    </header>
  );
}
