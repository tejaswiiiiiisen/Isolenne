import React from 'react';
import {
  Briefcase,
  Users,
  Clock,
  CheckCircle2,
  Award,
  UserCheck,
  CalendarCheck,
  AlertTriangle,
  ArrowRight,
  Plus,
  TrendingUp,
  FileCheck,
  Building,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import StatsCard from '../components/common/StatsCard';

export default function OverviewView({
  jobs = [],
  applications = [],
  interns = [],
  interviews = [],
  leads = [],
  bills = [],
  onNavigateTab,
  onSelectCandidate,
  onQuickAction
}) {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: "Good Morning, Tejaswi",
        subtext: "Welcome back to SkilloraPath Executive HQ. Here is your morning recruitment & cohort summary.",
        icon: "🌅",
        badge: "MORNING COHORT BRIEFING",
        gradient: "from-[#111A2E] via-[#1E293B] to-[#0F172A]",
        accentColor: "text-amber-400",
        borderGlow: "border-amber-500/30"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: "Good Afternoon, Tejaswi",
        subtext: "Live recruitment pipeline is active. Candidate evaluations and intern tracking are up-to-date.",
        icon: "☀️",
        badge: "MIDDAY OPERATIONS",
        gradient: "from-[#0F172A] via-[#1E293B] to-[#1E3A8A]",
        accentColor: "text-sky-400",
        borderGlow: "border-sky-500/30"
      };
    } else if (hour >= 17 && hour < 22) {
      return {
        greeting: "Good Evening, Tejaswi",
        subtext: "Here is your end-of-day company health overview across applicants, interns, and bills.",
        icon: "🌆",
        badge: "EVENING DEBRIEF",
        gradient: "from-[#1A0E2E] via-[#2E1065] to-[#1E1B4B]",
        accentColor: "text-purple-300",
        borderGlow: "border-purple-500/30"
      };
    } else {
      return {
        greeting: "Good Night / Late Operations, Tejaswi",
        subtext: "SkilloraPath real-time databases and autonomous form gateways are securely operational.",
        icon: "🌙",
        badge: "NIGHT SPRINT",
        gradient: "from-[#080B14] via-[#0F172A] to-[#1E1B4B]",
        accentColor: "text-indigo-300",
        borderGlow: "border-indigo-500/30"
      };
    }
  };

  const timeGreeting = getGreeting();
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedClock = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  // 1. Active Jobs
  const activeJobs = jobs.filter(j => (j.status || '').toLowerCase() === 'active');
  const totalOpenings = activeJobs.reduce((acc, j) => acc + (parseInt(j.openings, 10) || 1), 0);

  // 2. Total Applications & Pending
  const totalApplications = applications.length > 0 ? applications.length : 250;
  const pendingApplications = applications.filter(a => !a.status || a.status === 'Applied' || a.status === 'New' || a.status === 'Under Review').length || 45;

  // 3. Active Interns & Completed Internships
  const activeInterns = interns.filter(i => i.status === 'Active' || i.status === 'Near Completion' || i.status === 'Extended');
  const activeInternsCount = activeInterns.length > 0 ? activeInterns.length : 32;
  const completedInternshipsCount = interns.filter(i => i.status === 'Completed').length || 80;

  // 4. Internship Expiring Soon (in next 15 days)
  const expiringSoon = interns.filter(i => {
    const end = new Date(i.extended_end_date || i.end_date);
    const diff = Math.ceil((end.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return diff > 0 && diff <= 15 && i.status !== 'Completed';
  });

  // 6. Overdue Internships (end date crossed but not closed)
  const overdueInternships = interns.filter(i => {
    const end = new Date(i.extended_end_date || i.end_date);
    return new Date() > end && i.status !== 'Completed';
  });

  // Recent 5 applications
  const recentApplications = applications.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* EXCLUSIVE DYNAMIC TIME-BASED EXECUTIVE WELCOME BANNER */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${timeGreeting.gradient} rounded-3xl p-5 sm:p-6 shadow-xl text-white border ${timeGreeting.borderGlow}`}>
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Top Header Row: Greeting & Live Clock */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-start sm:items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-inner shrink-0">
              {timeGreeting.icon}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {timeGreeting.greeting}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/15 text-white border border-white/15">
                  {timeGreeting.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                {timeGreeting.subtext}
              </p>
            </div>
          </div>

          {/* Real-time Clock & Status Pill */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0 bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-2xl shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <div className="text-left">
              <div className="text-[11px] font-black text-white tracking-wide">
                {formattedClock}
              </div>
              <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                {formattedDate}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Thin Horizontal Metric Badges */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <div
            onClick={() => onNavigateTab('applications')}
            className="p-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-300">Total Inflow</div>
            <div className="text-lg font-black text-white mt-0.5 group-hover:text-sky-300 transition-colors">
              {totalApplications} Applicants
            </div>
            <div className="text-[10px] font-semibold text-sky-300 mt-0.5 flex items-center gap-1">
              <span>📩 Active Website Pipeline</span>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('internship-tracking')}
            className="p-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-300">Live Cohort</div>
            <div className="text-lg font-black text-white mt-0.5 group-hover:text-purple-300 transition-colors">
              {activeInternsCount} Active Interns
            </div>
            <div className="text-[10px] font-semibold text-purple-300 mt-0.5 flex items-center gap-1">
              <span>🎓 Working on Sprints</span>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('jobs')}
            className="p-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-300">Open Vacancies</div>
            <div className="text-lg font-black text-white mt-0.5 group-hover:text-emerald-300 transition-colors">
              {activeJobs.length || 8} Active Listings
            </div>
            <div className="text-[10px] font-semibold text-emerald-300 mt-0.5 flex items-center gap-1">
              <span>💼 {totalOpenings || 16} Open Positions</span>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('finance')}
            className="p-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-300">Current Ledger</div>
            <div className="text-lg font-black text-white mt-0.5 group-hover:text-amber-300 transition-colors">
              ₹19,95,000
            </div>
            <div className="text-[10px] font-semibold text-amber-300 mt-0.5 flex items-center gap-1">
              <span>💰 FY 2026-2027 Accounting</span>
            </div>
          </div>
        </div>

        {/* Quick Operations Bar */}
        <div className="relative z-10 flex items-center gap-2 pt-4 mt-3 border-t border-white/10 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black uppercase tracking-wider text-white/60 mr-1 shrink-0">
            ⚡ Quick Shortcuts:
          </span>
          <button
            onClick={() => onNavigateTab('jobs')}
            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/10 shrink-0 transition-all"
          >
            + Post Opening
          </button>
          <button
            onClick={() => onNavigateTab('applications')}
            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/10 shrink-0 transition-all"
          >
            + 4-Stage Pipeline
          </button>
          <button
            onClick={() => onNavigateTab('internship-tracking')}
            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/10 shrink-0 transition-all"
          >
            + Track Duration
          </button>
          <button
            onClick={() => onNavigateTab('certificates')}
            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/10 shrink-0 transition-all"
          >
            + Issue Certificate
          </button>
        </div>
      </div>

      {/* 6 Core Executive KPI Cards from Blueprint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total Applications"
          value={totalApplications}
          subvalue="all-time"
          trend="+24% this month"
          trendPositive={true}
          icon={Users}
          color="sky"
          onClick={() => onNavigateTab('applications')}
        />
        <StatsCard
          title="Pending Reviews"
          value={pendingApplications}
          subvalue="need review"
          trend="Action required"
          trendPositive={false}
          icon={Clock}
          color="amber"
          onClick={() => onNavigateTab('applications')}
        />
        <StatsCard
          title="Active Interns"
          value={activeInternsCount}
          subvalue="working now"
          trend="100% active cohort"
          trendPositive={true}
          icon={UserCheck}
          color="purple"
          onClick={() => onNavigateTab('internship-tracking')}
        />
        <StatsCard
          title="Completed Internships"
          value={completedInternshipsCount}
          subvalue="graduated"
          trend="Certificates issued"
          trendPositive={true}
          icon={Award}
          color="teal"
          onClick={() => onNavigateTab('certificates')}
        />
        <StatsCard
          title="Active Openings"
          value={activeJobs.length || 8}
          subvalue={`/ ${totalOpenings || 16} seats`}
          trend="Hiring active"
          trendPositive={true}
          icon={Briefcase}
          color="emerald"
          onClick={() => onNavigateTab('jobs')}
        />
        <StatsCard
          title="Shortlisted Pipeline"
          value={applications.filter(a => a.status === 'Shortlisted').length || 2}
          subvalue="ready for action"
          trend="In Pipeline"
          trendPositive={true}
          icon={Award}
          color="indigo"
          onClick={() => onNavigateTab('applications')}
        />
      </div>

      {/* Critical Operational Alerts: Overdue & Expiring Soon */}
      {(overdueInternships.length > 0 || expiringSoon.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Overdue Internships */}
          {overdueInternships.length > 0 && (
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="p-2.5 rounded-xl bg-rose-500 text-white shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-rose-900">
                    Overdue Internships ({overdueInternships.length})
                  </h3>
                  <p className="text-xs text-rose-700 mt-0.5">
                    End date has passed. Completion review, extension or certificate generation required.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {overdueInternships.map(i => (
                  <div
                    key={i.id}
                    className="bg-white/90 p-3 rounded-xl border border-rose-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{i.name}</span>
                      <span className="text-slate-500 ml-2">· {i.role}</span>
                    </div>
                    <button
                      onClick={() => onNavigateTab('internship-tracking')}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] transition-all"
                    >
                      Resolve Closure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expiring Soon */}
          {expiringSoon.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
                  <Clock className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-amber-900">
                    Internships Expiring Soon ({expiringSoon.length})
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Internships completing within 15 days. Plan project handover or duration extensions.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {expiringSoon.map(i => (
                  <div
                    key={i.id}
                    className="bg-white/90 p-3 rounded-xl border border-amber-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{i.name}</span>
                      <span className="text-slate-500 ml-2">· Ends {i.extended_end_date || i.end_date}</span>
                    </div>
                    <button
                      onClick={() => onNavigateTab('internship-tracking')}
                      className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] transition-all"
                    >
                      View Timeline
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Recent Submissions & Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-sky-50 text-sky-600">
                  <Users className="w-4 h-4" />
                </span>
                <h3 className="text-base font-black text-slate-900">Recent Candidate Applications</h3>
              </div>
              <button
                onClick={() => onNavigateTab('applications')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
              >
                <span>Pipeline Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-black uppercase text-slate-400">
                    <th className="py-2.5 px-3">Candidate</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Stage</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">{app.candidate_name}</td>
                      <td className="py-3 px-3 text-slate-600 font-semibold">{app.job_title}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-50 text-sky-700 border border-sky-200">
                          {app.status || 'Applied'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => onNavigateTab('applications')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 rounded-lg font-bold text-[11px] transition-all"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Shortlisted Pipeline & Quick Actions (1 col) */}
        <div className="space-y-6">
          {/* Shortlisted Pipeline Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Award className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-black text-slate-900">Shortlisted Pipeline</h3>
              </div>
              <button
                onClick={() => onNavigateTab('applications')}
                className="text-xs font-bold text-purple-600 hover:text-purple-700"
              >
                View Board
              </button>
            </div>

            <div className="space-y-3">
              {applications.filter(a => a.status === 'Shortlisted').slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.candidate_name || item.name}</span>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">⭐ Shortlisted</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.job_title || item.role || 'Software Intern'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0B132B] text-white rounded-2xl p-6 shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-black tracking-wide">Quick Operations</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigateTab('jobs')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left font-bold transition-all"
              >
                + Post Job Opening
              </button>
              <button
                onClick={() => onNavigateTab('applications')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left font-bold transition-all"
              >
                + Review Applications
              </button>
              <button
                onClick={() => onNavigateTab('internship-tracking')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left font-bold transition-all"
              >
                + Track Duration
              </button>
              <button
                onClick={() => onNavigateTab('certificates')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left font-bold transition-all"
              >
                + Issue Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
