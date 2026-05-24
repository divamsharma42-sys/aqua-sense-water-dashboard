import { BarChart3, Droplet, ShieldCheck } from "lucide-react";

export default function DashboardPreview() {
  return (
    <div className="rounded-3xl border border-slate-700/60 bg-slate-950/70 p-4 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Live preview</p>
          <h3 className="text-lg font-semibold text-white">Sensor dashboard</h3>
        </div>
        <div className="rounded-2xl bg-cyan-600/10 p-2 text-cyan-300">
          <BarChart3 size={18} />
        </div>
      </div>

      <div className="grid gap-3">
        <div className="grid grid-cols-3 gap-2 rounded-3xl bg-slate-900/80 p-4 text-slate-300">
          <div className="col-span-2">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Tank Level</p>
            <p className="mt-1 text-xl font-semibold text-white">72%</p>
          </div>
          <div className="flex items-center justify-end text-cyan-300">
            <Droplet size={20} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-3xl bg-slate-900/80 p-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Quality</p>
            <p className="mt-2 text-sm font-semibold text-white">Safe</p>
          </div>
          <div className="rounded-3xl bg-slate-900/80 p-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Alerts</p>
            <p className="mt-2 text-sm font-semibold text-emerald-300">None</p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/80 p-3 text-slate-300">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-slate-500">
            <span>Network status</span>
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <ShieldCheck size={12} /> Online
            </span>
          </div>
          <div className="mt-3 h-20 rounded-2xl bg-slate-950/80" />
        </div>
      </div>
    </div>
  );
}
