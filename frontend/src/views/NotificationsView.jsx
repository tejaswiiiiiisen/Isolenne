import React, { useState } from 'react';
import {
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle2,
  UserCheck,
  Mail,
  Award,
  Trash2,
  CheckCheck
} from 'lucide-react';

export default function NotificationsView({
  interns = [],
  leads = [],
  onNavigateTab
}) {
  const [filter, setFilter] = useState('ALL');

  // Compute live system alerts
  const overdueInterns = interns.filter(i => {
    const end = new Date(i.extended_end_date || i.end_date);
    return new Date() > end && i.status !== 'Completed';
  });

  const expiringInterns = interns.filter(i => {
    const end = new Date(i.extended_end_date || i.end_date);
    const diffDays = Math.ceil((end.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return diffDays > 0 && diffDays <= 15 && i.status === 'Active';
  });

  const newLeads = leads.filter(l => l.status === 'New');

  const alerts = [
    ...overdueInterns.map(i => ({
      id: `overdue-${i.id}`,
      type: 'overdue',
      title: 'Internship Overdue for Completion',
      desc: `${i.name} (${i.role}) completed their scheduled timeline. Closure or extension required.`,
      time: 'Immediate Action Needed',
      badge: 'URGENT',
      tab: 'internship-tracking'
    })),
    ...expiringInterns.map(i => ({
      id: `expiring-${i.id}`,
      type: 'expiring',
      title: 'Internship Expiring Soon (Next 15 Days)',
      desc: `${i.name} has less than 15 days remaining in their current tenure.`,
      time: 'Upcoming Review',
      badge: 'SCHEDULE',
      tab: 'internship-tracking'
    })),
    ...newLeads.map(l => ({
      id: `lead-${l.id}`,
      type: 'lead',
      title: 'New Client Enquiry Received',
      desc: `${l.name} from ${l.company || 'Enterprise'} sent a request: "${l.subject}"`,
      time: 'New Lead',
      badge: 'CLIENT',
      tab: 'leads'
    }))
  ];

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'ALL') return true;
    return a.type === filter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">System Notifications & Operational Alerts</h2>
            <p className="text-xs text-slate-500 font-medium">
              Real-time reminders for overdue internships, timeline completions, leave requests & incoming leads
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium text-xs">
            No active alerts or notifications at this time
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl mt-0.5 ${
                    alert.type === 'overdue'
                      ? 'bg-rose-50 text-rose-600'
                      : alert.type === 'expiring'
                      ? 'bg-amber-50 text-amber-600'
                      : alert.type === 'leave'
                      ? 'bg-purple-50 text-purple-600'
                      : 'bg-sky-50 text-sky-600'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-slate-900">{alert.title}</h4>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider ${
                        alert.type === 'overdue'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {alert.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{alert.desc}</p>
                  <span className="text-[11px] font-semibold text-slate-400 block pt-1">{alert.time}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab && onNavigateTab(alert.tab)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all shrink-0"
              >
                Inspect
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

