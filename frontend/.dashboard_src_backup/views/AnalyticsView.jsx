import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Filter,
  Users,
  Briefcase,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Building,
  Target
} from 'lucide-react';

export default function AnalyticsView({ applications = [], jobs = [] }) {
  const [timeRange, setTimeRange] = useState('30D');

  const totalApps = applications.length;

  // Funnel calculations
  const funnelStages = useMemo(() => {
    const counts = {
      Applied: 0,
      Shortlisted: 0,
      'Interview Scheduled': 0,
      Selected: 0,
      Rejected: 0
    };

    applications.forEach((app) => {
      const st = app.status || 'Applied';
      if (counts[st] !== undefined) {
        counts[st]++;
      } else if (st === 'Hired') {
        counts.Selected++;
      } else {
        counts.Applied++;
      }
    });

    const base = totalApps || 1;
    return [
      { name: 'Applied / New', count: counts.Applied, pct: Math.round((counts.Applied / base) * 100), color: 'bg-sky-500', text: 'text-sky-600' },
      { name: 'Shortlisted', count: counts.Shortlisted, pct: Math.round((counts.Shortlisted / base) * 100), color: 'bg-indigo-500', text: 'text-indigo-600' },
      { name: 'Interview Scheduled', count: counts['Interview Scheduled'], pct: Math.round((counts['Interview Scheduled'] / base) * 100), color: 'bg-amber-500', text: 'text-amber-600' },
      { name: 'Selected / Hired', count: counts.Selected, pct: Math.round((counts.Selected / base) * 100), color: 'bg-emerald-500', text: 'text-emerald-600' },
      { name: 'Rejected', count: counts.Rejected, pct: Math.round((counts.Rejected / base) * 100), color: 'bg-rose-500', text: 'text-rose-600' }
    ];
  }, [applications, totalApps]);

  // Timeline / Inflow calculations
  const timelineData = useMemo(() => {
    const days = timeRange === '7D' ? 7 : timeRange === '30D' ? 30 : timeRange === '90D' ? 90 : 120;
    const now = new Date();
    const map = new Map();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      map.set(key, 0);
    }

    applications.forEach((a) => {
      if (a.created_at) {
        const dStr = a.created_at.slice(0, 10);
        if (map.has(dStr)) {
          map.set(dStr, map.get(dStr) + 1);
        }
      }
    });

    return Array.from(map.entries()).map(([date, count]) => ({
      date,
      count,
      label: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }));
  }, [applications, timeRange]);

  const maxInflow = Math.max(1, ...timelineData.map(d => d.count));

  // Departmental Openings vs Applicants
  const deptData = useMemo(() => {
    const depts = ['Engineering', 'Marketing', 'Business', 'Mobile', 'Design', 'General'];
    return depts.map(d => {
      const deptJobs = jobs.filter(j => (j.department || '').toLowerCase() === d.toLowerCase());
      const openings = deptJobs.reduce((acc, j) => acc + (parseInt(j.openings, 10) || 1), 0);
      const deptApps = applications.filter(a => {
        const j = jobs.find(job => job.id === a.job_id || job._id === a.job_id);
        return (j?.department || '').toLowerCase() === d.toLowerCase();
      });
      const ratio = openings > 0 ? (deptApps.length / openings).toFixed(1) : 0;
      return {
        department: d,
        openings,
        applicants: deptApps.length,
        ratio,
        demand: deptApps.length > openings * 2 ? 'High Demand' : deptApps.length < openings ? 'Low Inflow' : 'Optimal'
      };
    });
  }, [jobs, applications]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner KPI summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Total Candidate Pool
            </span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {totalApps}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Overall Hiring Conversion
            </span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {totalApps > 0 ? Math.round((funnelStages[3].count / totalApps) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Total Active Vacancies
            </span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {jobs.reduce((acc, j) => acc + (parseInt(j.openings, 10) || 1), 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Applicant Inflow Velocity Chart */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-500" />
              Applicant Inflow Trend
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily candidate submission velocity from public recruitment channels
            </p>
          </div>

          {/* Time range buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            {['7D', '30D', '90D', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  timeRange === range
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Flow Chart */}
        <div className="mt-8">
          <div className="h-56 flex items-end gap-1.5 sm:gap-2 px-2 overflow-x-auto pb-4">
            {timelineData.map((d, i) => {
              const heightPct = Math.max(6, Math.round((d.count / maxInflow) * 100));
              return (
                <div key={i} className="flex-1 min-w-[20px] flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg whitespace-nowrap transition-opacity pointer-events-none z-10 shadow-lg">
                    {d.label}: {d.count} candidates
                  </div>
                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 group-hover:bg-sky-400 ${
                      d.count > 0 ? 'bg-sky-500' : 'bg-slate-100'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  {/* Date label */}
                  {i % (timeRange === '7D' ? 1 : timeRange === '30D' ? 4 : 10) === 0 && (
                    <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">
                      {d.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recruitment Funnel & Department Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recruitment Funnel (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-indigo-500" />
            Recruitment Conversion Funnel
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Stage-by-stage progression from initial application to final hire
          </p>

          <div className="space-y-4">
            {funnelStages.map((stg, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-800">{stg.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">{stg.count} candidates</span>
                    <span className={`font-black ${stg.text}`}>({stg.pct}%)</span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200/70 overflow-hidden">
                  <div
                    className={`h-full ${stg.color} rounded-full transition-all duration-700`}
                    style={{ width: `${Math.max(3, stg.pct)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Departmental Analytics (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2 mb-1">
            <Building className="w-5 h-5 text-emerald-500" />
            Departmental Demand Analysis
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Openings versus applicant volume by business unit
          </p>

          <div className="space-y-3">
            {deptData.map((d) => (
              <div key={d.department} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-black text-slate-900">{d.department}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {d.openings} Openings • {d.applicants} Applicants ({d.ratio}x ratio)
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                  d.demand === 'High Demand' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  d.demand === 'Low Inflow' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {d.demand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

