import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Building,
  CreditCard,
  MapPin,
  FileText,
  AlertCircle,
  X,
  Edit2,
  Trash2,
  CheckCircle2,
  Cake,
  ExternalLink,
  Users,
  Award
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function EmployeesView({
  employees = [],
  onSaveEmployee,
  onDeleteEmployee
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [activeEmp, setActiveEmp] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const getInitials = (name) => {
    if (!name) return 'EM';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarGradient = (idx) => {
    const gradients = [
      'from-sky-500 to-indigo-500',
      'from-indigo-500 to-purple-500',
      'from-emerald-500 to-teal-500',
      'from-rose-500 to-amber-500',
      'from-cyan-500 to-blue-500',
      'from-amber-500 to-orange-500'
    ];
    return gradients[idx % gradients.length];
  };

  const initialForm = {
    registration_no: '',
    name: '',
    father_name: '',
    dob: '',
    email: '',
    contact_number: '',
    role: 'Full Stack Developer',
    department: 'Engineering',
    start_date: new Date().toISOString().slice(0, 10),
    end_date: '',
    salary: '₹50,000',
    aadhaar_no: '',
    permanent_address: '',
    current_address: '',
    account_no: '',
    ifsc_detail: '',
    status: 'Active',
    profile_picture: ''
  };
  const [formData, setFormData] = useState(initialForm);

  const departments = ['Executive', 'Engineering', 'Marketing', 'Business', 'Human Resources', 'Mobile', 'Design'];

  // Calculate working tenure string from start_date to end_date (or today)
  const calculateTenure = (startDate, endDate) => {
    if (!startDate) return 'N/A';
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    if (years > 0) return `${years}y ${months}m`;
    if (months > 0) return `${months} months`;
    return `${diffDays} days`;
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      !searchTerm ||
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.registration_no && emp.registration_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDept = deptFilter === 'ALL' || (emp.department || '').toLowerCase() === deptFilter.toLowerCase();
    return matchSearch && matchDept;
  });

  const handleOpenAdd = () => {
    setEditingEmp(null);
    setFormData({
      ...initialForm,
      registration_no: `AGX-EMP-00${employees.length + 1}`
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setEditingEmp(emp);
    setFormData({
      registration_no: emp.registration_no || '',
      name: emp.name || '',
      father_name: emp.father_name || '',
      dob: emp.dob || '',
      email: emp.email || '',
      contact_number: emp.contact_number || '',
      role: emp.role || '',
      department: emp.department || 'Engineering',
      start_date: emp.start_date || '',
      end_date: emp.end_date || '',
      salary: emp.salary || '',
      aadhaar_no: emp.aadhaar_no || '',
      permanent_address: emp.permanent_address || '',
      current_address: emp.current_address || '',
      account_no: emp.account_no || '',
      ifsc_detail: emp.ifsc_detail || '',
      status: emp.status || 'Active',
      profile_picture: emp.profile_picture || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please fill in employee name and email.');
      return;
    }

    const payload = {
      ...(editingEmp ? { id: editingEmp.id } : {}),
      ...formData
    };

    await onSaveEmployee(payload);
    setModalOpen(false);
  };

  const handleDelete = async (emp) => {
    if (confirm(`Remove employee "${emp.name}" from active records?`)) {
      await onDeleteEmployee(emp.id);
      if (activeEmp?.id === emp.id) setShowDrawer(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Reg ID', 'Name', 'Role', 'Department', 'Email', 'Phone', 'Joining Date', 'Tenure', 'Status', 'Account No', 'IFSC'];
    const rows = filteredEmployees.map(emp => [
      `"${emp.registration_no || ''}"`,
      `"${emp.name || ''}"`,
      `"${emp.role || ''}"`,
      `"${emp.department || ''}"`,
      `"${emp.email || ''}"`,
      `"${emp.contact_number || ''}"`,
      `"${emp.start_date || ''}"`,
      `"${calculateTenure(emp.start_date, emp.end_date)}"`,
      `"${emp.status || 'Active'}"`,
      `"${emp.account_no || ''}"`,
      `"${emp.ifsc_detail || ''}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `skillorapath_employees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const execCount = employees.filter(e => e.department === 'Executive').length;
  const enggCount = employees.filter(e => e.department === 'Engineering').length;
  const designHrCount = employees.filter(e => e.department === 'Design' || e.department === 'Human Resources').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Thin Horizontal Executive Banner */}
      <ExecutiveHeroBanner
        title="Workforce Directory & Organizational Registry"
        icon="🏛️"
        badge="AGX WORKFORCE"
        metrics={[
          {
            label: "Total Workforce",
            value: `${employees.length} Staff`,
            subtext: "100% KYC Verified & Active",
            subtextColor: "text-emerald-300",
            icon: <Users className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: deptFilter === 'ALL',
            onClick: () => setDeptFilter('ALL')
          },
          {
            label: "Executive Leadership",
            value: `${execCount} Founders`,
            subtext: "Operations & Board",
            subtextColor: "text-purple-300",
            icon: <Building className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500",
            highlight: deptFilter === 'Executive',
            onClick: () => setDeptFilter('Executive')
          },
          {
            label: "Engineering Squad",
            value: `${enggCount} Engineers`,
            subtext: "Full Stack, AI & DevOps Leads",
            subtextColor: "text-sky-300",
            icon: <UserCheck className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500",
            highlight: deptFilter === 'Engineering',
            onClick: () => setDeptFilter('Engineering')
          },
          {
            label: "Creative & People",
            value: `${designHrCount} Leads`,
            subtext: "Product Design & HR",
            subtextColor: "text-amber-300",
            icon: <Award className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500"
          }
        ]}
        filterTitle="QUICK FILTER BY DEPARTMENT ROSTER"
        activePill={deptFilter}
        onPillClick={setDeptFilter}
        pills={[
          { id: 'ALL', label: 'All Staff', count: employees.length, icon: '👥' },
          { id: 'Executive', label: 'Executive Founders', count: execCount, icon: '🏛️' },
          { id: 'Engineering', label: 'Engineering', count: enggCount, icon: '💻' },
          { id: 'Design', label: 'Product Design', count: employees.filter(e => e.department === 'Design').length, icon: '🎨' },
          { id: 'Human Resources', label: 'Human Resources', count: employees.filter(e => e.department === 'Human Resources').length, icon: '🤝' }
        ]}
      />
      {/* Control Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employee, ID, email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Departments ({departments.length})</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Employee</th>
                <th className="py-4 px-4">Registration ID</th>
                <th className="py-4 px-6">Role & Department</th>
                <th className="py-4 px-4">Joining Date</th>
                <th className="py-4 px-4">Tenure</th>
                <th className="py-4 px-4">KYC / Docs</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center text-slate-400 italic">
                    No employee records found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => {
                  const hasMissingDocs = !emp.documents || emp.documents.length === 0 || !emp.account_no;
                  return (
                    <tr
                      key={emp.id}
                      onClick={() => {
                        setActiveEmp(emp);
                        setShowDrawer(true);
                      }}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      {/* Name & Photo */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                            {emp.profile_picture && !imgErrors[emp.id] ? (
                              <img
                                src={emp.profile_picture}
                                alt={emp.name}
                                className="w-full h-full object-cover"
                                onError={() => setImgErrors(prev => ({ ...prev, [emp.id]: true }))}
                              />
                            ) : (
                              <div className={`w-full h-full flex items-center justify-center font-black text-xs text-white bg-gradient-to-tr ${getAvatarGradient(filteredEmployees.indexOf(emp))}`}>
                                {getInitials(emp.name)}
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-black text-slate-900 block truncate">
                              {emp.name}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate block">
                              {emp.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Reg ID */}
                      <td className="py-4 px-4 font-mono text-[11px] font-bold text-slate-600">
                        {emp.registration_no || 'AGX-EMP-XXX'}
                      </td>

                      {/* Role & Dept */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-800 block truncate">
                          {emp.role || 'Team Member'}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {emp.department || 'Engineering'}
                        </span>
                      </td>

                      {/* Joining Date */}
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                        {emp.start_date || '2024-01-01'}
                      </td>

                      {/* Tenure */}
                      <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap">
                        {calculateTenure(emp.start_date, emp.end_date)}
                      </td>

                      {/* KYC status */}
                      <td className="py-4 px-4">
                        {hasMissingDocs ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <AlertCircle className="w-3 h-3" /> Incomplete
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {emp.status || 'Active'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleOpenEdit(emp)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50"
                            title="Edit Profile"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(emp)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Remove Employee"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Profile Drawer */}
      {showDrawer && activeEmp && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setShowDrawer(false)}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col overflow-y-auto">
              {/* Header */}
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 overflow-hidden border-2 border-white/20 shrink-0">
                    {activeEmp.profile_picture && !imgErrors[activeEmp.id] ? (
                      <img
                        src={activeEmp.profile_picture}
                        alt={activeEmp.name}
                        className="w-full h-full object-cover"
                        onError={() => setImgErrors(prev => ({ ...prev, [activeEmp.id]: true }))}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-black text-lg text-white">
                        {getInitials(activeEmp.name)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight">{activeEmp.name}</h3>
                    <p className="text-xs text-sky-400 font-semibold">{activeEmp.role} • {activeEmp.department}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{activeEmp.registration_no}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6 flex-1 text-xs">
                {/* Personal & Contact Details */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Personal & Contact Information
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Father's Name</span>
                      <span className="font-bold text-slate-800">{activeEmp.father_name || 'N/A'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Date of Birth</span>
                      <span className="font-bold text-slate-800">{activeEmp.dob || 'N/A'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Official Email</span>
                      <a href={`mailto:${activeEmp.email}`} className="font-bold text-sky-600 truncate block">
                        {activeEmp.email}
                      </a>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Contact Phone</span>
                      <a href={`tel:${activeEmp.contact_number}`} className="font-bold text-slate-800 block">
                        {activeEmp.contact_number || 'N/A'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Registered Addresses
                  </h4>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Current Address</span>
                      <span className="font-semibold text-slate-800">{activeEmp.current_address || 'Same as permanent'}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Permanent Address</span>
                      <span className="font-semibold text-slate-800">{activeEmp.permanent_address || 'Ajmer, Rajasthan'}</span>
                    </div>
                  </div>
                </div>

                {/* Compensation & Bank Info (Confidential) */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Banking & Compensation Details</span>
                    <span className="text-[9px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Confidential
                    </span>
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Base Salary</span>
                      <span className="font-black text-emerald-700">{activeEmp.salary || 'N/A'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Bank Account</span>
                      <span className="font-mono font-bold text-slate-800">{activeEmp.account_no || 'Missing'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">IFSC Code</span>
                      <span className="font-mono font-bold text-slate-800">{activeEmp.ifsc_detail || 'Missing'}</span>
                    </div>
                  </div>
                </div>

                {/* Documents & Compliance */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Uploaded Documents & Compliance Records
                  </h4>
                  {activeEmp.documents && activeEmp.documents.length > 0 ? (
                    <div className="space-y-2">
                      {activeEmp.documents.map((doc, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-sky-600" />
                            <span className="font-bold text-slate-800">{doc.name}</span>
                          </div>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg font-bold text-[10px] text-sky-600 hover:bg-sky-50"
                          >
                            Preview
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Employee has missing compliance documentation (Aadhaar / Contract).</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Employee Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-black tracking-tight">
                {editingEmp ? 'Edit Employee Profile' : 'Register New Employee'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Registration ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.registration_no}
                    onChange={(e) => setFormData({ ...formData, registration_no: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={formData.contact_number}
                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    {departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Base Salary
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="₹60,000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.account_no}
                    onChange={(e) => setFormData({ ...formData, account_no: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Bank IFSC Detail
                  </label>
                  <input
                    type="text"
                    value={formData.ifsc_detail}
                    onChange={(e) => setFormData({ ...formData, ifsc_detail: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                >
                  {editingEmp ? 'Save Profile' : 'Register Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

