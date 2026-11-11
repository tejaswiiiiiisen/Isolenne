import React from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileCheck2,
  CalendarCheck,
  TrendingUp,
  UserCheck,
  Clock,
  CheckSquare,
  FileSpreadsheet,
  Award,
  MessageSquareQuote,
  Mail,
  Calendar,
  Bell,
  Download,
  Settings,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, counts, isMobileOpen, setIsMobileOpen }) {
  const menuGroups = [
    {
      group: "01 · MAIN",
      items: [
        { id: "overview", label: "Overview", icon: LayoutDashboard }
      ]
    },
    {
      group: "02 · RECRUITMENT",
      items: [
        { id: "candidates", label: "Candidates", icon: Users, badge: counts?.candidates || 0, badgeColor: "bg-sky-500" },
        { id: "jobs", label: "Jobs Manager", icon: Briefcase, badge: counts?.activeJobs || 0, badgeColor: "bg-emerald-500" },
        { id: "applications", label: "Applications", icon: FileCheck2, badge: counts?.applications || 0, badgeColor: "bg-indigo-500" },
        { id: "interviews", label: "Interview Management", icon: CalendarCheck, badge: counts?.upcomingInterviews || 0, badgeColor: "bg-amber-500" },
        { id: "analytics", label: "Recruitment Analytics", icon: TrendingUp }
      ]
    },
    {
      group: "03 · INTERNSHIP MANAGEMENT",
      items: [
        { id: "selected-interns", label: "Selected Interns", icon: UserCheck, badge: counts?.interns || 0, badgeColor: "bg-purple-500" },
        { id: "internship-tracking", label: "Internship Tracking", icon: Clock, badge: counts?.overdueInterns ? `${counts.overdueInterns} Overdue` : null, badgeColor: "bg-rose-500" },
        { id: "certificates", label: "Certificates", icon: Award, badge: counts?.certificates || 0, badgeColor: "bg-teal-500" },
        { id: "feedback", label: "Feedback & Evaluation", icon: MessageSquareQuote }
      ]
    },
    {
      group: "04 · BUSINESS",
      items: [
        { id: "leads", label: "Leads & Enquiries", icon: Mail, badge: counts?.leads || 0, badgeColor: "bg-cyan-500" },
        { id: "events", label: "Events & Media", icon: Calendar }
      ]
    },
    {
      group: "05 · SYSTEM",
      items: [
        { id: "notifications", label: "Notifications", icon: Bell, badge: counts?.alerts || null, badgeColor: "bg-rose-500" },
        { id: "reports", label: "Reports & Exports", icon: Download },
        { id: "settings", label: "Settings & Config", icon: Settings }
      ]
    }
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B132B] text-slate-300 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80 bg-[#090F22]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-black text-xl tracking-wider">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white">SkilloraPath</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  Admin
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Internship & HRMS Portal</p>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {menuGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                {grp.group}
              </div>
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold shadow-md shadow-sky-500/25'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== null && item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : `${item.badgeColor || 'bg-slate-800'} text-white`
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-slate-800/80 bg-[#090F22]/60">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 font-bold text-xs">
                TS
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">Tejaswi Sen</span>
                <span className="text-[10px] text-slate-400 leading-tight">Super Administrator</span>
              </div>
            </div>
            <div className="p-1.5 rounded-lg text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
