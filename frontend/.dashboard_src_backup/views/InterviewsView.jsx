import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Plus,
  Video,
  MapPin,
  Clock,
  Calendar,
  User,
  Star,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Edit2,
  ChevronRight,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function InterviewsView({
  interviews = [],
  candidates = [],
  onSaveInterview,
  onUpdateCandidateStage
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  // New Interview Form
  const [formData, setFormData] = useState({
    candidate_name: '',
    candidate_id: '',
    role: 'Full Stack Developer Intern',
    round: 'Technical Round 1 (DSA & System)',
    interviewer: 'Raju Kumar (Lead Architect)',
    date: new Date().toISOString().slice(0, 10),
    time: '03:00 PM',
    mode: 'Online (Google Meet)',
    meeting_link: 'https://meet.google.com/agnix-interview-live'
  });

  // Feedback Form
  const [evalData, setEvalData] = useState({
    rating: 5,
    feedback: '',
    result: 'Selected'
  });

  const filtered = interviews.filter(int => {
    const matchSearch =
      !searchTerm ||
      (int.candidate_name && int.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (int.role && int.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (int.interviewer && int.interviewer.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === 'ALL' || int.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleOpenSchedule = () => {
    setScheduleModalOpen(true);
  };

  const handleCreateInterview = (e) => {
    e.preventDefault();
    const newInt = {
      ...formData,
      status: 'Scheduled',
      rating: 0,
      feedback: '',
      result: 'Pending'
    };
    onSaveInterview(newInt);
    setScheduleModalOpen(false);
  };

  const handleOpenFeedback = (interview) => {
    setSelectedInterview(interview);
    setEvalData({
      rating: interview.rating || 5,
      feedback: interview.feedback || 'Strong conceptual foundation, clean code and great culture alignment.',
      result: interview.result || 'Selected'
    });
    setFeedbackModalOpen(true);
  };

  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    if (selectedInterview) {
      const updated = {
        ...selectedInterview,
        rating: evalData.rating,
        feedback: evalData.feedback,
        result: evalData.result,
        status: 'Completed'
      };
      onSaveInterview(updated);

      if (evalData.result === 'Selected' && onUpdateCandidateStage) {
        onUpdateCandidateStage(selectedInterview.candidate_id, 'Selected');
      }
      setFeedbackModalOpen(false);
    }
  };

  const scheduledCount = interviews.filter(i => i.status === 'Scheduled').length;
  const completedCount = interviews.filter(i => i.status === 'Completed').length;
  const selectedCount = interviews.filter(i => i.result === 'Selected').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Signature Executive Hero Banner */}
      <ExecutiveHeroBanner
        title="Interview Intelligence & Candidate Assessment Hub"
        icon="🎙️"
        badge="INTERVIEW MANAGER"
        metrics={[
          {
            label: "Total Interview Rounds",
            value: interviews.length,
            subtext: "Technical & HR Assessments",
            subtextColor: "text-emerald-300",
            icon: <CalendarCheck className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: true,
            onClick: () => setStatusFilter('ALL')
          },
          {
            label: "Scheduled This Week",
            value: scheduledCount,
            subtext: "Google Meet Slots Active",
            subtextColor: "text-purple-300",
            icon: <Clock className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500",
            onClick: () => setStatusFilter('Scheduled')
          },
          {
            label: "Completed Evaluations",
            value: completedCount,
            subtext: "Scored Ratings & Feedback",
            subtextColor: "text-sky-300",
            icon: <Star className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500",
            onClick: () => setStatusFilter('Completed')
          },
          {
            label: "Selected Candidates",
            value: selectedCount,
            subtext: "Recommended for Onboarding",
            subtextColor: "text-amber-300",
            icon: <Award className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500"
          }
        ]}
        filterTitle="QUICK FILTER SCHEDULED SESSIONS"
        activePill={statusFilter}
        onPillClick={setStatusFilter}
        pills={[
          { id: 'ALL', label: 'All Sessions', count: interviews.length, icon: '📋', badgeColor: 'bg-white/30 text-white' },
          { id: 'Scheduled', label: 'Upcoming Scheduled', count: scheduledCount, icon: '📅', badgeColor: 'bg-cyan-400 text-slate-900' },
          { id: 'Completed', label: 'Completed Reviews', count: completedCount, icon: '✅', badgeColor: 'bg-emerald-400 text-slate-900' }
        ]}
      />
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Interview Management</h2>
            <p className="text-xs text-slate-500 font-medium">
              Schedule evaluation rounds, log candidate feedback & score ratings
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenSchedule}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-md shadow-purple-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Interview</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by candidate name, interviewer, role..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-purple-500"
          >
            <option value="ALL">All Interviews ({interviews.length})</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Interviews Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-black tracking-wider uppercase text-slate-500">
                <th className="py-3.5 px-4">Candidate & Role</th>
                <th className="py-3.5 px-4">Interview Round</th>
                <th className="py-3.5 px-4">Interviewer</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Mode / Link</th>
                <th className="py-3.5 px-4">Result & Rating</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400 font-medium">
                    No scheduled interviews found matching criteria
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{item.candidate_name}</div>
                      <div className="text-[11px] text-slate-400">{item.role}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px] border border-purple-100">
                        {item.round}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{item.interviewer}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.date}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.meeting_link ? (
                        <a
                          href={item.meeting_link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Google Meet</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3 h-3" /> HQ Office
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.status === 'Completed' ? (
                        <div className="space-y-0.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                              item.result === 'Selected'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {item.result}
                          </span>
                          <div className="flex items-center text-amber-500 text-xs">
                            {Array.from({ length: item.rating || 5 }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
                          Scheduled
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenFeedback(item)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-purple-50 text-purple-700 rounded-lg font-bold text-xs transition-all border border-slate-200/60 hover:border-purple-200"
                      >
                        {item.status === 'Completed' ? 'View Evaluation' : 'Log Feedback'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateInterview}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <CalendarCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">Schedule Interview Round</h3>
                  <p className="text-xs text-slate-500">Book calendar slot & send invite link</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScheduleModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shakir Ali"
                  value={formData.candidate_name}
                  onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Internship Role</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Interview Round</label>
                <select
                  value={formData.round}
                  onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                >
                  <option value="Technical Round 1 (System & DB)">Technical Round 1</option>
                  <option value="Technical Round 2 (Live Coding)">Technical Round 2</option>
                  <option value="HR & Cultural Fit">HR & Cultural Fit</option>
                  <option value="Founder Final Round">Founder Final Round</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Interviewer</label>
                <select
                  value={formData.interviewer}
                  onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                >
                  <option value="Tejaswi Sen (Founder & CEO)">Tejaswi Sen (Founder & CEO)</option>
                  <option value="Shashank Shubham (Co-Founder & COO)">Shashank Shubham (Co-Founder & COO)</option>
                  <option value="Raju Kumar (Lead Architect)">Raju Kumar (Lead Architect)</option>
                  <option value="Shakir Ali (Cloud DevOps Lead)">Shakir Ali (Cloud DevOps Lead)</option>
                  <option value="Pooja Rathore (HR Lead)">Pooja Rathore (HR Lead)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Time</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 03:00 PM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mode</label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                >
                  <option value="Online (Google Meet)">Online (Google Meet)</option>
                  <option value="Offline (Ajmer HQ)">Offline (Ajmer HQ)</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Meeting Link or Room</label>
                <input
                  type="text"
                  value={formData.meeting_link}
                  onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setScheduleModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-md shadow-purple-500/20"
              >
                Confirm Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Log Feedback / Evaluation Modal */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEvaluation}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Star className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">Interview Evaluation</h3>
                  <p className="text-xs text-slate-500">{selectedInterview?.candidate_name} · {selectedInterview?.round}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Score Rating (1-5)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setEvalData({ ...evalData, rating: star })}
                      className="p-2 rounded-lg hover:bg-slate-100"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= evalData.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-black text-slate-800 ml-2">{evalData.rating} / 5</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Final Result</label>
                <select
                  value={evalData.result}
                  onChange={(e) => setEvalData({ ...evalData, result: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                >
                  <option value="Selected">Selected for Next Round / Offer</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Interviewer Feedback</label>
                <textarea
                  rows="4"
                  required
                  value={evalData.feedback}
                  onChange={(e) => setEvalData({ ...evalData, feedback: e.target.value })}
                  placeholder="Comment on code quality, problem solving, architecture depth, attitude..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setFeedbackModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-md shadow-purple-500/20"
              >
                Save Evaluation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

