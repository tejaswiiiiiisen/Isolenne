import React, { useState } from 'react';
import {
  FileCheck2,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  Building,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Send,
  Download,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  X,
  BellRing,
  Award,
  Star
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

const PIPELINE_STAGES = [
  {
    id: 'Applied',
    label: 'Applied',
    stepNumber: '01',
    icon: '📩',
    category: 'STAGE 1 · NEW APPLICANTS',
    accentGlow: 'from-sky-500/20 to-blue-500/20',
    borderAccent: 'border-sky-500/30',
    badgeText: 'text-sky-400',
    rating: '4.8',
    desc: 'Candidate applications submitted through SkilloraPath Careers'
  },
  {
    id: 'Shortlisted',
    label: 'Shortlisted',
    stepNumber: '02',
    icon: '⭐',
    category: 'STAGE 2 · SHORTLISTED PROFILES',
    accentGlow: 'from-amber-500/20 to-orange-500/20',
    borderAccent: 'border-amber-500/30',
    badgeText: 'text-amber-400',
    rating: '4.9',
    desc: 'Shortlisted candidates prepared for technical assessment round'
  },
  {
    id: 'Interview',
    label: 'Interview',
    stepNumber: '03',
    icon: '🎙️',
    category: 'STAGE 3 · TECHNICAL ASSESSMENT',
    accentGlow: 'from-cyan-500/20 to-sky-500/20',
    borderAccent: 'border-cyan-500/30',
    badgeText: 'text-cyan-400',
    rating: '4.7',
    desc: 'Candidates in technical round & Google Meet interview stage'
  },
  {
    id: 'Selected',
    label: 'Selected',
    stepNumber: '04',
    icon: '🏆',
    category: 'STAGE 4 · OFFER & ONBOARDING',
    accentGlow: 'from-emerald-500/20 to-teal-500/20',
    borderAccent: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    rating: '5.0',
    desc: 'Final selected candidates & accepted internship cohort'
  }
];

export default function ApplicationsView({
  applications = [],
  onUpdateStatus,
  onNavigateTab
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStagePill, setActiveStagePill] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [emailNotification, setEmailNotification] = useState(null);

  // New Applicant Form
  const [newApplicant, setNewApplicant] = useState({
    candidate_name: '',
    email: '',
    phone: '+91 98290 11223',
    job_title: 'Full Stack Developer Intern',
    department: 'Engineering',
    college: 'Govt Engineering College, Ajmer',
    qualification: 'B.Tech CS',
    skills: 'React, Node.js, JavaScript',
    resume_url: 'https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf',
    hr_remarks: 'Applied through SkilloraPath website careers portal.'
  });

  // Normalize stages to match exactly 4: Applied, Shortlisted, Interview, Selected
  const normalizeStatus = (status) => {
    if (!status) return 'Applied';
    const s = status.toLowerCase();
    if (s.includes('interview')) return 'Interview';
    if (s.includes('shortlist')) return 'Shortlisted';
    if (s.includes('select') || s.includes('joined') || s.includes('offer')) return 'Selected';
    if (s.includes('review')) return 'Applied';
    return 'Applied';
  };

  const normalizedApps = applications.map(app => ({
    ...app,
    stage: normalizeStatus(app.status)
  }));

  // Counts for the 4 stages
  const countApplied = normalizedApps.filter(a => a.stage === 'Applied').length;
  const countShortlisted = normalizedApps.filter(a => a.stage === 'Shortlisted').length;
  const countInterview = normalizedApps.filter(a => a.stage === 'Interview').length;
  const countSelected = normalizedApps.filter(a => a.stage === 'Selected').length;

  const filteredApps = normalizedApps.filter(app => {
    const name = app.candidate_name || app.name || '';
    const email = app.email || '';
    const role = app.job_title || app.applied_for || '';

    const matchSearch =
      !searchTerm ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStage = activeStagePill === 'ALL' || app.stage === activeStagePill;
    return matchSearch && matchStage;
  });

  // Stage progression flow: Applied -> Shortlisted -> Interview -> Selected
  const getNextStageInfo = (currentStage) => {
    switch (currentStage) {
      case 'Applied':
        return {
          nextStage: 'Shortlisted',
          label: 'Shortlist Candidate',
          emailSubject: 'Congratulations! You are Shortlisted at SkilloraPath',
          emailBody: 'Congratulations! Your profile has been reviewed and shortlisted for the technical evaluation round.'
        };
      case 'Shortlisted':
        return {
          nextStage: 'Interview',
          label: 'Schedule Interview',
          emailSubject: 'Interview Scheduled - SkilloraPath Technologies',
          emailBody: 'Your technical interview has been scheduled. Please check your calendar for the Google Meet link.'
        };
      case 'Interview':
        return {
          nextStage: 'Selected',
          label: 'Select & Generate Offer',
          emailSubject: 'Congratulations! You are Selected at SkilloraPath',
          emailBody: 'We are thrilled to inform you that you have been selected for the internship cohort at SkilloraPath!'
        };
      default:
        return null;
    }
  };

  // ADVANCE CANDIDATE & TRIGGER EMAIL NOTIFICATION
  const handleAdvanceStage = (app) => {
    const stageInfo = getNextStageInfo(app.stage);
    if (!stageInfo) return;

    // 1. Update status
    onUpdateStatus(app.id, stageInfo.nextStage);

    // 2. Dispatch live animated email toast
    setEmailNotification({
      recipientName: app.candidate_name || app.name || 'Candidate',
      recipientEmail: app.email || 'candidate@example.com',
      role: app.job_title || app.applied_for || 'Internship Role',
      newStage: stageInfo.nextStage,
      subject: stageInfo.emailSubject,
      body: stageInfo.emailBody,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });

    // Auto-dismiss after 6 seconds
    setTimeout(() => {
      setEmailNotification(null);
    }, 6000);
  };

  // REVERT STAGE (if admin wants to move back)
  const handleRevertStage = (app) => {
    const stageOrder = ['Applied', 'Shortlisted', 'Interview', 'Selected'];
    const idx = stageOrder.indexOf(app.stage);
    if (idx > 0) {
      const prev = stageOrder[idx - 1];
      onUpdateStatus(app.id, prev);
    }
  };

  // OPEN DETAILS MODAL
  const handleOpenDetails = (app) => {
    setSelectedApp(app);
    setShowDetailModal(true);
  };

  // ADD NEW APPLICANT DIRECTLY INTO 'Applied'
  const handleCreateApplicant = (e) => {
    e.preventDefault();
    const createdApp = {
      id: `app_${Date.now()}`,
      candidate_id: `cand_${Date.now()}`,
      candidate_name: newApplicant.candidate_name,
      name: newApplicant.candidate_name,
      email: newApplicant.email,
      phone: newApplicant.phone,
      job_title: newApplicant.job_title,
      applied_for: newApplicant.job_title,
      department: newApplicant.department,
      applied_date: new Date().toISOString().slice(0, 10),
      status: 'Applied',
      college: newApplicant.college,
      qualification: newApplicant.qualification,
      skills: newApplicant.skills,
      resume_url: newApplicant.resume_url,
      hr_remarks: newApplicant.hr_remarks
    };

    onUpdateStatus(createdApp.id, 'Applied', createdApp);
    setShowAddModal(false);
    setNewApplicant({
      candidate_name: '',
      email: '',
      phone: '+91 98290 11223',
      job_title: 'Full Stack Developer Intern',
      department: 'Engineering',
      college: 'Govt Engineering College, Ajmer',
      qualification: 'B.Tech CS',
      skills: 'React, Node.js, JavaScript',
      resume_url: 'https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf',
      hr_remarks: 'Applied through SkilloraPath website careers portal.'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Thin Horizontal Executive Banner */}
      <ExecutiveHeroBanner
        title="Application Pipeline (4 Dedicated Stages)"
        icon="📋"
        badge="WORKFLOW PIPELINE"
        metrics={[
          {
            label: "1. Applied",
            value: `${countApplied} Applicants`,
            subtext: "Incoming Screening",
            subtextColor: "text-slate-300",
            icon: <FileCheck2 className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-slate-600 to-slate-800",
            highlight: activeStagePill === 'Applied',
            onClick: () => setActiveStagePill('Applied')
          },
          {
            label: "2. Shortlisted",
            value: `${countShortlisted} Shortlisted`,
            subtext: "Technical Review Ready",
            subtextColor: "text-amber-300",
            icon: <Sparkles className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500",
            highlight: activeStagePill === 'Shortlisted',
            onClick: () => setActiveStagePill('Shortlisted')
          },
          {
            label: "3. Interview",
            value: `${countInterview} In Progress`,
            subtext: "Google Meet Assessment",
            subtextColor: "text-cyan-300",
            icon: <Clock className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500",
            highlight: activeStagePill === 'Interview',
            onClick: () => setActiveStagePill('Interview')
          },
          {
            label: "4. Selected",
            value: `${countSelected} Hired`,
            subtext: "Offer Accepted Cohort",
            subtextColor: "text-emerald-300",
            icon: <Award className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: activeStagePill === 'Selected',
            onClick: () => setActiveStagePill('Selected')
          }
        ]}
        filterTitle="QUICK FILTER PIPELINE STAGE"
        activePill={activeStagePill}
        onPillClick={setActiveStagePill}
        pills={[
          { id: 'ALL', label: 'All Stages', count: normalizedApps.length, icon: '📋' },
          { id: 'Applied', label: '1. Applied', count: countApplied, icon: '📩' },
          { id: 'Shortlisted', label: '2. Shortlisted', count: countShortlisted, icon: '⭐' },
          { id: 'Interview', label: '3. Interview', count: countInterview, icon: '🎙️' },
          { id: 'Selected', label: '4. Selected', count: countSelected, icon: '🏆' }
        ]}
      />

      {/* LIVE EMAIL DISPATCH NOTIFICATION TOAST */}
      {emailNotification && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white p-4 rounded-2xl shadow-xl shadow-teal-500/20 border border-white/20 flex items-start justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md shrink-0 mt-0.5">
              <Mail className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  Automated Email Dispatched
                </span>
                <span className="text-[11px] text-white/80">{emailNotification.timestamp}</span>
              </div>
              <h4 className="text-sm font-black mt-1">
                {emailNotification.subject}
              </h4>
              <p className="text-xs text-white/90 mt-0.5">
                Sent to: <strong>{emailNotification.recipientName}</strong> ({emailNotification.recipientEmail}) · Role: {emailNotification.role}
              </p>
              <div className="mt-2 text-[11px] bg-black/20 p-2 rounded-lg italic">
                "{emailNotification.body}"
              </div>
            </div>
          </div>
          <button
            onClick={() => setEmailNotification(null)}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Control Bar: Search & Add Test Applicant */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate by name, role or email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Applicant into Applied</span>
          </button>
        </div>
      </div>

      {/* HORIZONTAL STAGES PIPELINE (Applied 1st, Shortlisted 2nd, Interview 3rd, Selected 4th) */}
      <div className="space-y-6">
        {(activeStagePill === 'ALL' ? PIPELINE_STAGES : PIPELINE_STAGES.filter(s => s.id === activeStagePill)).map((col) => {
          const colApps = filteredApps.filter(a => a.stage === col.id);
          const nextInfo = getNextStageInfo(col.id);

          return (
            <div
              key={col.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5"
            >
              {/* Stage Horizontal Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md">
                    {col.stepNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{col.icon}</span>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        {col.label}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-100 text-slate-700">
                        {colApps.length} {colApps.length === 1 ? 'Applicant' : 'Applicants'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {col.desc}
                    </p>
                  </div>
                </div>

                {col.id === 'Applied' && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Applicant</span>
                  </button>
                )}
              </div>

              {/* Candidate Cards Grid (Horizontal side-by-side like Image 1) */}
              {colApps.length === 0 ? (
                <div className="py-10 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/60 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <span className="text-3xl opacity-50">{col.icon}</span>
                  <p className="text-xs font-bold text-slate-500">No candidates currently in {col.label}</p>
                  {col.id === 'Applied' && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 rounded-xl text-xs font-black shadow-md shadow-orange-500/20"
                    >
                      + Add Candidate to Applied
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      className="relative overflow-hidden bg-[#0C0F17] hover:bg-[#111420] border border-slate-800/90 hover:border-slate-700/80 rounded-2xl p-4.5 text-white transition-all duration-200 shadow-xl flex flex-col justify-between gap-4 group"
                    >
                      {/* Top Row: Squircle Icon on Left, Rating/Badge on Right */}
                      <div>
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${col.accentGlow} border ${col.borderAccent} flex items-center justify-center text-white shrink-0 shadow-inner`}>
                            <span className="text-base">{col.icon}</span>
                          </div>

                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-white/5 border border-white/10 text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{col.rating}</span>
                          </div>
                        </div>

                        {/* Category subtitle (uppercase tracking-widest like Image 1) */}
                        <div className="text-[10px] font-black uppercase tracking-wider text-amber-500 mt-3 truncate">
                          {app.job_title || 'INTERNSHIP APPLICANT'}
                        </div>

                        {/* Candidate Name (Big Bold White Heading) */}
                        <h4 className="text-base sm:text-lg font-black text-white tracking-tight mt-0.5 group-hover:text-amber-300 transition-colors">
                          {app.candidate_name || app.name || 'Candidate'}
                        </h4>

                        {/* Details / College & Email */}
                        <div className="mt-2 text-xs text-slate-400 space-y-1">
                          <div className="flex items-center gap-1.5 truncate text-slate-300">
                            <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate">{app.college || 'Engineering College'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate text-slate-400 text-[11px]">
                            <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate">{app.email || 'candidate@example.com'}</span>
                          </div>
                        </div>

                        {/* Skills Pills */}
                        {app.skills && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {app.skills.split(',').slice(0, 3).map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Info: APPLIED DATE & PIPELINE STATUS (matching INVESTMENT & SESSION SPAN in Image 1) */}
                      <div className="space-y-3 pt-3 border-t border-slate-800/80">
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">
                              APPLIED DATE
                            </span>
                            <span className="text-xs font-black text-white">
                              {app.applied_date || '2026-11-03'}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">
                              PIPELINE STAGE
                            </span>
                            <span className={`text-[11px] font-bold ${col.badgeText}`}>
                              {col.label}
                            </span>
                          </div>
                        </div>

                        {/* Revert link if not in Applied */}
                        {col.id !== 'Applied' && (
                          <div className="text-right">
                            <button
                              onClick={() => handleRevertStage(app)}
                              className="text-[10px] text-slate-500 hover:text-slate-300 font-bold underline"
                            >
                              ↺ Revert to Previous Stage
                            </button>
                          </div>
                        )}

                        {/* Action Buttons: DETAIL + NEXT (Next styled with glowing orange gradient like + RESERVE SESSION) */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleOpenDetails(app)}
                            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 border border-white/10"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            <span>Detail</span>
                          </button>

                          {nextInfo ? (
                            <button
                              onClick={() => handleAdvanceStage(app)}
                              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 group/btn"
                            >
                              <span>Next</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                          ) : (
                            <div className="w-full py-2.5 px-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black flex items-center justify-center gap-1 border border-emerald-500/30">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Hired</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DETAILS DRAWER / MODAL */}
      {showDetailModal && selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-base">
                  {(selectedApp.candidate_name || selectedApp.name || 'C').charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {selectedApp.candidate_name || selectedApp.name}
                  </h3>
                  <p className="text-xs text-purple-600 font-bold">{selectedApp.job_title || selectedApp.applied_for}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Email</span>
                  <span className="font-bold text-slate-800">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Phone</span>
                  <span className="font-bold text-slate-800">{selectedApp.phone || '+91 98290 77112'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">College</span>
                  <span className="font-bold text-slate-800">{selectedApp.college || 'Ajmer College'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Qualification</span>
                  <span className="font-bold text-slate-800">{selectedApp.qualification || 'B.Tech CS'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">Key Technical Skills</span>
                <p className="font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {selectedApp.skills || 'React, Node.js, TypeScript, PostgreSQL'}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">Current Pipeline Stage</span>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 inline-block">
                  {selectedApp.stage}
                </span>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">HR Screening Remarks</span>
                <p className="italic text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  "{selectedApp.hr_remarks || 'Candidate has submitted portfolio and projects for review.'}"
                </p>
              </div>

              {/* Resume Download / View */}
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-purple-950 block">Resume / CV Document</span>
                  <span className="text-[11px] text-purple-700">Verified Supabase Storage PDF</span>
                </div>
                <a
                  href={selectedApp.resume_url || "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View Resume</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>

              {getNextStageInfo(selectedApp.stage) && (
                <button
                  onClick={() => {
                    handleAdvanceStage(selectedApp);
                    setShowDetailModal(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-md shadow-purple-500/20 flex items-center gap-1.5"
                >
                  <span>Advance to {getNextStageInfo(selectedApp.stage)?.nextStage}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD APPLICANT MODAL (For adding into Applied stage) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateApplicant}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Plus className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">Add Applicant into Applied</h3>
                  <p className="text-xs text-slate-500">Will appear in the "Applied" column</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Candidate Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Choudhary"
                  value={newApplicant.candidate_name}
                  onChange={(e) => setNewApplicant({ ...newApplicant, candidate_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Candidate Email (For Notifications)</label>
                <input
                  type="email"
                  required
                  placeholder="pooja@example.com"
                  value={newApplicant.email}
                  onChange={(e) => setNewApplicant({ ...newApplicant, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={newApplicant.phone}
                    onChange={(e) => setNewApplicant({ ...newApplicant, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role</label>
                  <select
                    value={newApplicant.job_title}
                    onChange={(e) => setNewApplicant({ ...newApplicant, job_title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                  >
                    <option value="Full Stack Developer Intern">Full Stack Developer</option>
                    <option value="Backend Developer Intern">Backend Developer</option>
                    <option value="Frontend Developer Intern">Frontend Developer</option>
                    <option value="AI & Machine Learning Intern">AI & ML Intern</option>
                    <option value="UI/UX Design Intern">UI/UX Design Intern</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">College & Degree</label>
                <input
                  type="text"
                  value={newApplicant.college}
                  onChange={(e) => setNewApplicant({ ...newApplicant, college: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-md shadow-purple-500/20"
              >
                Add to Applied
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
