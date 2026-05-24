"use client";

import AnimatedBackground from "@/components/aquasense/animated-background";
import AuthCard from "@/components/aquasense/auth-card";
import AuthHero from "@/components/aquasense/auth-hero";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackground />

      <main className="relative z-20 mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr]">
        <AuthHero />

        <section className="glass-hero relative rounded-[32px] border border-cyan-500/10 bg-slate-950/70 p-6 shadow-[0_40px_120px_-60px_rgba(6,182,212,0.45)] backdrop-blur-3xl lg:p-10">
          <div className="flex h-full flex-col justify-center">
            <AuthCard initial="signup" />
          </div>
        </section>
      </main>
    </div>
  );
}
