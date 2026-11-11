import React from 'react';
import {
  Download,
  FileSpreadsheet,
  Users,
  Briefcase,
  UserCheck,
  Mail,
  DollarSign,
  Award
} from 'lucide-react';

export default function ReportsView({
  applications = [],
  jobs = [],
  employees = [],
  leads = [],
  bills = [],
  certificates = []
}) {
  const downloadCSV = (filename, headers, rows) => {
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCandidates = () => {
    const headers = ['Candidate Name', 'Email', 'Phone', 'Applied Job ID', 'Stage', 'Location', 'Experience', 'Applied Date'];
    const rows = applications.map(a => [
      `"${a.candidate_name || ''}"`,
      `"${a.email || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.job_id || ''}"`,
      `"${a.status || 'Applied'}"`,
      `"${a.location || ''}"`,
      `"${a.experience || ''}"`,
      `"${a.created_at || ''}"`
    ].join(','));
    downloadCSV(`agnix_candidates_report_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  const exportEmployees = () => {
    const headers = ['Reg ID', 'Name', 'Role', 'Department', 'Email', 'Phone', 'Joining Date', 'Salary', 'Account No', 'IFSC'];
    const rows = employees.map(e => [
      `"${e.registration_no || ''}"`,
      `"${e.name || ''}"`,
      `"${e.role || ''}"`,
      `"${e.department || ''}"`,
      `"${e.email || ''}"`,
      `"${e.contact_number || ''}"`,
      `"${e.start_date || ''}"`,
      `"${e.salary || ''}"`,
      `"${e.account_no || ''}"`,
      `"${e.ifsc_detail || ''}"`
    ].join(','));
    downloadCSV(`agnix_workforce_report_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  const exportLeads = () => {
    const headers = ['Prospect Name', 'Email', 'Phone', 'Company', 'Project Category', 'Budget', 'Details', 'Date'];
    const rows = leads.map(l => [
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.company || ''}"`,
      `"${l.project_type || ''}"`,
      `"${l.budget || ''}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
      `"${l.created_at || ''}"`
    ].join(','));
    downloadCSV(`agnix_leads_report_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  const exportFinance = () => {
    const headers = ['Bill Number', 'Description', 'Amount', 'Date', 'Category', 'Vendor'];
    const rows = bills.map(b => [
      `"${b.billNumber || ''}"`,
      `"${(b.description || '').replace(/"/g, '""')}"`,
      `"${b.amount || ''}"`,
      `"${b.date || ''}"`,
      `"${b.category || ''}"`,
      `"${b.vendor || ''}"`
    ].join(','));
    downloadCSV(`agnix_finance_ledger_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  const exportJobs = () => {
    const headers = ['Job Title', 'Department', 'Type', 'Location', 'Openings', 'Salary', 'Status'];
    const rows = jobs.map(j => [
      `"${j.title || ''}"`,
      `"${j.department || ''}"`,
      `"${j.employment_type || ''}"`,
      `"${j.location || ''}"`,
      `"${j.openings || 1}"`,
      `"${j.salary || ''}"`,
      `"${j.status || 'Active'}"`
    ].join(','));
    downloadCSV(`agnix_jobs_catalog_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  const reportCards = [
    {
      title: 'Candidates & Applications Export',
      desc: 'Complete applicant registry with stages, contact details, and dates.',
      count: applications.length,
      action: exportCandidates,
      icon: Users,
      color: 'sky'
    },
    {
      title: 'Employee Workforce Directory Export',
      desc: 'Full company HR registry with bank IFSC, compensation, and joining dates.',
      count: employees.length,
      action: exportEmployees,
      icon: UserCheck,
      color: 'indigo'
    },
    {
      title: 'Client Leads & Inquiries Export',
      desc: 'Prospect inquiries from the contact page with budgets and scopes.',
      count: leads.length,
      action: exportLeads,
      icon: Mail,
      color: 'cyan'
    },
    {
      title: 'Finance & Expense Ledger Export',
      desc: 'Audit trail of all recorded bills, vendors, and expense categories.',
      count: bills.length,
      action: exportFinance,
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Job Openings & Vacancy Catalog',
      desc: 'Live and archived job postings with vacancy counts and departments.',
      count: jobs.length,
      action: exportJobs,
      icon: Briefcase,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <h3 className="text-base font-black text-slate-900 tracking-tight">
          Executive Data Reporting & Compliance Exports
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Export standardized CSV reports directly from the database for offline audit, payroll, and recruitment analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCards.map((rc, i) => {
          const Icon = rc.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 text-slate-900">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                    {rc.count} Records
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900">{rc.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rc.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={rc.action}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download CSV Dataset
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

