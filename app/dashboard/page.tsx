"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Sidebar,
  Navbar,
  TankVisualization,
  GaugeComponent,
  SensorCard,
  DashboardCard,
  WarningBanner,
  NotificationPanel,
} from "@/components/aquasense";
import type { SensorData } from "@/lib/mock-data";
import { Activity, Droplet, TrendingUp, Zap } from "lucide-react";

export default function DashboardPage() {
  const [sensorData, setSensorData] = useState<SensorData>({
    waterLevel: 72,
    tds: 340,
    turbidity: 4.1,
    flowRate: 12,
    qualityStatus: "Safe",
    leakageDetected: false,
    dailyConsumption: 285,
    tankCapacity: 1000,
  });

  const [notifications, setNotifications] = useState<
    { id: string; type: "warning" | "danger" | "info"; message: string }[]
  >([]);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const res = await fetch("/api/sensors");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        if (!mounted) return;
        setSensorData(json.data);
        if (json.data.leakageDetected) {
          setNotifications((prev) => [
            ...prev,
            {
              id: `notif-${Date.now()}`,
              type: "danger",
              message: "Possible leakage detected in the system!",
            },
          ]);
        }
      } catch (e) {
        // ignore for now
        // console.error("Failed to fetch sensor data", e);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getTankStatus = (level: number) => {
    if (level >= 80) return "Full";
    if (level >= 50) return "Medium";
    if (level >= 20) return "Low";
    return "Critical";
  };

  const getTdsStatus = (tds: number) => {
    if (tds <= 300) return "Safe";
    if (tds <= 450) return "Moderate";
    return "Unsafe";
  };

  const getTurbidityStatus = (turbidity: number) => {
    if (turbidity <= 4) return "Safe";
    if (turbidity <= 7) return "Moderate";
    return "Unsafe";
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="lg:ml-[260px] transition-all duration-300">
        <Navbar
          title="Dashboard"
          subtitle="Real-time water monitoring overview"
        />

        <div className="p-6 space-y-6">
          <WarningBanner type="leakage" visible={sensorData.leakageDetected} />
          <WarningBanner type="quality" visible={sensorData.qualityStatus === "Unsafe"} />
          <WarningBanner type="lowLevel" visible={sensorData.waterLevel < 20} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Consumption",
                value: `${sensorData.dailyConsumption}L`,
                icon: Droplet,
                color: "from-cyan-500 to-blue-500",
              },
              {
                label: "Flow Rate",
                value: `${sensorData.flowRate} L/min`,
                icon: Activity,
                color: "from-teal-500 to-emerald-500",
              },
              {
                label: "Tank Capacity",
                value: `${sensorData.tankCapacity}L`,
                icon: TrendingUp,
                color: "from-purple-500 to-pink-500",
              },
              {
                label: "Sensors Active",
                value: "4/4",
                icon: Zap,
                color: "from-amber-500 to-orange-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Water Level"
              subtitle="Real-time tank monitoring"
              action={<span className={`text-xs font-medium px-2 py-1 rounded-full ${
                getTankStatus(sensorData.waterLevel) === "Critical"
                  ? "bg-red-500/20 text-red-400"
                  : getTankStatus(sensorData.waterLevel) === "Low"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-emerald-500/20 text-emerald-400"
              }`}>{getTankStatus(sensorData.waterLevel)}</span>}
            >
              <TankVisualization level={sensorData.waterLevel} status={getTankStatus(sensorData.waterLevel)} />
            </DashboardCard>

            <DashboardCard title="Water Quality" subtitle="TDS & Turbidity analysis" className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <GaugeComponent value={sensorData.tds} maxValue={600} label="TDS Level" unit="ppm" status={getTdsStatus(sensorData.tds)} size="lg" />
                  <div className="mt-4 text-center">
                    <p className="text-xs text-slate-400">Total Dissolved Solids</p>
                    <p className="text-[10px] text-slate-500 mt-1">Recommended: {"<"}300 ppm</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <GaugeComponent value={sensorData.turbidity} maxValue={10} label="Turbidity" unit="NTU" status={getTurbidityStatus(sensorData.turbidity)} size="lg" />
                  <div className="mt-4 text-center">
                    <p className="text-xs text-slate-400">Water Clarity</p>
                    <p className="text-[10px] text-slate-500 mt-1">Recommended: {"<"}4 NTU</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SensorCard title="Water Level" value={sensorData.waterLevel} unit="%" icon="droplets" status={sensorData.waterLevel < 20 ? "danger" : sensorData.waterLevel < 50 ? "warning" : "normal"} description="Ultrasonic Sensor" trend={sensorData.waterLevel > 50 ? "stable" : "down"} />
            <SensorCard title="TDS Reading" value={sensorData.tds} unit="ppm" icon="gauge" status={sensorData.tds > 450 ? "danger" : sensorData.tds > 300 ? "warning" : "normal"} description="TDS Sensor" trend={sensorData.tds > 300 ? "up" : "stable"} />
            <SensorCard title="Turbidity" value={sensorData.turbidity} unit="NTU" icon="activity" status={sensorData.turbidity > 7 ? "danger" : sensorData.turbidity > 4 ? "warning" : "normal"} description="Turbidity Sensor" trend="stable" />
            <SensorCard title="Flow Rate" value={sensorData.flowRate} unit="L/min" icon="thermometer" status={sensorData.leakageDetected ? "danger" : sensorData.flowRate > 15 ? "warning" : "normal"} description="Flow Sensor" trend={sensorData.leakageDetected ? "up" : "stable"} />
          </div>

          <DashboardCard title="System Status Summary" subtitle="Overall health of your water management system">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-400">System Online</span>
                </div>
                <p className="text-xs text-slate-400">All sensors are operational and transmitting data</p>
              </div>
              <div className={`p-4 rounded-xl ${sensorData.qualityStatus === "Safe" ? "bg-emerald-500/10 border border-emerald-500/30" : sensorData.qualityStatus === "Moderate" ? "bg-amber-500/10 border border-amber-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${sensorData.qualityStatus === "Safe" ? "bg-emerald-500" : sensorData.qualityStatus === "Moderate" ? "bg-amber-500" : "bg-red-500"} animate-pulse`} />
                  <span className={`text-sm font-medium ${sensorData.qualityStatus === "Safe" ? "text-emerald-400" : sensorData.qualityStatus === "Moderate" ? "text-amber-400" : "text-red-400"}`}>Water Quality: {sensorData.qualityStatus}</span>
                </div>
                <p className="text-xs text-slate-400">{sensorData.qualityStatus === "Safe" ? "Water quality is within safe parameters" : sensorData.qualityStatus === "Moderate" ? "Monitor water quality closely" : "Immediate attention required"}</p>
              </div>
              <div className={`p-4 rounded-xl ${sensorData.leakageDetected ? "bg-red-500/10 border border-red-500/30" : "bg-emerald-500/10 border border-emerald-500/30"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${sensorData.leakageDetected ? "bg-red-500" : "bg-emerald-500"} animate-pulse`} />
                  <span className={`text-sm font-medium ${sensorData.leakageDetected ? "text-red-400" : "text-emerald-400"}`}>{sensorData.leakageDetected ? "Leakage Detected!" : "No Leakage"}</span>
                </div>
                <p className="text-xs text-slate-400">{sensorData.leakageDetected ? "Abnormal flow pattern detected" : "Flow patterns are normal"}</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </main>

      <NotificationPanel notifications={notifications} onDismiss={dismissNotification} />
    </div>
  );
}
