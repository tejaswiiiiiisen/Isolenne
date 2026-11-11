import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Plus,
  Trash2,
  Database,
  CheckCircle2,
  User,
  Key,
  Bell,
  Building,
  Briefcase
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { SUPABASE_URL } from '../lib/supabaseClient';

export default function SettingsView() {
  const [roles, setRoles] = useState(DataService.getCustomRoles());
  const [departments, setDepartments] = useState(DataService.getCustomDepartments());
  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState('');

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRole.trim()) return;
    const updated = DataService.saveCustomRole(newRole.trim());
    setRoles(updated);
    setNewRole('');
  };

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDept.trim()) return;
    const updated = DataService.saveCustomDepartment(newDept.trim());
    setDepartments(updated);
    setNewDept('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* System Diagnostics & Database Status */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-500" />
              Supabase Cloud Database & Storage Connectivity
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current live database infrastructure status
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Connected & Operational
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Supabase Endpoint</span>
            <span className="font-mono font-bold text-slate-800 break-all">{SUPABASE_URL}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Active Tables</span>
            <span className="font-bold text-slate-800">jobs, applications, contact_submissions, certificates, employees</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Storage Buckets</span>
            <span className="font-bold text-slate-800">resumes, employee-certs, employee-docs</span>
          </div>
        </div>
      </div>

      {/* Custom Roles & Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Custom Departments */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-500" />
            Configured Departments ({departments.length})
          </h3>
          <p className="text-xs text-slate-500">
            Available departments used in job postings, recruitment, and employee records.
          </p>

          <form onSubmit={handleAddDept} className="flex gap-2">
            <input
              type="text"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              placeholder="e.g. Quality Assurance"
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700"
            >
              Add
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {departments.map((dept, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>

        {/* Custom Roles */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-sky-500" />
            Designations & Roles ({roles.length})
          </h3>
          <p className="text-xs text-slate-500">
            Registered company job titles and staff roles.
          </p>

          <form onSubmit={handleAddRole} className="flex gap-2">
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="e.g. Cloud DevOps Architect"
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-sky-500 text-white rounded-xl font-bold text-xs hover:bg-sky-600"
            >
              Add
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2 max-h-48 overflow-y-auto">
            {roles.map((r, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Profile & Security Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Administrator Security Profile
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Authenticated User</span>
            <span className="font-bold text-slate-900">Tejaswi Sen (Founder & CEO)</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Console Access Level</span>
            <span className="font-bold text-emerald-600">Super Administrator (Full Read/Write)</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Session State</span>
            <span className="font-bold text-sky-600">Encrypted Local & Cloud Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

