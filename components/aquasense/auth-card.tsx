"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Globe, LogIn, ShieldCheck, Sparkles } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirm: z.string().min(8),
    role: z.enum(["Home User", "Building Admin", "Municipality"]),
    terms: z.boolean().refine(Boolean, "Accept terms"),
  })
  .refine((data) => data.password === data.confirm, { message: "Passwords must match", path: ["confirm"] });

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

type PasswordStrength = { score: number; label: string; color: string };

function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { score, label: "Weak", color: "bg-rose-500" };
  if (score === 2) return { score, label: "Fair", color: "bg-amber-400" };
  if (score === 3) return { score, label: "Strong", color: "bg-cyan-400" };
  return { score, label: "Excellent", color: "bg-emerald-400" };
}

export default function AuthCard({ initial = "login" }: { initial?: "login" | "signup" }) {
  const [mode, setMode] = useState(initial);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    watch: watchLogin,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    watch: watchSignup,
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema), defaultValues: { role: "Home User" } });

  const passwordValue = watchSignup("password") || "";
  const strength = useMemo(() => getPasswordStrength(passwordValue), [passwordValue]);

  const emailValue = watchLogin("email") || watchSignup("email") || "";
  const emailValid = emailValue.length > 0 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailValue);

  async function onLogin(data: LoginForm) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      localStorage.setItem("authToken", json.token);
      setMessage("Login successful");
      window.location.href = "/dashboard";
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
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Signup failed");
      localStorage.setItem("authToken", json.token);
      setMessage("Account created. Redirecting...");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setMessage(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-foreground relative w-full max-w-xl">
      <div className="glass relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-slate-950/70 p-6 shadow-[0_40px_120px_-60px_rgba(6,182,212,0.45)] backdrop-blur-3xl">
        <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">AquaSense</h2>
            <p className="mt-1 text-sm text-slate-400">Premium access for water monitoring teams.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-300">
            <Sparkles size={14} /> Smart Login
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-3xl bg-slate-900/70 p-2 text-center text-xs uppercase tracking-[0.24em] text-slate-400">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-3xl px-4 py-2 transition ${mode === "login" ? "bg-cyan-500/15 text-cyan-200 shadow-inner" : "hover:bg-slate-900/70"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-3xl px-4 py-2 transition ${mode === "signup" ? "bg-cyan-500/15 text-cyan-200 shadow-inner" : "hover:bg-slate-900/70"}`}
          >
            Sign Up
          </button>
        </div>

        <div className="mt-8">
          <AnimatePresence initial={false} mode="wait">
            {mode === "login" ? (
              <motion.form
                key="login"
                onSubmit={handleLoginSubmit(onLogin)}
                className="space-y-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="space-y-2">
                  <div className="group relative">
                    <input
                      {...registerLogin("email")}
                      placeholder=" "
                      className="peer w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <label className="pointer-events-none absolute left-4 top-3 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-cyan-300">
                      Email address
                    </label>
                  </div>
                  {loginErrors.email && <p className="text-xs text-rose-400">{loginErrors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <div className="relative group">
                    <input
                      type={showPass ? "text" : "password"}
                      {...registerLogin("password")}
                      placeholder=" "
                      className="peer w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <label className="pointer-events-none absolute left-4 top-3 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-cyan-300">
                      Password
                    </label>
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-4 top-3 text-slate-400 transition hover:text-cyan-300">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {loginErrors.password && <p className="text-xs text-rose-400">{loginErrors.password.message}</p>}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-transparent text-cyan-500 accent-cyan-400" />
                    Remember me
                  </label>
                  <a href="/forgot" className="text-sm text-cyan-300 transition hover:text-white">
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in to AquaSense"}
                </motion.button>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="h-px flex-1 bg-slate-700/50" />
                  <span>Or continue with</span>
                  <div className="h-px flex-1 bg-slate-700/50" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <motion.button
                    whileHover={{ y: -2 }}
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200"
                  >
                    <Globe size={16} /> Google
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200"
                  >
                    <LogIn size={16} /> Microsoft
                  </motion.button>
                </div>

                <div className="text-sm text-slate-400">Good security starts with strong credentials and secure access.</div>
                {message && <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div>}
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                onSubmit={handleSignupSubmit(onSignup)}
                className="space-y-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="space-y-2">
                  <div className="group relative">
                    <input
                      {...registerSignup("name")}
                      placeholder=" "
                      className="peer w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <label className="pointer-events-none absolute left-4 top-3 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-cyan-300">
                      Full name
                    </label>
                  </div>
                  {signupErrors.name && <p className="text-xs text-rose-400">{signupErrors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <div className="group relative">
                    <input
                      {...registerSignup("email")}
                      placeholder=" "
                      className="peer w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <label className="pointer-events-none absolute left-4 top-3 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-cyan-300">
                      Email address
                    </label>
                  </div>
                  {signupErrors.email && <p className="text-xs text-rose-400">{signupErrors.email.message}</p>}
                  {emailValue.length > 0 && !emailValid && <p className="text-xs text-amber-300">Looks like an invalid email format.</p>}
                </div>

                <div className="space-y-2">
                  <div className="group relative">
                    <input
                      type={showPass ? "text" : "password"}
                      {...registerSignup("password")}
                      placeholder=" "
                      className="peer w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <label className="pointer-events-none absolute left-4 top-3 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-cyan-300">
                      Password
                    </label>
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-4 top-3 text-slate-400 transition hover:text-cyan-300">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {signupErrors.password && <p className="text-xs text-rose-400">{signupErrors.password.message}</p>}
                </div>

                {passwordValue.length > 0 && (
                  <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-3">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500">
                      <span>Password strength</span>
                      <span className="text-white">{strength.label}</span>
                    </div>
                    <div className="flex h-2 gap-2">
                      {[1, 2, 3, 4].map((step) => (
                        <span
                          key={step}
                          className={`h-full flex-1 rounded-full ${strength.score >= step ? strength.color : "bg-slate-800/70"}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="group relative">
                    <input
                      type={showPass ? "text" : "password"}
                      {...registerSignup("confirm")}
                      placeholder=" "
                      className="peer w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <label className="pointer-events-none absolute left-4 top-3 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-cyan-300">
                      Confirm password
                    </label>
                  </div>
                  {signupErrors.confirm && <p className="text-xs text-rose-400">{signupErrors.confirm.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs text-slate-300">Role</label>
                  <select
                    {...registerSignup("role")}
                    className="w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option>Home User</option>
                    <option>Building Admin</option>
                    <option>Municipality</option>
                  </select>
                </div>

                <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                  <input
                    {...registerSignup("terms")}
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-cyan-400 accent-cyan-400"
                  />
                  <span>I agree to the terms and privacy policy.</span>
                </label>
                {signupErrors.terms && <p className="text-xs text-rose-400">You must accept the terms.</p>}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Create your AquaSense account"}
                </motion.button>

                {message && <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div>}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
