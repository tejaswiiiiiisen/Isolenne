import React from 'react';

export default function ExecutiveHeroBanner({
  badge = "CANDIDATES PORTAL",
  title = "Candidates Overview",
  icon = "👥",
  metrics = [],
  filterTitle = "FILTER BY STATUS",
  pills = [],
  activePill,
  onPillClick
}) {
  const gridColsClass = metrics.length === 3
    ? 'grid-cols-1 sm:grid-cols-3'
    : metrics.length === 2
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#20003B] via-[#4A0E6C] to-[#7B1FA2] rounded-2xl p-3.5 sm:p-4 shadow-lg shadow-purple-950/20 text-white border border-purple-400/20 animate-in fade-in duration-200">
      {/* Background Ambient Glows */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

      {/* Title & Badge Row (Compact & Thin) */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-base shadow-inner">
            {icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">{title}</h2>
              {badge && (
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-white/15 text-purple-200 border border-white/10">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Glassmorphic Metric Cards Grid (Exactly 3 Cards, Slim & Compact) */}
      <div className={`relative z-10 grid ${gridColsClass} gap-2.5 sm:gap-3 mb-3`}>
        {metrics.map((m, idx) => {
          const isHighlighted = m.highlight || idx === 0;
          return (
            <div
              key={idx}
              onClick={m.onClick}
              className={`relative backdrop-blur-md rounded-xl p-3 transition-all duration-200 flex items-center gap-3 group cursor-pointer ${
                isHighlighted
                  ? 'bg-white/[0.14] border-2 border-emerald-400 shadow-md shadow-emerald-500/10'
                  : 'bg-white/10 hover:bg-white/[0.14] border border-white/15 hover:border-white/30'
              }`}
            >
              {/* Squircle Colored Icon */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md ${
                  m.iconBg || 'bg-gradient-to-tr from-emerald-500 to-teal-400'
                }`}
              >
                {m.icon}
              </div>

              {/* Text Metric */}
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold text-white/75 uppercase tracking-wider truncate">
                  {m.label}
                </div>
                <div className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight mt-0.5">
                  {m.value}
                </div>
                <div
                  className={`text-[10px] font-semibold mt-0.5 truncate ${
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

      {/* Sub Bar: Filter & Pills Row (Slim) */}
      {pills.length > 0 && (
        <div className="relative z-10 pt-2.5 border-t border-white/10">
          {filterTitle && (
            <div className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-2 flex items-center gap-1.5">
              <span>👥</span>
              <span>{filterTitle}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {pills.map((p, idx) => {
              const isActive = activePill ? activePill === p.id : idx === 0;
              return (
                <button
                  key={p.id || idx}
                  onClick={() => onPillClick && onPillClick(p.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                    isActive
                      ? 'bg-slate-900/80 text-white border border-white/40 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                  }`}
                >
                  {p.icon && <span className="text-xs">{p.icon}</span>}
                  <span>{p.label}</span>
                  {p.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
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
