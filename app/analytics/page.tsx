"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Sidebar, Navbar, DashboardCard } from "@/components/aquasense";
import {
  dailyUsageData,
  weeklyTrendData,
  qualityHistoryData,
  flowRateData,
  sensorActivityData,
} from "@/lib/mock-data";
import { Calendar, Filter, Download } from "lucide-react";

const COLORS = ["#06b6d4", "#14b8a6", "#8b5cf6", "#f59e0b"];

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState<"day" | "week" | "month">("week");

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="lg:ml-[260px] transition-all duration-300">
        <Navbar
          title="Analytics"
          subtitle="Water usage and quality trends"
        />

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select
                value={timeFilter}
                onChange={(e) =>
                  setTimeFilter(e.target.value as "day" | "week" | "month")
                }
                className="bg-transparent text-sm text-white outline-none cursor-pointer"
              >
                <option value="day" className="bg-slate-800">
                  Today
                </option>
                <option value="week" className="bg-slate-800">
                  This Week
                </option>
                <option value="month" className="bg-slate-800">
                  This Month
                </option>
              </select>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-colors ml-auto">
              <Download className="w-4 h-4" />
              <span className="text-sm">Export Report</span>
            </button>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Daily Water Usage */}
            <DashboardCard
              title="Daily Water Usage"
              subtitle="Consumption vs Target (Liters)"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyUsageData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="usage"
                      name="Actual Usage"
                      fill="#06b6d4"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="target"
                      name="Target"
                      fill="#334155"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            {/* Weekly Trends */}
            <DashboardCard
              title="Weekly Consumption Trends"
              subtitle="Water usage over time"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyTrendData}>
                    <defs>
                      <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="consumption"
                      name="Consumption (L)"
                      stroke="#06b6d4"
                      fillOpacity={1}
                      fill="url(#colorConsumption)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            {/* Water Quality History */}
            <DashboardCard
              title="Water Quality History"
              subtitle="TDS and Turbidity over 24 hours"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={qualityHistoryData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tds"
                      name="TDS (ppm)"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ fill: "#06b6d4", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="turbidity"
                      name="Turbidity (NTU)"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      dot={{ fill: "#14b8a6", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            {/* Flow Rate */}
            <DashboardCard
              title="Flow Rate Analysis"
              subtitle="Hourly flow rate patterns"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={flowRateData}>
                    <defs>
                      <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="hour"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      name="Flow Rate (L/min)"
                      stroke="#14b8a6"
                      fillOpacity={1}
                      fill="url(#colorFlow)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>

          {/* Sensor Activity */}
          <div className="grid lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Sensor Activity Overview"
              subtitle="Readings and errors per sensor"
              className="lg:col-span-2"
            >
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sensorActivityData} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "#334155" }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="readings"
                      name="Total Readings"
                      fill="#06b6d4"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar
                      dataKey="errors"
                      name="Errors"
                      fill="#ef4444"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            {/* Sensor Distribution Pie */}
            <DashboardCard title="Sensor Health" subtitle="Overall system status">
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Active", value: 4 },
                        { name: "Warning", value: 0 },
                        { name: "Error", value: 0 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {[
                  { label: "Active", color: "bg-cyan-500" },
                  { label: "Warning", color: "bg-amber-500" },
                  { label: "Error", color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          {/* Statistics Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Avg Daily Usage",
                value: "289L",
                change: "-5%",
                positive: true,
              },
              {
                label: "Water Saved",
                value: "125L",
                change: "+12%",
                positive: true,
              },
              {
                label: "Quality Score",
                value: "92%",
                change: "+3%",
                positive: true,
              },
              {
                label: "System Uptime",
                value: "99.8%",
                change: "Excellent",
                positive: true,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-xs text-slate-400">{stat.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      stat.positive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
