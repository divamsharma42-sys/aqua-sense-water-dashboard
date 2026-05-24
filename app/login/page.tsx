"use client";

import AnimatedBackground from "@/components/aquasense/animated-background";
import AuthCard from "@/components/aquasense/auth-card";
import DashboardPreview from "@/components/aquasense/dashboard-preview";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(3,105,147,0.06),transparent)]">
      <AnimatedBackground />

      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-16">
        <div className="glass-hero w-full rounded-3xl px-8 py-10">
          <section className="hidden flex-1 flex-col gap-6 md:flex">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white">AquaSense — Smart Water Monitoring</h1>
            <p className="text-lg text-slate-300">Real-time IoT telemetry, alerts and insights for tanks and networks.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="space-y-2">
              <div className="text-sm text-slate-300">500+ Sensors Monitored</div>
              <div className="text-sm text-slate-300">24/7 Live Tracking</div>
              <div className="text-sm text-slate-300">Real-Time Alerts</div>
            </div>

            <div className="ml-auto">
              <DashboardPreview />
            </div>
          </div>

            <div className="mt-auto text-sm text-slate-400">Built for engineering projects, startup demos and hackathons.</div>
          </section>

          <aside className="auth-foreground w-full max-w-lg">
            <AuthCard initial="login" />
          </aside>
        </div>
      </main>
    </div>
  );
}
"use client";

import AnimatedBackground from "@/components/aquasense/animated-background";
import AuthCard from "@/components/aquasense/auth-card";
import DashboardPreview from "@/components/aquasense/dashboard-preview";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(3,105,147,0.06),transparent)]">
      <AnimatedBackground />

      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-16">
        <div className="glass-hero w-full rounded-3xl px-8 py-10">
          <section className="hidden flex-1 flex-col gap-6 md:flex">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white">AquaSense — Smart Water Monitoring</h1>
            <p className="text-lg text-slate-300">Real-time IoT telemetry, alerts and insights for tanks and networks.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="space-y-2">
              <div className="text-sm text-slate-300">500+ Sensors Monitored</div>
              <div className="text-sm text-slate-300">24/7 Live Tracking</div>
              <div className="text-sm text-slate-300">Real-Time Alerts</div>
            </div>

            <div className="ml-auto">
              <DashboardPreview />
            </div>
          </div>

            <div className="mt-auto text-sm text-slate-400">Built for engineering projects, startup demos and hackathons.</div>
          </section>

          <aside className="auth-foreground w-full max-w-lg">
            <AuthCard initial="login" />
          </aside>
        </div>
      </main>
    </div>
  );
}
