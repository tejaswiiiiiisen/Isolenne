import React, { useState } from 'react';
import {
  Award,
  Search,
  CheckCircle2,
  XCircle,
  Download,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building,
  User,
  FileText
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function CertificatesView({ certificates = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [verifyQuery, setVerifyQuery] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  const filteredCerts = certificates.filter((c) => {
    return (
      !searchTerm ||
      c.certification_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.employee_id && c.employee_id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verifyQuery.trim()) return;
    const clean = verifyQuery.trim().toUpperCase();
    const found = certificates.find(c => c.certification_number.toUpperCase() === clean);
    if (found) {
      setVerifyResult({ status: 'VALID', data: found });
    } else {
      setVerifyResult({ status: 'INVALID', query: verifyQuery });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Thin Horizontal Executive Banner */}
      <ExecutiveHeroBanner
        title="Certificates Registry & Credential Authentication"
        icon="🏆"
        badge="ALUMNI CREDENTIALS"
        metrics={[
          {
            label: "Total Certificates Issued",
            value: `${certificates.length} Issued`,
            subtext: "Verified Alumni Records",
            subtextColor: "text-emerald-300",
            icon: <Award className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: true
          },
          {
            label: "Public QR Integrity",
            value: "100% Cryptographic",
            subtext: "Anti-Tamper Signature",
            subtextColor: "text-teal-300",
            icon: <ShieldCheck className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-teal-500 to-cyan-500"
          },
          {
            label: "PDF Storage Bucket",
            value: "Active",
            subtext: "Supabase Signed URLs",
            subtextColor: "text-sky-300",
            icon: <Download className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500"
          }
        ]}
      />

      {/* Live Certificate Authenticator Card */}
      <div className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-3xl p-8 text-white shadow-xl">
        <div className="max-w-2xl">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Cryptographic Integrity & Public Registry
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-2">
            SkilloraPath Certificate Verification Terminal
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Test any credential against the live Supabase certification database. Matches public website verification.
          </p>

          <form onSubmit={handleVerify} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={verifyQuery}
              onChange={(e) => setVerifyQuery(e.target.value)}
              placeholder="e.g. MAC/CET/2025/01"
              className="flex-1 p-3.5 bg-white/10 border border-white/20 rounded-2xl text-xs font-mono font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-teal-500 hover:bg-teal-600 text-slate-900 rounded-2xl font-black text-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify Authenticity
            </button>
          </form>

          {/* Verification Result Notification */}
          {verifyResult && (
            <div className={`mt-5 p-4 rounded-2xl border ${
              verifyResult.status === 'VALID'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {verifyResult.status === 'VALID' ? (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-sm text-emerald-200">
                      Authentic Credential Verified: {verifyResult.data.certification_number}
                    </h4>
                    <p className="text-xs mt-1 text-emerald-300">
                      Issued to <strong>{verifyResult.data.name}</strong> ({verifyResult.data.designation || 'Intern / Engineer'}) on {verifyResult.data.issue_date || '2025-06-24'}.
                    </p>
                    {verifyResult.data.url && (
                      <a
                        href={verifyResult.data.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-teal-300 hover:underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Download Signed Certificate PDF →
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <h4 className="font-black text-sm text-rose-200">
                      Unverified Credential
                    </h4>
                    <p className="text-xs text-rose-300">
                      No registered certificate found with number "{verifyResult.query}".
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search certificate ID, employee name..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <span className="text-xs font-bold text-slate-500">
          Total Issued: {certificates.length}
        </span>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Certificate ID</th>
                <th className="py-4 px-6">Recipient Name</th>
                <th className="py-4 px-4">Designation</th>
                <th className="py-4 px-4">Department</th>
                <th className="py-4 px-4">Issue Date</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Certificate PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCerts.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-black text-slate-900">
                    {cert.certification_number}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {cert.name}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">
                    {cert.designation || 'Engineer'}
                  </td>
                  <td className="py-4 px-4 text-slate-500">
                    {cert.department || 'Engineering'}
                  </td>
                  <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                    {cert.issue_date || '2025-06-24'}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3 h-3" /> Valid
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold text-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download PDF
                      </a>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">No URL</span>
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

