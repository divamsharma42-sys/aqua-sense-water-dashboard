"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Globe, LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string().min(8),
  role: z.enum(["Home User", "Building Admin", "Municipality"]),
  terms: z.boolean().refine(Boolean, "Accept terms"),
}).refine((data) => data.password === data.confirm, { message: "Passwords must match", path: ["confirm"] });

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

export default function AuthCard({ initial = "login" }: { initial?: "login" | "signup" }) {
  const [mode, setMode] = useState(initial);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema), defaultValues: { role: "Home User" } });

  async function onLogin(data: LoginForm) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      localStorage.setItem("authToken", json.token);
      setMessage("Login successful");
      window.location.href = "/";
    } catch (err: any) {
      setMessage(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  async function onSignup(data: SignupForm) {
    setLoading(true);
    setMessage(null);
    try {
      const payload = { name: data.name, email: data.email, password: data.password, role: data.role };
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Signup failed");
      localStorage.setItem("authToken", json.token);
      setMessage("Account created. Redirecting...");
      window.location.href = "/";
    } catch (err: any) {
      setMessage(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-foreground relative w-full max-w-xl">
      <div className="glass relative overflow-hidden rounded-3xl border-cyan-700/30 border p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">AquaSense</h2>
          <div className="text-sm text-slate-300">IoT Water Monitoring</div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setMode("login")}
            className={`px-3 py-1 rounded-xl text-sm font-medium ${mode === "login" ? "bg-cyan-600 text-white shadow" : "text-slate-300"}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`px-3 py-1 rounded-xl text-sm font-medium ${mode === "signup" ? "bg-cyan-600 text-white shadow" : "text-slate-300"}`}
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6">
          <motion.div key={mode} initial={{ opacity: 0, x: mode === "signup" ? 40 : -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 120 }}>
            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300">Email</label>
                  <input {...registerLogin("email")} className="mt-1 w-full rounded-xl bg-transparent border border-slate-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400" />
                  {loginErrors.email && <div className="text-xs text-red-400">{loginErrors.email.message}</div>}
                </div>

                <div>
                  <label className="text-xs text-slate-300">Password</label>
                  <div className="relative mt-1">
                    <input type={showPass ? "text" : "password"} {...registerLogin("password")} className="w-full rounded-xl bg-transparent border border-slate-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400" />
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-2 top-2 text-slate-300">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {loginErrors.password && <div className="text-xs text-red-400">{loginErrors.password.message}</div>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input id="remember" type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-transparent" />
                    <label htmlFor="remember" className="text-sm text-slate-300">Remember me</label>
                  </div>
                  <a href="/forgot" className="text-sm text-cyan-300">Forgot?</a>
                </div>

                <div>
                  <button disabled={loading} type="submit" className="w-full rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white hover:scale-[1.01] transition">
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-700/50" />
                  <div className="text-xs text-slate-400">or continue with</div>
                  <div className="h-px flex-1 bg-slate-700/50" />
                </div>

                <div className="flex gap-3">
                  <button type="button" className="flex-1 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 flex items-center justify-center gap-2">
                    <Globe size={16} /> Google
                  </button>
                  <button type="button" className="flex-1 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 flex items-center justify-center gap-2">
                    <LogIn size={16} /> Microsoft
                  </button>
                </div>

                {message && <div className="text-sm text-amber-200">{message}</div>}
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300">Full name</label>
                  <input {...registerSignup("name")} className="mt-1 w-full rounded-xl bg-transparent border border-slate-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400" />
                  {signupErrors.name && <div className="text-xs text-red-400">{signupErrors.name.message}</div>}
                </div>

                <div>
                  <label className="text-xs text-slate-300">Email</label>
                  <input {...registerSignup("email")} className="mt-1 w-full rounded-xl bg-transparent border border-slate-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400" />
                  {signupErrors.email && <div className="text-xs text-red-400">{signupErrors.email.message}</div>}
                </div>

                <div>
                  <label className="text-xs text-slate-300">Password</label>
                  <input type={showPass ? "text" : "password"} {...registerSignup("password")} className="mt-1 w-full rounded-xl bg-transparent border border-slate-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400" />
                  {signupErrors.password && <div className="text-xs text-red-400">{signupErrors.password.message}</div>}
                </div>

                <div>
                  <label className="text-xs text-slate-300">Confirm Password</label>
                  <input type={showPass ? "text" : "password"} {...registerSignup("confirm")} className="mt-1 w-full rounded-xl bg-transparent border border-slate-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400" />
                  {signupErrors.confirm && <div className="text-xs text-red-400">{signupErrors.confirm.message}</div>}
                </div>

                <div>
                  <label className="text-xs text-slate-300">Role</label>
                  <select {...registerSignup("role")} className="mt-1 w-full rounded-xl bg-transparent border border-slate-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400">
                    <option>Home User</option>
                    <option>Building Admin</option>
                    <option>Municipality</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input {...registerSignup("terms")} id="terms" type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-transparent" />
                  <label htmlFor="terms" className="text-sm text-slate-300">I agree to the terms and privacy.</label>
                </div>

                <div>
                  <button disabled={loading} type="submit" className="w-full rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white hover:scale-[1.01] transition">
                    {loading ? "Creating..." : "Create account"}
                  </button>
                </div>

                {message && <div className="text-sm text-amber-200">{message}</div>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
