"use client";

import { motion } from "framer-motion";
import { Activity, Bell, Droplet, ShieldCheck, Zap } from "lucide-react";
import DashboardPreview from "@/components/aquasense/dashboard-preview";

const heroMetrics = [
  { label: "Sensors Monitored", value: "500+", icon: Droplet },
  { label: "Live Tracking", value: "24/7", icon: Activity },
  { label: "Alert Coverage", value: "Real-Time", icon: Bell },
];

export default function AuthHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative hidden w-full flex-col gap-8 lg:flex"
    >
      <div className="glass-panel relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-slate-950/60 p-8 shadow-[0_40px_120px_-60px_rgba(6,182,212,0.45)] backdrop-blur-3xl">
        <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-cyan-400/10 via-transparent to-cyan-400/10" />

        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-cyan-300">
              AquaSense Premium
            </div>
            <h1 className="max-w-2xl text-4xl font-extrabold text-white sm:text-5xl">Built for intelligent water systems, startup demos, and engineering showcases.</h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300/90 sm:text-base">
              Monitor tanks, flow, quality, and alerts in one premium dashboard with glassmorphism, motion, and sensor intelligence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <motion.div
                key={metric.label}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-4 shadow-xl shadow-cyan-500/5"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                  <metric.icon className="h-5 w-5" />
                </div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="glass-panel rounded-[32px] border border-cyan-500/20 bg-slate-950/60 p-6 shadow-[0_30px_90px_-60px_rgba(6,182,212,0.5)] backdrop-blur-3xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Smart water intelligence</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Live tank telemetry</h2>
            </div>
            <div className="rounded-2xl bg-slate-900/90 px-3 py-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
              Active
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Water Level</p>
              <p className="mt-3 text-3xl font-semibold text-white">78%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" />
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Quality</p>
              <p className="mt-3 text-3xl font-semibold text-white">Safe</p>
              <p className="mt-3 text-sm text-slate-400">TDS 210 • Turbidity 3.1</p>
            </div>
          </div>
        </div>

        <DashboardPreview />
      </div>

      <div className="relative grid gap-4 rounded-[32px] border border-cyan-500/10 bg-slate-950/55 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur-2xl">
        <div className="absolute -top-6 right-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="glass-chip group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-4 text-slate-300 transition-all hover:-translate-y-1 hover:border-cyan-300/40">
            <div className="flex items-center gap-2 text-cyan-300"><Droplet size={18} /><span className="text-sm font-medium text-white">Water level</span></div>
            <p className="mt-3 text-3xl font-semibold text-white">78%</p>
          </div>
          <div className="glass-chip group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-4 text-slate-300 transition-all hover:-translate-y-1 hover:border-cyan-300/40">
            <div className="flex items-center gap-2 text-cyan-300"><Zap size={18} /><span className="text-sm font-medium text-white">Flow rate</span></div>
            <p className="mt-3 text-3xl font-semibold text-white">12 L/min</p>
          </div>
          <div className="glass-chip group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-4 text-slate-300 transition-all hover:-translate-y-1 hover:border-cyan-300/40">
            <div className="flex items-center gap-2 text-cyan-300"><ShieldCheck size={18} /><span className="text-sm font-medium text-white">Tank status</span></div>
            <p className="mt-3 text-3xl font-semibold text-white">Normal</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
