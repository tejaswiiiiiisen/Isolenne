import React, { useState, useMemo } from 'react';
import {
  Clock,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  UserCheck,
  Award,
  ChevronRight,
  TrendingUp,
  X,
  Plus,
  RefreshCw,
  Send,
  Building,
  GraduationCap,
  ExternalLink,
  Users
} from 'lucide-react';
import { DataService } from '../services/dataService';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function InternshipTrackingView({
  interns = [],
  onSaveIntern,
  onGenerateCertificate
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Extension Form State
  const [extensionData, setExtensionData] = useState({
    extended_end_date: '',
    extension_reason: 'Performance-based project expansion to advanced research sprint.',
    approved_by: 'Tejaswi Sen (Founder & CEO)'
  });

  // Completion Form State
  const [completionData, setCompletionData] = useState({
    final_rating: 5,
    final_feedback: 'Exceeded all project delivery expectations. Ready for full-time conversion.',
    project_submission: 'https://github.com/skillorapath/completed-cohort-2026'
  });

  // Filtered interns with computed metrics
  const trackedInterns = useMemo(() => {
    return interns.map((intern) => {
      const metrics = DataService.calculateProgress(intern);
      return {
        ...intern,
        ...metrics
      };
    }).filter((intern) => {
      const matchSearch =
        !searchTerm ||
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.intern_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (intern.mentor && intern.mentor.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus =
        statusFilter === 'ALL' ||
        intern.computedStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [interns, searchTerm, statusFilter]);

  const handleOpenExtend = (intern) => {
    setSelectedIntern(intern);
    const end = new Date(intern.extended_end_date || intern.end_date);
    end.setMonth(end.getMonth() + 2); // Default add 2 months
    setExtensionData({
      extended_end_date: end.toISOString().slice(0, 10),
      extension_reason: 'High-performing intern extended for enterprise client project deliverable.',
      approved_by: 'Tejaswi Sen (Founder & CEO)'
    });
    setShowExtensionModal(true);
  };

  const handleSaveExtension = async (e) => {
    e.preventDefault();
    if (!selectedIntern) return;
    const updated = {
      ...selectedIntern,
      status: 'Extended',
      extended_end_date: extensionData.extended_end_date,
      extension_reason: extensionData.extension_reason
    };
    await onSaveIntern(updated);
    setShowExtensionModal(false);
    alert(`Internship for ${selectedIntern.name} extended to ${extensionData.extended_end_date}!`);
  };

  const handleOpenComplete = (intern) => {
    setSelectedIntern(intern);
    setShowCompletionModal(true);
  };

  const handleApproveCompletion = async (e) => {
    e.preventDefault();
    if (!selectedIntern) return;
    const updated = {
      ...selectedIntern,
      status: 'Completed',
      certificate_status: 'Generated',
      performance_rating: completionData.final_rating
    };
    await onSaveIntern(updated);
    if (onGenerateCertificate) {
      await onGenerateCertificate({
        name: selectedIntern.name,
        role: selectedIntern.role,
        start_date: selectedIntern.start_date,
        end_date: selectedIntern.extended_end_date || selectedIntern.end_date,
        total_duration: `${selectedIntern.duration_months} Months`
      });
    }
    setShowCompletionModal(false);
    alert(`Internship marked Completed and Certificate Generated for ${selectedIntern.name}!`);
  };

  const statusPills = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Near Completion': 'bg-amber-50 text-amber-700 border-amber-200',
    Overdue: 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse',
    Completed: 'bg-sky-50 text-sky-700 border-sky-200',
    Extended: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Not Started': 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const activeCount = interns.filter(i => i.status === 'Active' || i.status === 'Near Completion' || i.status === 'Extended').length;
  const nearCompCount = trackedInterns.filter(i => i.computedStatus === 'Near Completion').length;
  const overdueCount = trackedInterns.filter(i => i.computedStatus === 'Overdue').length;
  const completedCount = interns.filter(i => i.status === 'Completed').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Thin Horizontal Executive Banner */}
      <ExecutiveHeroBanner
        title="Internship Duration & Progress Tracker (Live Cohort)"
        icon="⏱️"
        badge="TIMELINE CONTROLLER"
        metrics={[
          {
            label: "Total Tracked Cohort",
            value: `${interns.length} Interns`,
            subtext: "Live Lifecycle Metrics",
            subtextColor: "text-emerald-300",
            icon: <Users className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: statusFilter === 'ALL',
            onClick: () => setStatusFilter('ALL')
          },
          {
            label: "Currently Active",
            value: `${activeCount} Active`,
            subtext: "Working on Live Sprints",
            subtextColor: "text-purple-300",
            icon: <UserCheck className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500",
            highlight: statusFilter === 'Active',
            onClick: () => setStatusFilter('Active')
          },
          {
            label: "Near Completion",
            value: `${nearCompCount} Interns`,
            subtext: "≤15 Days Remaining",
            subtextColor: "text-amber-300",
            icon: <Clock className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500",
            highlight: statusFilter === 'Near Completion',
            onClick: () => setStatusFilter('Near Completion')
          },
          {
            label: "Overdue Closure",
            value: `${overdueCount} Overdue`,
            subtext: "End Date Crossed",
            subtextColor: "text-rose-300",
            icon: <AlertTriangle className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-rose-500 to-pink-500",
            highlight: statusFilter === 'Overdue',
            onClick: () => setStatusFilter('Overdue')
          }
        ]}
        filterTitle="QUICK FILTER BY COHORT LIFECYCLE"
        activePill={statusFilter}
        onPillClick={setStatusFilter}
        pills={[
          { id: 'ALL', label: 'All Interns', count: interns.length, icon: '🎓' },
          { id: 'Active', label: 'Active', count: activeCount, icon: '🟢' },
          { id: 'Near Completion', label: 'Ending Soon', count: nearCompCount, icon: '⏳' },
          { id: 'Overdue', label: 'Overdue', count: overdueCount, icon: '⚠️' },
          { id: 'Completed', label: 'Completed', count: completedCount, icon: '🏆' }
        ]}
      />

      {/* Control Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search intern name, ID, mentor, role..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Intern Statuses</option>
            <option value="Active">Active</option>
            <option value="Near Completion">Near Completion</option>
            <option value="Overdue">Overdue / Closure Pending</option>
            <option value="Completed">Completed</option>
            <option value="Extended">Extended</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Primary Multi-Intern Tracker Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Intern Details</th>
                <th className="py-4 px-4">Internship Timeline</th>
                <th className="py-4 px-4">Duration</th>
                <th className="py-4 px-4">Completed</th>
                <th className="py-4 px-4">Remaining</th>
                <th className="py-4 px-6">Overall Progress</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Certificate</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trackedInterns.map((intern) => (
                <tr key={intern.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Intern Details */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        {intern.profile_picture ? (
                          <img src={intern.profile_picture} alt={intern.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-black text-sky-600 bg-sky-50">
                            {intern.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-black text-slate-900 block truncate">{intern.name}</span>
                        <span className="text-[11px] text-slate-500 block truncate">{intern.role}</span>
                        <span className="text-[10px] font-mono font-bold text-sky-600">{intern.intern_id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Start & End Date */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <span className="text-slate-800 font-bold block">
                        {new Date(intern.start_date).toLocaleDateString()}
                      </span>
                      <span className="text-slate-400 text-[10px] block">to</span>
                      <span className={`font-bold block ${intern.extended_end_date ? 'text-indigo-600' : 'text-slate-800'}`}>
                        {new Date(intern.extended_end_date || intern.end_date).toLocaleDateString()}
                        {intern.extended_end_date && ' (Ext)'}
                      </span>
                    </div>
                  </td>

                  {/* Total Duration */}
                  <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {intern.duration_months} Months
                  </td>

                  {/* Time Completed */}
                  <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {intern.completedStr}
                  </td>

                  {/* Time Remaining */}
                  <td className="py-4 px-4 font-bold whitespace-nowrap">
                    {intern.computedStatus === 'Completed' ? (
                      <span className="text-emerald-600 font-black">Completed</span>
                    ) : intern.computedStatus === 'Overdue' ? (
                      <span className="text-rose-600 font-black">0 days (Overdue)</span>
                    ) : (
                      <span className="text-slate-800">{intern.remainingStr}</span>
                    )}
                  </td>

                  {/* Overall Progress Bar */}
                  <td className="py-4 px-6 min-w-[140px]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-black">
                        <span className="text-slate-700">{intern.progressPct}%</span>
                        <span className="text-[10px] text-slate-400">{intern.daysCompleted}/{intern.totalDays}d</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            intern.computedStatus === 'Completed' ? 'bg-sky-500' :
                            intern.computedStatus === 'Overdue' ? 'bg-rose-500' :
                            intern.computedStatus === 'Near Completion' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${intern.progressPct}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
                      statusPills[intern.computedStatus] || 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {intern.computedStatus}
                    </span>
                  </td>

                  {/* Certificate Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      intern.certificate_status === 'Issued' ? 'bg-emerald-100 text-emerald-800' :
                      intern.certificate_status === 'Generated' ? 'bg-sky-100 text-sky-800' :
                      intern.certificate_status === 'Eligible' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {intern.certificate_status || 'Pending'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {intern.computedStatus !== 'Completed' && (
                        <button
                          onClick={() => handleOpenComplete(intern)}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-bold text-[11px] border border-emerald-200"
                        >
                          Complete & Certify
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenExtend(intern)}
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-bold text-[11px] border border-indigo-200"
                      >
                        Extend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extension Modal */}
      {showExtensionModal && selectedIntern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-black tracking-tight">Extend Internship Duration</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedIntern.name} • {selectedIntern.intern_id}</p>
              </div>
              <button onClick={() => setShowExtensionModal(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExtension} className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Original Start Date:</span>
                  <span className="font-bold text-slate-900">{selectedIntern.start_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Original End Date:</span>
                  <span className="font-bold text-slate-900">{selectedIntern.end_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Original Duration:</span>
                  <span className="font-bold text-slate-900">{selectedIntern.duration_months} Months</span>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  New Extended End Date *
                </label>
                <input
                  type="date"
                  required
                  value={extensionData.extended_end_date}
                  onChange={(e) => setExtensionData({ ...extensionData, extended_end_date: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Extension Reason *
                </label>
                <textarea
                  rows={3}
                  required
                  value={extensionData.extension_reason}
                  onChange={(e) => setExtensionData({ ...extensionData, extension_reason: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowExtensionModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Approve Extension
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Completion & Certificate Modal */}
      {showCompletionModal && selectedIntern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-black tracking-tight">Approve Internship Completion</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedIntern.name} • {selectedIntern.intern_id}</p>
              </div>
              <button onClick={() => setShowCompletionModal(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApproveCompletion} className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2 text-emerald-900">
                <div className="flex justify-between font-bold">
                  <span>Attendance Record:</span>
                  <span>{selectedIntern.attendance_pct || 95}% Present</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Duration Served:</span>
                  <span>{selectedIntern.duration_months} Months</span>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Final Performance Rating (out of 5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={completionData.final_rating}
                  onChange={(e) => setCompletionData({ ...completionData, final_rating: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Mentor Recommendation / Evaluation
                </label>
                <textarea
                  rows={3}
                  value={completionData.final_feedback}
                  onChange={(e) => setCompletionData({ ...completionData, final_feedback: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Final Project Submission Link
                </label>
                <input
                  type="url"
                  value={completionData.project_submission}
                  onChange={(e) => setCompletionData({ ...completionData, project_submission: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCompletionModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Approve & Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

