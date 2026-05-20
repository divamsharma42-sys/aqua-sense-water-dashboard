"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Bell,
  Info,
  Droplets,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "./status-badge";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/about", label: "About", icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="fixed left-0 top-0 h-screen bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 border-b border-slate-700/50">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 blur-lg opacity-30"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-lg font-bold text-white">AquaSense</h1>
              <p className="text-[10px] text-slate-400">Smart Water Management</p>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
                />
              )}
              <item.icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : ""}`} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {item.href === "/alerts" && !collapsed && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">System Status</span>
            <StatusBadge status="online" />
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>ESP32 Connection</span>
              <span className="text-emerald-400">Active</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Last Update</span>
              <span className="text-white">2s ago</span>
            </div>
          </div>
        </div>
      )}

      {/* Settings & Collapse */}
      <div className="p-3 border-t border-slate-700/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
