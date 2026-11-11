import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Plus,
  Search,
  Download,
  Calendar,
  FileText,
  Trash2,
  Edit2,
  TrendingUp,
  X,
  CreditCard,
  Building,
  CheckCircle2,
  ExternalLink,
  Users,
  Receipt
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function FinanceView({
  bills = [],
  onSaveBill,
  onDeleteBill
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);

  const initialForm = {
    billNumber: `INV-${new Date().getFullYear()}-${String(bills.length + 1).padStart(3, '0')}`,
    description: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'Cloud & Infrastructure',
    vendor: '',
    pdfDataUri: ''
  };
  const [formData, setFormData] = useState(initialForm);

  const categories = [
    'Cloud & Infrastructure',
    'Software Subscriptions',
    'Hardware & Facilities',
    'Office Utilities',
    'Marketing & PR',
    'Legal & Professional Fees',
    'Other Expenses'
  ];

  // Calculations
  const totalExpense = useMemo(() => {
    return bills.reduce((acc, b) => acc + (parseFloat(b.amount) || 0), 0);
  }, [bills]);

  const currentMonthStr = new Date().toISOString().slice(0, 7);
  const currentMonthExpense = useMemo(() => {
    return bills
      .filter(b => b.date && b.date.startsWith(currentMonthStr))
      .reduce((acc, b) => acc + (parseFloat(b.amount) || 0), 0);
  }, [bills, currentMonthStr]);

  const filteredBills = bills.filter((b) => {
    const matchSearch =
      !searchTerm ||
      b.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.vendor && b.vendor.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingBill(null);
    setFormData({
      ...initialForm,
      billNumber: `INV-${new Date().getFullYear()}-${String(bills.length + 1).padStart(3, '0')}`
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (bill) => {
    setEditingBill(bill);
    setFormData({
      billNumber: bill.billNumber || '',
      description: bill.description || '',
      amount: bill.amount || '',
      date: bill.date || '',
      category: bill.category || 'Cloud & Infrastructure',
      vendor: bill.vendor || '',
      pdfDataUri: bill.pdfDataUri || ''
    });
    setModalOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, pdfDataUri: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.amount) {
      alert('Please provide bill description and amount.');
      return;
    }

    const payload = {
      ...(editingBill ? { id: editingBill.id } : {}),
      ...formData
    };

    await onSaveBill(payload);
    setModalOpen(false);
  };

  const handleDelete = async (bill) => {
    if (confirm(`Delete bill "${bill.billNumber}"?`)) {
      await onDeleteBill(bill.id);
    }
  };

  const exportCSV = () => {
    const headers = ['Bill Number', 'Description', 'Amount', 'Date', 'Category', 'Vendor'];
    const rows = filteredBills.map(b => [
      `"${b.billNumber || ''}"`,
      `"${(b.description || '').replace(/"/g, '""')}"`,
      `"${b.amount || ''}"`,
      `"${b.date || ''}"`,
      `"${b.category || ''}"`,
      `"${b.vendor || ''}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `skillorapath_finance_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [financePill, setFinancePill] = useState('all-staff');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Thin Horizontal Executive Banner (Matching Exact Financial Ledger Blueprint) */}
      <ExecutiveHeroBanner
        title="Financial Ledger & Payroll Overview"
        icon="💰"
        badge="FY 2026-2027"
        metrics={[
          {
            label: "Total Amount",
            value: "₹19,95,000",
            subtext: "45 Registered Invoices",
            subtextColor: "text-emerald-300",
            icon: <Receipt className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: true
          },
          {
            label: "Visitor Total Income",
            value: "₹6,000",
            subtext: "4 Entries Collected",
            subtextColor: "text-purple-300",
            icon: <Users className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-violet-500 to-indigo-500"
          },
          {
            label: "Employee Total Salary",
            value: "₹5,60,000",
            subtext: "15 Active Staff",
            subtextColor: "text-sky-300",
            icon: <Building className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500"
          },
          {
            label: "Total Paid Salary",
            value: "₹4,76,000",
            subtext: "Disbursed & Processed",
            subtextColor: "text-amber-300",
            icon: <CheckCircle2 className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500"
          }
        ]}
        filterTitle="ACCOUNTING STAFF DUTY & ATTENDANCE (AJMER BRANCH)"
        activePill={financePill}
        onPillClick={setFinancePill}
        pills={[
          { id: 'all-staff', label: 'All Staff', count: 5, icon: '👥' },
          { id: 'check-in', label: 'Check-In', count: 5, icon: '📩' },
          { id: 'checked-out', label: 'Checked Out', count: 0, icon: '📤' },
          { id: 'work-hours', label: 'Work', count: '12.5 hrs', icon: '⏱️' },
          { id: 'leave', label: 'Leave', count: 0, icon: '🏖️' },
          { id: 'chatrix', label: 'Chatrix', count: 5, icon: '📊' }
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
            placeholder="Search bill number, vendor, description..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
          >
            <Download className="w-3.5 h-3.5" />
            Export Ledger
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Record New Bill
          </button>
        </div>
      </div>

      {/* Bills Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Bill Number</th>
                <th className="py-4 px-6">Description / Item</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Vendor</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Amount</th>
                <th className="py-4 px-4">PDF Attachment</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center text-slate-400 italic">
                    No expense bills recorded yet.
                  </td>
                </tr>
              ) : (
                filteredBills.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Bill Number */}
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {b.billNumber}
                    </td>

                    {/* Description */}
                    <td className="py-4 px-6 font-semibold text-slate-800 max-w-xs truncate">
                      {b.description}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {b.category || 'General'}
                      </span>
                    </td>

                    {/* Vendor */}
                    <td className="py-4 px-4 text-slate-600">
                      {b.vendor || 'Direct'}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {b.date}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 font-black text-rose-600">
                      ₹{parseFloat(b.amount || 0).toLocaleString()}
                    </td>

                    {/* PDF Attachment */}
                    <td className="py-4 px-4">
                      {b.pdfDataUri ? (
                        <button
                          onClick={() => setPreviewPdf(b.pdfDataUri)}
                          className="px-2.5 py-1 rounded-lg text-sky-600 bg-sky-50 hover:bg-sky-100 font-bold text-[10px] flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Receipt
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">No file</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(b)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Bill Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-black tracking-tight">
                {editingBill ? 'Edit Expense Record' : 'Record New Expense Bill'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Bill / Invoice Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.billNumber}
                    onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Amount (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="e.g. 15000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Bill Description / Item Details *
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Cloud server monthly compute charge"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Expense Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Transaction Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Vendor / Payee
                </label>
                <input
                  type="text"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Upload PDF Invoice / Receipt
                </label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handleFileUpload}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                >
                  {editingBill ? 'Save Record' : 'Record Bill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Receipt Preview Modal */}
      {previewPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-black uppercase">Invoice Receipt Preview</span>
              <button onClick={() => setPreviewPdf(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe src={previewPdf} title="Receipt Preview" className="w-full h-full border-none" />
          </div>
        </div>
      )}
    </div>
  );
}

