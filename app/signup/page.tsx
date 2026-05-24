"use client";

import AnimatedBackground from "@/components/aquasense/animated-background";
import AuthCard from "@/components/aquasense/auth-card";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(3,105,147,0.06),transparent)]">
      <AnimatedBackground />

      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-16">
        <div className="glass-hero w-full rounded-3xl px-8 py-10">
          <aside className="auth-foreground w-full max-w-lg">
            <AuthCard initial="signup" />
          </aside>
        </div>
      </main>
    </div>
  );
}
"use client";

import AnimatedBackground from "@/components/aquasense/animated-background";
import AuthCard from "@/components/aquasense/auth-card";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(3,105,147,0.06),transparent)]">
      <AnimatedBackground />

      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-16">
        <div className="glass-hero w-full rounded-3xl px-8 py-10">
          <section className="hidden flex-1 flex-col gap-6 md:flex">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-white">Create your AquaSense account</h1>
              <p className="text-lg text-slate-300">Get secure access to live telemetry and alerts.</p>
            </div>

            <div className="mt-auto text-sm text-slate-400">Secure, scalable and built for real-time IoT.</div>
          </section>

          <aside className="auth-foreground w-full max-w-lg">
            <AuthCard initial="signup" />
          </aside>
        </div>
      </main>
    </div>
  );
}
