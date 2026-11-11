import React from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';

export default function StatsCard({
  title,
  value,
  subvalue,
  trend,
  trendPositive = true,
  icon: Icon,
  color = "sky",
  onClick
}) {
  const colorMap = {
    sky: {
      bg: "bg-sky-50",
      text: "text-sky-600",
      border: "border-sky-100",
      glow: "hover:border-sky-300"
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
      glow: "hover:border-emerald-300"
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-100",
      glow: "hover:border-indigo-300"
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
      glow: "hover:border-amber-300"
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
      glow: "hover:border-rose-300"
    },
    cyan: {
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-100",
      glow: "hover:border-cyan-300"
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
      glow: "hover:border-purple-300"
    }
  };

  const c = colorMap[color] || colorMap.sky;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl border ${c.border} p-5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer ${c.glow}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
            {title}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {value}
            </span>
            {subvalue && (
              <span className="text-xs font-semibold text-slate-600">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center transition-transform group-hover:scale-110 duration-200 shrink-0`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
        {trend ? (
          <div className="flex items-center gap-1.5 text-xs font-bold">
            {trendPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
            )}
            <span className={trendPositive ? "text-emerald-600" : "text-rose-600"}>
              {trend}
            </span>
          </div>
        ) : (
          <span className="text-[11px] font-semibold text-slate-600">
            Click to view breakdown
          </span>
        )}

        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}

