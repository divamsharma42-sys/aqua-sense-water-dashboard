"use client";

import AnimatedBackground from "@/components/aquasense/animated-background";
import { useState } from "react";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    await fetch('/api/auth/forgot', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
    setSent(true);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(3,105,147,0.06),transparent)]">
      <AnimatedBackground />
      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-16">
        <div className="glass-hero w-full rounded-3xl px-8 py-10">
          <div className="auth-foreground w-full max-w-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Forgot password</h2>
            <form onSubmit={submit} className="space-y-4">
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl p-3" />
              <button className="rounded-xl bg-cyan-600 px-4 py-2 text-white">Send reset link</button>
              {sent && <div className="text-sm text-slate-200">Reset token returned in API response (demo).</div>}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
