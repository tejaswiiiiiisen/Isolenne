import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Save,
  ShieldAlert,
  ShieldCheck,
  UserX,
  UserCheck,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import { DataService } from '../services/dataService';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function CandidatesView({
  applications = [],
  jobs = [],
  onUpdateStatus,
  onUpdateNotes,
  selectedCandidate,
  setSelectedCandidate
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [blacklistFilter, setBlacklistFilter] = useState('ALL');
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeApp, setActiveApp] = useState(null);
  const [evalNotes, setEvalNotes] = useState('');
  const [previewResumeUrl, setPreviewResumeUrl] = useState(null);

  // Sync external selected candidate prop
  React.useEffect(() => {
    if (selectedCandidate) {
      setActiveApp(selectedCandidate);
      setEvalNotes(selectedCandidate.notes || '');
      setShowDrawer(true);
    }
  }, [selectedCandidate]);

  const stages = ['Applied', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Hired', 'Rejected'];

  const isCandidateBlacklisted = (email) => {
    try {
      return Boolean(DataService && typeof DataService.isBlacklisted === 'function' && email && DataService.isBlacklisted(email));
    } catch (e) {
      return false;
    }
  };

  const toggleCandidateBlacklist = (email, reason) => {
    try {
      if (DataService && typeof DataService.toggleBlacklist === 'function') {
        return DataService.toggleBlacklist(email, reason);
      }
    } catch (e) {}
    return [];
  };

  const filteredApplications = useMemo(() => {
    return (applications || []).filter((app) => {
      if (!app) return false;
      const candidateName = app.candidate_name || app.name || '';
      const email = app.email || '';
      const phone = app.phone || '';

      const matchSearch =
        !searchTerm ||
        candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm);

      const matchJob = jobFilter === 'ALL' || app.job_id === jobFilter;
      const matchStage = stageFilter === 'ALL' || (app.status || 'Applied') === stageFilter;

      const isBl = isCandidateBlacklisted(email);
      const matchBlacklist =
        blacklistFilter === 'ALL' ||
        (blacklistFilter === 'FLAGGED' && isBl) ||
        (blacklistFilter === 'CLEAN' && !isBl);

      return matchSearch && matchJob && matchStage && matchBlacklist;
    });
  }, [applications, searchTerm, jobFilter, stageFilter, blacklistFilter]);

  const handleOpenCandidate = (app) => {
    setActiveApp(app);
    setEvalNotes(app.notes || '');
    setShowDrawer(true);
  };

  const handleSaveNotes = async () => {
    if (!activeApp) return;
    await onUpdateNotes(activeApp.id, evalNotes);
    setActiveApp({ ...activeApp, notes: evalNotes });
    alert('Recruiter notes saved successfully!');
  };

  const handleStageChange = async (newStage) => {
    if (!activeApp) return;
    await onUpdateStatus(activeApp.id, newStage);
    setActiveApp({ ...activeApp, status: newStage });
  };

  const handleToggleBlacklist = () => {
    if (!activeApp?.email) return;
    const isBl = isCandidateBlacklisted(activeApp.email);
    if (isBl) {
      toggleCandidateBlacklist(activeApp.email);
      alert(`Removed ${activeApp.email} from blacklist.`);
    } else {
      const reason = prompt('Enter internal reason for blacklisting this applicant:', 'Repeated non-responsive or unqualified candidate');
      if (reason) {
        toggleCandidateBlacklist(activeApp.email, reason);
        alert(`Flagged ${activeApp.email} as blacklisted.`);
      }
    }
    // trigger re-render
    setActiveApp({ ...activeApp });
  };

  const exportCSV = () => {
    const headers = ['Candidate Name', 'Email', 'Phone', 'Applied Position', 'Experience', 'Location', 'Stage', 'Date Applied', 'Blacklisted', 'Notes'];
    const rows = filteredApplications.map(app => {
      const job = jobs.find(j => j.id === app.job_id);
      return [
        `"${app.candidate_name || app.name || ''}"`,
        `"${app.email || ''}"`,
        `"${app.phone || ''}"`,
        `"${job?.title || app.job_title || 'Open'}"`,
        `"${app.experience || ''}"`,
        `"${app.location || ''}"`,
        `"${app.status || 'Applied'}"`,
        `"${app.created_at || app.applied_date || ''}"`,
        `"${isCandidateBlacklisted(app.email) ? 'YES' : 'NO'}"`,
        `"${(app.notes || app.hr_remarks || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `agnix_candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;
  const underReviewCount = applications.filter(a => !a.status || a.status === 'Applied' || a.status === 'Under Review').length;
  const selectedCount = applications.filter(a => a.status === 'Selected' || a.status === 'Offer Accepted' || a.status === 'Joined').length;
  const flaggedCount = applications.filter(a => isCandidateBlacklisted(a.email)).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Signature Executive Hero Banner */}
      <ExecutiveHeroBanner
        title="Candidate Database & Talent Acquisition Pipeline"
        icon="👥"
        badge="TALENT ACQUISITION"
        metrics={[
          {
            label: "Total Applicants",
            value: applications.length,
            subtext: "Verified Project Portfolios",
            subtextColor: "text-emerald-300",
            icon: <Users className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: true,
            onClick: () => setStageFilter('ALL')
          },
          {
            label: "Shortlisted Candidates",
            value: shortlistedCount,
            subtext: "Ready for Technical Rounds",
            subtextColor: "text-purple-300",
            icon: <UserCheck className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500",
            onClick: () => setStageFilter('Shortlisted')
          },
          {
            label: "Pending Reviews",
            value: underReviewCount,
            subtext: "Screening Tasks Submitted",
            subtextColor: "text-sky-300",
            icon: <Clock className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500",
            onClick: () => setStageFilter('Applied')
          },
          {
            label: "Selected & Offers",
            value: selectedCount,
            subtext: "Hiring Offer Accepted",
            subtextColor: "text-amber-300",
            icon: <Award className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500",
            onClick: () => setStageFilter('Selected')
          }
        ]}
        filterTitle="QUICK FILTER APPLICANTS BY STATUS"
        activePill={stageFilter}
        onPillClick={(id) => {
          if (id === 'FLAGGED') {
            setBlacklistFilter('FLAGGED');
            setStageFilter('ALL');
          } else {
            setBlacklistFilter('ALL');
            setStageFilter(id);
          }
        }}
        pills={[
          { id: 'ALL', label: 'All Applicants', count: applications.length, icon: '📋', badgeColor: 'bg-white/30 text-white' },
          { id: 'Shortlisted', label: 'Shortlisted', count: shortlistedCount, icon: '⭐', badgeColor: 'bg-purple-300 text-purple-950' },
          { id: 'Applied', label: 'Under Review', count: underReviewCount, icon: '⏳', badgeColor: 'bg-cyan-400 text-slate-900' },
          { id: 'Selected', label: 'Selected', count: selectedCount, icon: '🏆', badgeColor: 'bg-emerald-400 text-slate-900' },
          { id: 'FLAGGED', label: 'Flagged / Blacklist', count: flaggedCount, icon: '🛡️', badgeColor: 'bg-rose-400 text-white' }
        ]}
      />
      {/* Control & Filter Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate, email, phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Job Filter */}
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="ALL">All Job Listings ({jobs.length})</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>

          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="ALL">All Stages</option>
            {stages.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Blacklist Filter */}
          <select
            value={blacklistFilter}
            onChange={(e) => setBlacklistFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="ALL">All Applicants</option>
            <option value="FLAGGED">Blacklist Flagged</option>
            <option value="CLEAN">Clean Applicants</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Candidates Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Candidate</th>
                <th className="py-4 px-6">Applied Role</th>
                <th className="py-4 px-4">Experience</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Stage</th>
                <th className="py-4 px-4">Resume</th>
                <th className="py-4 px-4">Applied Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center text-slate-400 italic font-medium">
                    No candidates match the specified filters.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => {
                  const job = jobs.find(j => j.id === app.job_id || j._id === app.job_id);
                  const isBl = isCandidateBlacklisted(app.email);

                  const stageStyles = {
                    Applied: 'bg-sky-50 text-sky-700 border-sky-200',
                    Shortlisted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                    'Interview Scheduled': 'bg-amber-50 text-amber-700 border-amber-200',
                    Selected: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    Hired: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    Rejected: 'bg-rose-50 text-rose-700 border-rose-200'
                  };

                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => handleOpenCandidate(app)}
                    >
                      {/* Candidate Name & Email */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-100 to-indigo-100 text-sky-700 font-black text-xs flex items-center justify-center shrink-0">
                            {app.candidate_name ? app.candidate_name.charAt(0).toUpperCase() : 'C'}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-900 truncate">
                                {app.candidate_name || 'Anonymous'}
                              </span>
                              {isBl && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-0.5">
                                  <ShieldAlert className="w-2.5 h-2.5" /> Flagged
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 block truncate">
                              {app.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Applied Role */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-800 block truncate max-w-xs">
                          {job?.title || 'Open Position'}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {job?.department || 'General'}
                        </span>
                      </td>

                      {/* Experience */}
                      <td className="py-4 px-4 font-bold text-slate-700">
                        {app.experience || 'Entry'}
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4 font-medium text-slate-600">
                        {app.location || 'Remote'}
                      </td>

                      {/* Recruitment Stage */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                          stageStyles[app.status] || 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}>
                          {app.status || 'Applied'}
                        </span>
                      </td>

                      {/* Resume link */}
                      <td className="py-4 px-4">
                        {app.resume_url ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewResumeUrl(app.resume_url);
                            }}
                            className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 font-bold text-xs flex items-center gap-1"
                            title="Preview PDF Resume"
                          >
                            <FileText className="w-4 h-4" />
                            PDF
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">None</span>
                        )}
                      </td>

                      {/* Applied Date */}
                      <td className="py-4 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                        {app.created_at ? new Date(app.created_at).toLocaleDateString() : 'N/A'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCandidate(app);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 font-bold text-xs transition-colors"
                        >
                          Review →
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Profile Drawer */}
      {showDrawer && activeApp && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setShowDrawer(false)}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col overflow-y-auto">
              {/* Drawer Header */}
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center font-black text-lg text-white">
                    {activeApp.candidate_name ? activeApp.candidate_name.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black tracking-tight">{activeApp.candidate_name || activeApp.name}</h3>
                      {isCandidateBlacklisted(activeApp.email) && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500 text-white">
                          Blacklisted
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      Applicant ID: {activeApp.id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-6 flex-1">
                {/* Stage Selector */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                    Recruitment Stage Pipeline
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {stages.map((stg) => (
                      <button
                        key={stg}
                        onClick={() => handleStageChange(stg)}
                        className={`py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                          (activeApp.status || 'Applied') === stg
                            ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {stg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Candidate Overview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Candidate Profile & Contact Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Email</span>
                      <a href={`mailto:${activeApp.email}`} className="font-bold text-slate-800 hover:text-sky-600 truncate block">
                        {activeApp.email}
                      </a>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Phone</span>
                      <a href={`tel:${activeApp.phone}`} className="font-bold text-slate-800 hover:text-sky-600 block">
                        {activeApp.phone || 'N/A'}
                      </a>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Location</span>
                      <span className="font-bold text-slate-800">{activeApp.location || 'Remote'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Experience</span>
                      <span className="font-bold text-slate-800">{activeApp.experience || 'Entry'}</span>
                    </div>
                  </div>
                </div>

                {/* Cover Letter / Pitch */}
                {activeApp.cover_letter && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Cover Letter / Candidate Pitch
                    </h4>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                      {activeApp.cover_letter}
                    </div>
                  </div>
                )}

                {/* Links */}
                {(activeApp.linkedin_url || activeApp.portfolio_url) && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      External Profiles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeApp.linkedin_url && (
                        <a
                          href={activeApp.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 text-sky-700 rounded-xl font-bold text-xs hover:bg-sky-100 border border-sky-200"
                        >
                          LinkedIn Profile <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {activeApp.portfolio_url && (
                        <a
                          href={activeApp.portfolio_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 border border-slate-200"
                        >
                          Portfolio / Website <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Resume Action */}
                {activeApp.resume_url && (
                  <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl border border-sky-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-sky-600" />
                      <div>
                        <span className="text-xs font-black text-slate-900 block">Candidate PDF Resume</span>
                        <span className="text-[10px] text-slate-500">Verified Supabase Storage Document</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewResumeUrl(activeApp.resume_url)}
                        className="px-3 py-1.5 bg-white text-sky-600 border border-sky-200 rounded-xl font-bold text-xs hover:bg-sky-50"
                      >
                        Preview
                      </button>
                      <a
                        href={activeApp.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="px-3 py-1.5 bg-sky-600 text-white rounded-xl font-bold text-xs hover:bg-sky-700"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                )}

                {/* Recruiter Evaluation Notes */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Recruiter Feedback & Evaluation Notes
                    </h4>
                    <span className="text-[10px] text-slate-400">Persisted in database</span>
                  </div>
                  <textarea
                    rows={4}
                    value={evalNotes}
                    onChange={(e) => setEvalNotes(e.target.value)}
                    placeholder="Enter interview notes, coding test score, background check status..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-xs shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Recruiter Notes
                    </button>
                  </div>
                </div>

                {/* Blacklist Management */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">Blacklist Warning Control</span>
                    <span className="text-[11px] text-slate-500">
                      Flagging marks applicant for internal review without blocking submissions.
                    </span>
                  </div>
                  <button
                    onClick={handleToggleBlacklist}
                    className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 ${
                      isCandidateBlacklisted(activeApp.email)
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    }`}
                  >
                    {isCandidateBlacklisted(activeApp.email) ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        Remove Blacklist
                      </>
                    ) : (
                      <>
                        <UserX className="w-3.5 h-3.5" />
                        Flag on Blacklist
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Resume Preview Modal */}
      {previewResumeUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                Resume Document Preview
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={previewResumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold"
                >
                  Open in New Tab
                </a>
                <button
                  onClick={() => setPreviewResumeUrl(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <iframe
              src={previewResumeUrl}
              title="Resume Preview"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

