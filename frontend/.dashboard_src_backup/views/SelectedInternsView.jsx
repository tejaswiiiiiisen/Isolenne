import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Calendar,
  Building,
  GraduationCap,
  Clock,
  Award,
  ChevronRight,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Users
} from 'lucide-react';
import { DataService } from '../services/dataService';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function SelectedInternsView({
  interns = [],
  onSaveIntern,
  onNavigateTab
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    college: '',
    mentor: '',
    stipend: '₹18,000 / mo',
    status: 'Active',
    start_date: '',
    end_date: ''
  });

  const filteredInterns = interns.filter(intern => {
    const matchSearch =
      !searchTerm ||
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.intern_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (intern.college && intern.college.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchDept = deptFilter === 'ALL' || intern.department === deptFilter;
    return matchSearch && matchDept;
  });

  const handleEditIntern = (intern) => {
    setSelectedIntern(intern);
    setFormData({
      ...intern
    });
    setEditModalOpen(true);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (selectedIntern) {
      onSaveIntern({
        ...selectedIntern,
        ...formData
      });
      setEditModalOpen(false);
    }
  };

  const engInterns = interns.filter(i => i.department === 'Engineering').length;
  const designInterns = interns.filter(i => i.department === 'Design').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Signature Executive Hero Banner */}
      <ExecutiveHeroBanner
        title="Selected Interns & Cohort Directory"
        icon="🎓"
        badge="INTERN REGISTRY"
        metrics={[
          {
            label: "Enrolled Cohort",
            value: `${interns.length} Students`,
            subtext: "Colleges Across India",
            subtextColor: "text-emerald-300",
            icon: <Users className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: true,
            onClick: () => setDeptFilter('ALL')
          },
          {
            label: "Engineering Interns",
            value: engInterns,
            subtext: "Full Stack, AI & DevOps",
            subtextColor: "text-purple-300",
            icon: <UserCheck className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500",
            onClick: () => setDeptFilter('Engineering')
          },
          {
            label: "Product Design",
            value: designInterns,
            subtext: "UI/UX & Design Systems",
            subtextColor: "text-sky-300",
            icon: <Building className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500",
            onClick: () => setDeptFilter('Design')
          },
          {
            label: "100% Onboarded",
            value: "Active",
            subtext: "Assigned Senior Mentors",
            subtextColor: "text-amber-300",
            icon: <Award className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500"
          }
        ]}
        filterTitle="QUICK FILTER BY INTERNSHIP DEPARTMENT"
        activePill={deptFilter}
        onPillClick={setDeptFilter}
        pills={[
          { id: 'ALL', label: 'All Interns', count: interns.length, icon: '👥', badgeColor: 'bg-white/30 text-white' },
          { id: 'Engineering', label: 'Engineering Cohort', count: engInterns, icon: '💻', badgeColor: 'bg-cyan-400 text-slate-900' },
          { id: 'Design', label: 'Product Design', count: designInterns, icon: '🎨', badgeColor: 'bg-purple-300 text-purple-950' }
        ]}
      />
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Selected Interns Directory</h2>
            <p className="text-xs text-slate-500 font-medium">
              Active student cohort, mentor allocations, stipends & progress oversight
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab && onNavigateTab('internship-tracking')}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-black shadow-md shadow-sky-500/20 flex items-center gap-2 transition-all"
        >
          <Clock className="w-4 h-4" />
          <span>Open Duration & Progress Tracker</span>
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
            placeholder="Search by intern name, ID, college, mentor..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Dept:
          </span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-purple-500"
          >
            <option value="ALL">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      {/* Interns Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredInterns.map((intern) => {
          const metrics = DataService.calculateProgress(intern);
          return (
            <div
              key={intern.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
            >
              {/* Card Header with Avatar */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={intern.profile_picture || '/review/founder.webp'}
                      alt={intern.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(intern.name) + '&background=0284c7&color=fff';
                      }}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                    <div>
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                        {intern.name}
                      </h3>
                      <span className="text-[11px] font-bold text-slate-400">{intern.intern_id}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      intern.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : intern.status === 'Near Completion'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : intern.status === 'Overdue'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {intern.status}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-800">{intern.role}</div>
                  <div className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{intern.college || 'Engineering College'}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Mentor: <strong className="text-slate-700">{intern.mentor || 'Tejaswi Sen'}</strong></span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{intern.start_date} → {intern.extended_end_date || intern.end_date}</span>
                  </div>
                </div>

                {/* Progress Mini Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-purple-600">{metrics.progressPct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all"
                      style={{ width: `${metrics.progressPct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{metrics.completedStr} done</span>
                    <span>{metrics.remainingStr} left</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="font-black text-xs text-slate-900">{intern.stipend || '₹18,000 / mo'}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEditIntern(intern)}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-600 transition-all"
                    title="Edit Intern Details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('internship-tracking')}
                    className="px-2.5 py-1 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Track</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveForm}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Edit Intern Information</h3>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Intern Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Mentor</label>
                <select
                  value={formData.mentor}
                  onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                >
                  <option value="Tejaswi Sen">Tejaswi Sen</option>
                  <option value="Shashank Shubham">Shashank Shubham</option>
                  <option value="Raju Kumar">Raju Kumar</option>
                  <option value="Shakir Ali">Shakir Ali</option>
                  <option value="Kavita Meena">Kavita Meena</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monthly Stipend</label>
                  <input
                    type="text"
                    value={formData.stipend}
                    onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                  >
                    <option value="Active">Active</option>
                    <option value="Near Completion">Near Completion</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-md shadow-purple-500/20"
              >
                Update Details
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

