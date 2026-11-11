import React from 'react';

export default function ExecutiveHeroBanner({
  badge = "PORTAL OVERVIEW",
  title = "Dashboard Overview",
  icon = "⚡",
  metrics = [],
  filterTitle = "QUICK FILTERS & LIVE COHORT",
  pills = [],
  activePill,
  onPillClick
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#20003B] via-[#4A0E6C] to-[#7B1FA2] rounded-3xl p-5 sm:p-7 shadow-xl shadow-purple-950/20 text-white border border-purple-400/20 animate-in fade-in duration-200">
      {/* Background Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

      {/* Title & Badge Row */}
      <div className="relative z-10 flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-inner">
            {icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-black tracking-tight text-white">{title}</h2>
              {badge && (
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/15 text-purple-200 border border-white/10">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Glassmorphic Metric Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {metrics.map((m, idx) => {
          const isHighlighted = m.highlight || idx === 0;
          return (
            <div
              key={idx}
              onClick={m.onClick}
              className={`relative backdrop-blur-md rounded-2xl p-4 transition-all duration-200 flex items-center gap-3.5 group cursor-pointer ${
                isHighlighted
                  ? 'bg-white/[0.14] border-2 border-emerald-400 shadow-lg shadow-emerald-500/10'
                  : 'bg-white/10 hover:bg-white/[0.14] border border-white/15 hover:border-white/30'
              }`}
            >
              {/* Squircle Colored Icon */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${
                  m.iconBg || 'bg-gradient-to-tr from-emerald-500 to-teal-400'
                }`}
              >
                {m.icon}
              </div>

              {/* Text Metric */}
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-white/75 uppercase tracking-wider truncate">
                  {m.label}
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-0.5">
                  {m.value}
                </div>
                <div
                  className={`text-[11px] font-semibold mt-0.5 truncate ${
                    m.subtextColor || 'text-emerald-300'
                  }`}
                >
                  {m.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub Bar: Filter & Pills Row (Matching User Screenshot) */}
      {pills.length > 0 && (
        <div className="relative z-10 pt-4 border-t border-white/10">
          {filterTitle && (
            <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2.5 flex items-center gap-1.5">
              <span>👥</span>
              <span>{filterTitle}</span>
            </div>
          )}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {pills.map((p, idx) => {
              const isActive = activePill ? activePill === p.id : idx === 0;
              return (
                <button
                  key={p.id || idx}
                  onClick={() => onPillClick && onPillClick(p.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                    isActive
                      ? 'bg-slate-900/80 text-white border border-white/40 shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                  }`}
                >
                  {p.icon && <span>{p.icon}</span>}
                  <span>{p.label}</span>
                  {p.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                        p.badgeColor || 'bg-cyan-400 text-slate-900'
                      }`}
                    >
                      {p.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

