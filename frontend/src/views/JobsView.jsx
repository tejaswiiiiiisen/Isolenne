import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  X,
  Building,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function JobsView({
  jobs = [],
  applications = [],
  onSaveJob,
  onDeleteJob,
  onNavigateTab,
  onFilterCandidateByJob
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Form State
  const initialForm = {
    title: '',
    department: 'Engineering',
    employment_type: 'Full Time',
    location: 'Ajmer / Hybrid',
    salary: '',
    experience: '0-2 yrs',
    openings: 1,
    deadline: '',
    description: '',
    requirements: '',
    benefits: '',
    status: 'Active'
  };
  const [formData, setFormData] = useState(initialForm);

  const departments = ['Engineering', 'Marketing', 'Business', 'Human Resources', 'Mobile', 'Design', 'General'];

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchDept = departmentFilter === 'ALL' || (job.department || '').toLowerCase() === departmentFilter.toLowerCase();
    const matchStatus = statusFilter === 'ALL' || (job.status || 'Active').toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && matchDept && matchStatus;
  });

  const handleOpenAdd = () => {
    setEditingJob(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      department: job.department || 'Engineering',
      employment_type: job.employment_type || job.employmentType || 'Full Time',
      location: job.location || '',
      salary: job.salary || '',
      experience: job.experience || '',
      openings: job.openings || 1,
      deadline: job.deadline || '',
      description: job.description || '',
      requirements: job.requirements || '',
      benefits: job.benefits || '',
      status: job.status || 'Active'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a job title.');
      return;
    }

    const payload = {
      ...(editingJob ? { id: editingJob.id } : {}),
      ...formData,
      openings: parseInt(formData.openings, 10) || 1
    };

    await onSaveJob(payload);
    setModalOpen(false);
  };

  const handleToggleStatus = async (job) => {
    const newStatus = (job.status || 'Active').toLowerCase() === 'active' ? 'Closed' : 'Active';
    await onSaveJob({ ...job, status: newStatus });
  };

  const handleDelete = async (job) => {
    if (confirm(`Are you sure you want to delete the job posting "${job.title}"? This action will remove it from the careers page.`)) {
      await onDeleteJob(job.id);
    }
  };

  const activeJobsCount = jobs.filter(j => (j.status || '').toLowerCase() === 'active').length;
  const totalVacancies = jobs.reduce((acc, j) => acc + (parseInt(j.openings, 10) || 1), 0);
  const engJobs = jobs.filter(j => j.department === 'Engineering').length;
  const designJobs = jobs.filter(j => j.department === 'Design').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Thin Horizontal Executive Banner */}
      <ExecutiveHeroBanner
        title="Jobs Manager & Internship Vacancies Hub"
        icon="💼"
        badge="RECRUITMENT LISTINGS"
        metrics={[
          {
            label: "Active Job Listings",
            value: `${activeJobsCount} Active`,
            subtext: "Live on SkilloraPath Careers",
            subtextColor: "text-emerald-300",
            icon: <Briefcase className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: true,
            onClick: () => setStatusFilter('Active')
          },
          {
            label: "Total Open Vacancies",
            value: `${totalVacancies} Openings`,
            subtext: "Available Intern & Staff Seats",
            subtextColor: "text-purple-300",
            icon: <Users className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500"
          },
          {
            label: "Applications Received",
            value: `${applications.length} Applicants`,
            subtext: "Active Pipeline Inflow",
            subtextColor: "text-sky-300",
            icon: <TrendingUp className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500",
            onClick: () => onNavigateTab && onNavigateTab('candidates')
          }
        ]}
        filterTitle="QUICK FILTER BY DEPARTMENT ROSTER"
        activePill={departmentFilter}
        onPillClick={setDepartmentFilter}
        pills={[
          { id: 'ALL', label: 'All Vacancies', count: jobs.length, icon: '💼', badgeColor: 'bg-white/30 text-white' },
          { id: 'Engineering', label: 'Engineering', count: engJobs, icon: '💻', badgeColor: 'bg-cyan-400 text-slate-900' },
          { id: 'Design', label: 'Product Design', count: designJobs, icon: '🎨', badgeColor: 'bg-purple-300 text-purple-950' },
          { id: 'Executive', label: 'Executive', count: jobs.filter(j => j.department === 'Executive').length, icon: '🏛️', badgeColor: 'bg-emerald-400 text-slate-900' },
          { id: 'Human Resources', label: 'HR & People', count: jobs.filter(j => j.department === 'Human Resources').length, icon: '🤝', badgeColor: 'bg-amber-400 text-slate-900' }
        ]}
      />
      {/* Top Filter & Action Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search job title, location..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>

        {/* Filters & Add Button */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active Only</option>
            <option value="Closed">Closed Only</option>
          </select>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-sm shadow-sky-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 italic bg-white rounded-3xl border border-slate-200/80">
            No job postings found matching your filters.
          </div>
        ) : (
          filteredJobs.map((job) => {
            const jobApps = applications.filter(a => a.job_id === job.id || a.job_id === job._id);
            const openings = parseInt(job.openings, 10) || 1;
            const ratio = (jobApps.length / openings).toFixed(1);
            const isActive = (job.status || 'Active').toLowerCase() === 'active';

            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Header: Dept badge & status toggle */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {job.department || 'Engineering'}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(job)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-colors ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-slate-400" /> Closed
                        </>
                      )}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                    {job.title}
                  </h3>

                  {/* Metadata Tags */}
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location || 'Remote'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {job.employment_type || 'Full Time'}
                    </span>
                    {job.salary && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">
                          {job.salary}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Openings & Applicants Metrics Bar */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-2xl mb-4 text-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Openings</span>
                      <span className="text-sm font-black text-slate-900">{openings}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Applicants</span>
                      <span className="text-sm font-black text-sky-600">{jobApps.length}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">App / Seat</span>
                      <span className="text-sm font-black text-slate-800">{ratio}x</span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        if (onFilterCandidateByJob) onFilterCandidateByJob(job.id);
                        onNavigateTab('candidates');
                      }}
                      className="flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                    >
                      <Users className="w-3.5 h-3.5" />
                      View Applicants ({jobApps.length})
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="p-2 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                        title="Edit Job"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job)}
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create / Edit Job Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-black tracking-tight">
                  {editingJob ? 'Edit Job Posting' : 'Post New Job Opening'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Changes will update the public SkilloraPath Careers page in real-time
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="font-extrabold uppercase text-[10px] text-slate-500 block mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-extrabold uppercase text-[10px] text-slate-500 block mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  >
                    {departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-extrabold uppercase text-[10px] text-slate-500 block mb-1">
                    Employment Type
                  </label>
                  <select
                    value={formData.employment_type}
                    onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-extrabold uppercase text-[10px] text-slate-500 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Ajmer / Remote"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-extrabold uppercase text-[10px] text-slate-500 block mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. ₹20,000 - ₹35,000"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-extrabold uppercase text-[10px] text-slate-500 block mb-1">
                    Total Openings
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.openings}
                    onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-extrabold uppercase text-[10px] text-slate-500 block mb-1">
                  Job Description / Role Summary
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline core responsibilities and day-to-day deliverables..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="font-extrabold uppercase text-[10px] text-slate-500 block mb-1">
                  Requirements & Skills
                </label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Skills, technology stacks, education or experience needed..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <label className="font-extrabold uppercase text-[10px] text-slate-500">
                    Status:
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="p-2 bg-slate-100 border border-slate-200 rounded-lg font-bold text-xs"
                  >
                    <option value="Active">Active Listing</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-md shadow-sky-500/25"
                  >
                    {editingJob ? 'Save Changes' : 'Publish Job Listing'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

