import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  ChevronDown,
  User,
  Briefcase,
  Users,
  DollarSign,
  ExternalLink,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Topbar({
  activeTab,
  onOpenMobile,
  notifications = [],
  onQuickAction,
  globalSearch,
  setGlobalSearch,
  onNotificationClick
}) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return { title: 'Executive Overview', desc: 'Real-time company health, KPIs & recruitment pipeline' };
      case 'candidates': return { title: 'Candidate Database', desc: 'Review, evaluate, search & resume download' };
      case 'jobs': return { title: 'Jobs Manager', desc: 'Live job listings, openings & vacancy allocation' };
      case 'applications': return { title: 'Applications Pipeline', desc: 'Stage tracking, advance applicants & issue offers' };
      case 'interviews': return { title: 'Interview Management', desc: 'Schedule rounds, log feedback ratings & results' };
      case 'analytics': return { title: 'Recruitment Analytics', desc: 'Inflow velocity, recruitment funnel & department metrics' };
      case 'selected-interns': return { title: 'Selected Interns Directory', desc: 'Active student cohort, mentor allocations & stipends' };
      case 'internship-tracking': return { title: 'Internship Duration & Progress Tracker', desc: 'Real-time elapsed days, remaining time, extensions & completion closure' };
      case 'certificates': return { title: 'Certificates & Credentials', desc: 'Issue, verify & export official completion certificates' };
      case 'feedback': return { title: '360° Feedback & Evaluation', desc: 'Mentor appraisals & intern self-evaluations' };
      case 'employees': return { title: 'Team & Employee Directory', desc: 'Core leadership & engineering workforce registry' };
      case 'documents': return { title: 'Document Compliance', desc: 'Employee verification, contracts & KYC completeness' };
      case 'leads': return { title: 'Leads & Enquiries', desc: 'Public website contact requests & client project inquiries' };
      case 'finance': return { title: 'Finance Ledger & Expenses', desc: 'Recorded company expenses, bills & invoice archives' };
      case 'events': return { title: 'Events & Media Gallery', desc: 'Company milestones, meetups & culture photos' };
      case 'notifications': return { title: 'System Notifications & Alerts', desc: 'Operational countdowns & urgent action items' };
      case 'reports': return { title: 'Reports & CSV Exports', desc: 'Export complete datasets for audit & HR compliance' };
      case 'settings': return { title: 'Admin Settings & Configuration', desc: 'Custom roles, departments & security controls' };
      default: return { title: 'AgniX Management Portal', desc: 'Enterprise Company & Internship System' };
    }
  };

  const { title, desc } = getTitle();

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobile}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            {title}
          </h1>
          <p className="text-[11px] sm:text-xs font-medium text-slate-600 hidden sm:block">
            {desc}
          </p>
        </div>
      </div>

      {/* Right: Search, Quick Add, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Global Search */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search candidates, jobs, staff..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="relative">
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-sm shadow-sky-500/25 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {showQuickMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowQuickMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => { setShowQuickMenu(false); onQuickAction('add-job'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-sky-500" />
                  Post New Job
                </button>
                <button
                  onClick={() => { setShowQuickMenu(false); onQuickAction('add-employee'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                >
                  <Users className="w-4 h-4 text-indigo-500" />
                  Add Employee
                </button>
                <button
                  onClick={() => { setShowQuickMenu(false); onQuickAction('add-bill'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                >
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  Record Expense Bill
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center ring-2 ring-white animate-pulse">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifs && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifs(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                      Operational Alerts
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700">
                      {notifications.length} Active
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">Real-time</span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 py-2">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-600">
                      No pending operational alerts
                    </div>
                  ) : (
                    notifications.map((n, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setShowNotifs(false);
                          if (onNotificationClick) onNotificationClick(n);
                        }}
                        className="py-2.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3"
                      >
                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          n.type === 'candidate' ? 'bg-sky-100 text-sky-600' :
                          n.type === 'lead' ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {n.type === 'candidate' ? <Users className="w-4 h-4" /> :
                           <Clock className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 leading-snug">{n.title}</p>
                          <p className="text-[11px] text-slate-600 truncate mt-0.5">{n.desc}</p>
                          <span className="text-[10px] text-slate-600 font-medium">{n.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-sm">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-extrabold text-xs">
              TS
            </div>
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-xs font-extrabold text-slate-900 leading-tight">Tejaswi Sen</span>
            <span className="text-[10px] text-slate-600 font-medium leading-tight">CEO & Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

