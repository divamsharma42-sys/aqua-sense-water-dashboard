"use client";

import { motion } from "framer-motion";
import { Sidebar, Navbar, DashboardCard } from "@/components/aquasense";
import { hardwareComponents, projectFeatures, futureScope } from "@/lib/mock-data";
import {
  Waves,
  Beaker,
  Droplets,
  Gauge,
  Cpu,
  Target,
  Cog,
  Lightbulb,
  Code,
  Globe,
  Leaf,
  Rocket,
  Github,
  Linkedin,
  Mail,
  CheckCircle,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  waves: Waves,
  beaker: Beaker,
  droplets: Droplets,
  gauge: Gauge,
  cpu: Cpu,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="lg:ml-[260px] transition-all duration-300">
        <Navbar title="About Project" subtitle="AquaSense Smart Water Management System" />

        <div className="p-6 space-y-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-teal-500/20 border border-cyan-500/30 p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">AquaSense</h1>
                  <p className="text-cyan-300">Smart Water Management System</p>
                </div>
              </div>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                An IoT-powered water monitoring system designed for real-time tracking of water
                level, quality, and flow. Built for engineering demonstrations, hackathons, and
                smart city applications.
              </p>
            </div>
          </motion.div>

          {/* Project Objective */}
          <div className="grid lg:grid-cols-2 gap-6">
            <DashboardCard title="Project Objective" subtitle="What we aim to achieve">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Real-Time Monitoring</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Continuous monitoring of water parameters with instant alerts for anomalies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                    <Cog className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Automated Detection</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Smart leak detection and water quality assessment using multiple sensors
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Data-Driven Insights</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Analytics dashboard for consumption patterns and predictive maintenance
                    </p>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Key Features" subtitle="What makes AquaSense unique">
              <div className="grid grid-cols-1 gap-2">
                {projectFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </DashboardCard>
          </div>

          {/* Hardware Components */}
          <DashboardCard
            title="Hardware Components"
            subtitle="IoT sensors and microcontroller used"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hardwareComponents.map((component, index) => {
                const Icon = iconMap[component.icon] || Cpu;
                return (
                  <motion.div
                    key={component.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-medium text-white text-sm">{component.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{component.description}</p>
                    <p className="text-[10px] text-cyan-400 font-mono">{component.specs}</p>
                  </motion.div>
                );
              })}
            </div>
          </DashboardCard>

          {/* Working Principle */}
          <DashboardCard title="Working Principle" subtitle="How the system operates">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  step: 1,
                  title: "Data Collection",
                  description: "Sensors measure water level, TDS, turbidity, and flow rate",
                  icon: Gauge,
                },
                {
                  step: 2,
                  title: "Processing",
                  description: "ESP32 processes sensor data and applies threshold checks",
                  icon: Cpu,
                },
                {
                  step: 3,
                  title: "Transmission",
                  description: "Data is transmitted wirelessly via WiFi to the dashboard",
                  icon: Globe,
                },
                {
                  step: 4,
                  title: "Visualization",
                  description: "Real-time display with alerts and analytics on the web UI",
                  icon: Code,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="relative p-4 rounded-xl bg-slate-900/50 border border-slate-700/50"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <item.icon className="w-6 h-6 text-cyan-400 mb-2" />
                    <h4 className="font-medium text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </DashboardCard>

          {/* Technology Stack & Applications */}
          <div className="grid lg:grid-cols-2 gap-6">
            <DashboardCard title="Technology Stack" subtitle="Tools and frameworks used">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "React.js / Next.js", category: "Frontend" },
                  { name: "Tailwind CSS", category: "Styling" },
                  { name: "Framer Motion", category: "Animations" },
                  { name: "Recharts", category: "Data Viz" },
                  { name: "TypeScript", category: "Language" },
                  { name: "ESP32", category: "Hardware" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
                  >
                    <p className="text-sm font-medium text-white">{tech.name}</p>
                    <p className="text-[10px] text-slate-500">{tech.category}</p>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Real-World Applications"
              subtitle="Where AquaSense can be deployed"
            >
              <div className="space-y-3">
                {[
                  "Smart Home Water Management",
                  "Agricultural Irrigation Monitoring",
                  "Industrial Water Treatment Plants",
                  "Municipal Water Distribution",
                  "Hotels & Commercial Buildings",
                  "Swimming Pool Maintenance",
                ].map((app, index) => (
                  <motion.div
                    key={app}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400" />
                    <span className="text-sm text-slate-300">{app}</span>
                  </motion.div>
                ))}
              </div>
            </DashboardCard>
          </div>

          {/* Sustainability & Future Scope */}
          <div className="grid lg:grid-cols-2 gap-6">
            <DashboardCard title="Sustainability Benefits" subtitle="Environmental impact">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Water Conservation</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Reduce water wastage by up to 30% through leak detection and usage optimization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Quality Assurance</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Ensure safe drinking water through continuous quality monitoring
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Resource Efficiency</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Data-driven insights enable better resource allocation and planning
                    </p>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Future Scope" subtitle="Planned enhancements">
              <div className="space-y-2">
                {futureScope.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                  >
                    <Rocket className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </DashboardCard>
          </div>

          {/* Team / Contact */}
          <DashboardCard title="Connect With Us" subtitle="Get in touch for collaborations">
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { icon: Github, label: "GitHub", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Mail, label: "Email", href: "mailto:contact@aquasense.io" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="font-medium">{social.label}</span>
                </a>
              ))}
            </div>
          </DashboardCard>

          {/* Footer */}
          <div className="text-center py-6 text-slate-500 text-sm">
            <p>
              AquaSense © 2024 • Built for Engineering Excellence • Smart Water Management
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
