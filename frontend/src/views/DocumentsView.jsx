import React, { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  User,
  Building
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function DocumentsView({ employees = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const complianceList = employees.map((emp) => {
    const docs = emp.documents || [];
    const hasAadhaar = docs.some(d => d.name.toLowerCase().includes('aadhaar') || d.type === 'Identity');
    const hasContract = docs.some(d => d.name.toLowerCase().includes('contract') || d.name.toLowerCase().includes('agreement'));
    const isComplete = docs.length >= 2 && Boolean(emp.account_no);

    return {
      ...emp,
      docs,
      hasAadhaar,
      hasContract,
      isComplete,
      missingItems: [
        !hasAadhaar ? 'Aadhaar / ID Proof' : null,
        !hasContract ? 'Signed Contract' : null,
        !emp.account_no ? 'Bank Details' : null
      ].filter(Boolean)
    };
  });

  const filtered = complianceList.filter((item) => {
    const matchSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.registration_no.toLowerCase().includes(searchTerm.toLowerCase());

    const matchFilter =
      filterType === 'ALL' ||
      (filterType === 'COMPLETE' && item.isComplete) ||
      (filterType === 'MISSING' && !item.isComplete);

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Thin Horizontal Executive Banner */}
      <ExecutiveHeroBanner
        title="Document Compliance & Employee KYC Integrity"
        icon="📁"
        badge="COMPLIANCE PORTAL"
        metrics={[
          {
            label: "Total Workforce Profiles",
            value: `${employees.length} Staff`,
            subtext: "Audited & Verified",
            subtextColor: "text-emerald-300",
            icon: <FileText className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: filterType === 'ALL',
            onClick: () => setFilterType('ALL')
          },
          {
            label: "Fully Compliant Records",
            value: `${complianceList.filter(c => c.isComplete).length} Profiles`,
            subtext: "100% KYC Complete",
            subtextColor: "text-purple-300",
            icon: <ShieldCheck className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500",
            highlight: filterType === 'COMPLIANT',
            onClick: () => setFilterType('COMPLIANT')
          },
          {
            label: "Action Required / Missing",
            value: `${complianceList.filter(c => !c.isComplete).length} Incomplete`,
            subtext: "Missing Proofs",
            subtextColor: "text-amber-300",
            icon: <ShieldAlert className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500",
            highlight: filterType === 'MISSING',
            onClick: () => setFilterType('MISSING')
          }
        ]}
        filterTitle="QUICK FILTER BY COMPLIANCE STATUS"
        activePill={filterType}
        onPillClick={setFilterType}
        pills={[
          { id: 'ALL', label: 'All Profiles', count: employees.length, icon: '👥' },
          { id: 'COMPLIANT', label: 'Fully Verified', count: complianceList.filter(c => c.isComplete).length, icon: '✅' },
          { id: 'MISSING', label: 'Missing Docs', count: complianceList.filter(c => !c.isComplete).length, icon: '⚠️' }
        ]}
      />

      {/* Control Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employee or ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
        >
          <option value="ALL">All Compliance States</option>
          <option value="COMPLETE">Fully Verified</option>
          <option value="MISSING">Missing Documentation</option>
        </select>
      </div>

      {/* Compliance Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Employee</th>
                <th className="py-4 px-4">Registration ID</th>
                <th className="py-4 px-4">Role & Dept</th>
                <th className="py-4 px-4">Uploaded Documents</th>
                <th className="py-4 px-4">Compliance Status</th>
                <th className="py-4 px-6 text-right">Missing Checklist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 font-mono font-semibold text-slate-600">
                    {item.registration_no}
                  </td>
                  <td className="py-4 px-4 text-slate-700">
                    {item.role} • <span className="text-slate-400">{item.department}</span>
                  </td>
                  <td className="py-4 px-4">
                    {item.docs.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {item.docs.map((d, i) => (
                          <a
                            key={i}
                            href={d.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-[10px]"
                          >
                            <FileText className="w-3 h-3" />
                            {d.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">No files uploaded</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {item.isComplete ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" /> 100% Compliant
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1 w-max">
                        <AlertCircle className="w-3 h-3" /> Incomplete
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {item.missingItems.length > 0 ? (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg">
                        Missing: {item.missingItems.join(', ')}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-600">
                        All Documents Clear
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

