"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sidebar, Navbar, AlertCard, DashboardCard } from "@/components/aquasense";
import { generateMockAlerts, type Alert } from "@/lib/mock-data";
import {
  Search,
  Filter,
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  X,
} from "lucide-react";

export default function AlertsPage() {
  const [alerts] = useState<Alert[]>(generateMockAlerts());
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch =
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.sensor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity =
        severityFilter === "all" || alert.severity === severityFilter;

      const matchesType = typeFilter === "all" || alert.type === typeFilter;

      return matchesSearch && matchesSeverity && matchesType;
    });
  }, [alerts, searchQuery, severityFilter, typeFilter]);

  const alertStats = useMemo(() => {
    return {
      total: alerts.length,
      critical: alerts.filter((a) => a.severity === "critical").length,
      high: alerts.filter((a) => a.severity === "high").length,
      medium: alerts.filter((a) => a.severity === "medium").length,
      low: alerts.filter((a) => a.severity === "low").length,
    };
  }, [alerts]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="lg:ml-[260px] transition-all duration-300">
        <Navbar
          title="Alerts & Notifications"
          subtitle="System alerts and monitoring events"
        />

        <div className="p-6 space-y-6">
          {/* Alert Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              {
                label: "Total Alerts",
                value: alertStats.total,
                icon: Bell,
                color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
              },
              {
                label: "Critical",
                value: alertStats.critical,
                icon: AlertCircle,
                color: "bg-red-500/20 text-red-400 border-red-500/30",
              },
              {
                label: "High",
                value: alertStats.high,
                icon: AlertTriangle,
                color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
              },
              {
                label: "Medium",
                value: alertStats.medium,
                icon: Info,
                color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
              },
              {
                label: "Low",
                value: alertStats.low,
                icon: CheckCircle2,
                color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-4 rounded-xl border ${stat.color} backdrop-blur-sm`}
              >
                <stat.icon className="w-5 h-5" />
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs opacity-80">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <DashboardCard title="Filter Alerts">
            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-700/50">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Severity Filter */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-700/50">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="bg-transparent text-sm text-white outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-800">
                    All Severity
                  </option>
                  <option value="critical" className="bg-slate-800">
                    Critical
                  </option>
                  <option value="high" className="bg-slate-800">
                    High
                  </option>
                  <option value="medium" className="bg-slate-800">
                    Medium
                  </option>
                  <option value="low" className="bg-slate-800">
                    Low
                  </option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-700/50">
                <Bell className="w-4 h-4 text-slate-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-transparent text-sm text-white outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-800">
                    All Types
                  </option>
                  <option value="danger" className="bg-slate-800">
                    Danger
                  </option>
                  <option value="warning" className="bg-slate-800">
                    Warning
                  </option>
                  <option value="info" className="bg-slate-800">
                    Info
                  </option>
                  <option value="success" className="bg-slate-800">
                    Success
                  </option>
                </select>
              </div>
            </div>
          </DashboardCard>

          {/* Alerts List */}
          <DashboardCard
            title="Alert History"
            subtitle={`Showing ${filteredAlerts.length} of ${alerts.length} alerts`}
          >
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert, index) => (
                  <AlertCard key={alert.id} alert={alert} index={index} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No alerts match your filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSeverityFilter("all");
                      setTypeFilter("all");
                    }}
                    className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </DashboardCard>

          {/* Alert Guidelines */}
          <DashboardCard
            title="Alert Guidelines"
            subtitle="Understanding alert severity levels"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  severity: "Critical",
                  description:
                    "Immediate action required. System functionality may be compromised.",
                  color: "bg-red-500/10 border-red-500/30 text-red-400",
                  examples: ["Leakage detected", "Unsafe water quality"],
                },
                {
                  severity: "High",
                  description:
                    "Urgent attention needed. May escalate to critical if not addressed.",
                  color: "bg-orange-500/10 border-orange-500/30 text-orange-400",
                  examples: ["High TDS levels", "Overflow risk"],
                },
                {
                  severity: "Medium",
                  description:
                    "Monitor closely. Parameters approaching threshold limits.",
                  color: "bg-amber-500/10 border-amber-500/30 text-amber-400",
                  examples: ["Moderate turbidity", "Low water level"],
                },
                {
                  severity: "Low",
                  description:
                    "Informational. No immediate action required.",
                  color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                  examples: ["Scheduled maintenance", "Quality restored"],
                },
              ].map((item) => (
                <div
                  key={item.severity}
                  className={`p-4 rounded-xl border ${item.color}`}
                >
                  <h4 className="font-semibold text-white mb-2">
                    {item.severity}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    {item.description}
                  </p>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                      Examples:
                    </p>
                    {item.examples.map((example) => (
                      <p key={example} className="text-xs">
                        • {example}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
}
