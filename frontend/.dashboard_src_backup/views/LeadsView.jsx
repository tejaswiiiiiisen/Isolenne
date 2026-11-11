import React, { useState } from 'react';
import {
  Mail,
  Search,
  Filter,
  Download,
  Phone,
  Building,
  DollarSign,
  Calendar,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Clock,
  Save,
  X,
  Send,
  Sparkles,
  Users
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function LeadsView({
  leads = [],
  onUpdateStatus,
  onAddNotes
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [activeLead, setActiveLead] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [leadNotes, setLeadNotes] = useState('');

  const projectTypes = ['AI Software Development', 'Automation Solutions', 'Web Applications', 'Mobile App', 'Cloud / DevOps', 'Other'];

  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      !searchTerm ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchType = typeFilter === 'ALL' || (lead.project_type || '').toLowerCase() === typeFilter.toLowerCase();
    return matchSearch && matchType;
  });

  const handleOpenLead = (lead) => {
    setActiveLead(lead);
    setLeadNotes(lead.notes || '');
    setShowDrawer(true);
  };

  const handleSaveNotes = () => {
    if (!activeLead) return;
    if (onAddNotes) onAddNotes(activeLead.id, leadNotes);
    setActiveLead({ ...activeLead, notes: leadNotes });
    alert('Internal follow-up note saved!');
  };

  const handleStatusChange = (newStatus) => {
    if (!activeLead) return;
    if (onUpdateStatus) onUpdateStatus(activeLead.id, newStatus);
    setActiveLead({ ...activeLead, status: newStatus });
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Project Type', 'Budget', 'Details', 'Submission Date', 'Status'];
    const rows = filteredLeads.map(l => [
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.company || ''}"`,
      `"${l.project_type || ''}"`,
      `"${l.budget || ''}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
      `"${l.created_at ? new Date(l.created_at).toLocaleDateString() : ''}"`,
      `"${l.status || 'New'}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `agnix_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const inDiscussionCount = leads.filter(l => l.status === 'In Discussion').length;
  const highBudgetCount = leads.filter(l => (l.budget || '').includes('25k') || (l.budget || '').includes('50k')).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Signature Executive Hero Banner */}
      <ExecutiveHeroBanner
        title="Commercial Inquiries & Client Leads Pipeline"
        icon="📬"
        badge="BUSINESS DEVELOPMENT"
        metrics={[
          {
            label: "Total Client Leads",
            value: leads.length,
            subtext: "From AgniX Website Contact Form",
            subtextColor: "text-emerald-300",
            icon: <Mail className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: true,
            onClick: () => setTypeFilter('ALL')
          },
          {
            label: "New Incoming Inquiries",
            value: newLeadsCount,
            subtext: "Awaiting Admin Follow-up",
            subtextColor: "text-purple-300",
            icon: <Clock className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500"
          },
          {
            label: "High Budget ($25k+)",
            value: highBudgetCount,
            subtext: "Enterprise Custom Builds",
            subtextColor: "text-sky-300",
            icon: <DollarSign className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500"
          },
          {
            label: "In Active Discussion",
            value: inDiscussionCount,
            subtext: "Proposal Under Review",
            subtextColor: "text-amber-300",
            icon: <CheckCircle2 className="w-6 h-6 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500"
          }
        ]}
        filterTitle="QUICK FILTER BY PROJECT TYPE"
        activePill={typeFilter}
        onPillClick={setTypeFilter}
        pills={[
          { id: 'ALL', label: 'All Projects', count: leads.length, icon: '📋', badgeColor: 'bg-white/30 text-white' },
          { id: 'AI Software Development', label: 'AI Software', count: leads.filter(l => l.project_type === 'AI Software Development').length, icon: '🤖', badgeColor: 'bg-cyan-400 text-slate-900' },
          { id: 'Automation Solutions', label: 'Automation', count: leads.filter(l => l.project_type === 'Automation Solutions').length, icon: '⚙️', badgeColor: 'bg-purple-300 text-purple-950' }
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
            placeholder="Search lead name, company, email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Project Inquiries</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Export Leads CSV
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Prospect Name</th>
                <th className="py-4 px-6">Company / Org</th>
                <th className="py-4 px-4">Project Scope</th>
                <th className="py-4 px-4">Estimated Budget</th>
                <th className="py-4 px-4">Date Received</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-slate-400 italic">
                    No lead inquiries found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => handleOpenLead(lead)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 font-black text-xs flex items-center justify-center shrink-0">
                          {lead.name ? lead.name.charAt(0).toUpperCase() : 'L'}
                        </div>
                        <div>
                          <span className="font-black text-slate-900 block truncate">{lead.name}</span>
                          <span className="text-[11px] text-slate-400 block truncate">{lead.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {lead.company || 'Direct Individual'}
                    </td>

                    {/* Project Scope */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {lead.project_type || 'Software System'}
                      </span>
                    </td>

                    {/* Budget */}
                    <td className="py-4 px-4 font-black text-emerald-700">
                      {lead.budget || 'Flexible'}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'Recent'}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                        lead.status === 'Qualified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        lead.status === 'In Discussion' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        'bg-cyan-50 text-cyan-700 border-cyan-200'
                      }`}>
                        {lead.status || 'New'}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLead(lead);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 font-bold text-xs"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      {showDrawer && activeLead && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setShowDrawer(false)}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col overflow-y-auto">
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black tracking-tight">{activeLead.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">{activeLead.company || 'Individual Client'}</p>
                </div>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 flex-1 text-xs">
                {/* Contact Action Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`mailto:${activeLead.email}`}
                    className="p-3 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-2xl flex items-center gap-3 transition-colors text-sky-700"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase block text-sky-500">Email Lead</span>
                      <span className="font-bold truncate block">{activeLead.email}</span>
                    </div>
                  </a>
                  <a
                    href={`tel:${activeLead.phone}`}
                    className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center gap-3 transition-colors text-emerald-700"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase block text-emerald-500">Call Phone</span>
                      <span className="font-bold truncate block">{activeLead.phone || 'N/A'}</span>
                    </div>
                  </a>
                </div>

                {/* Status Toggle */}
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-2">
                    Lead Status Stage
                  </label>
                  <div className="flex gap-2">
                    {['New', 'In Discussion', 'Qualified', 'Closed / Won', 'Archived'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                          (activeLead.status || 'New') === st
                            ? 'bg-cyan-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inquiry Overview */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Project Request Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Project Category</span>
                      <span className="font-bold text-slate-800">{activeLead.project_type || 'Software System'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Target Budget</span>
                      <span className="font-black text-emerald-700">{activeLead.budget || 'Flexible'}</span>
                    </div>
                  </div>
                </div>

                {/* Project Message */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Client Message & Requirements
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 leading-relaxed text-slate-800">
                    {activeLead.details || 'No detailed brief submitted.'}
                  </div>
                </div>

                {/* Internal Follow-up Notes */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Internal Sales Notes & Follow-up Log
                  </h4>
                  <textarea
                    rows={4}
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="Record call summary, pricing discussion, next milestone..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-800"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold text-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Follow-up Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

