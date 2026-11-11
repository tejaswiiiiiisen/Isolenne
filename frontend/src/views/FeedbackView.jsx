import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Search,
  Filter,
  Plus,
  Star,
  User,
  Quote,
  Sparkles
} from 'lucide-react';
import ExecutiveHeroBanner from '../components/common/ExecutiveHeroBanner';

export default function FeedbackView({
  feedback = [],
  onSaveFeedback
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    intern_name: 'Manas Suryavanshi',
    mentor_name: 'Tejaswi Sen',
    role: 'AI & Machine Learning Intern',
    technical_skills: 5,
    communication: 5,
    teamwork: 5,
    punctuality: 5,
    mentor_feedback: '',
    intern_feedback: ''
  });

  const filtered = feedback.filter(f =>
    !searchTerm ||
    f.intern_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.mentor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const overall = (
      (formData.technical_skills +
        formData.communication +
        formData.teamwork +
        formData.punctuality) / 4
    ).toFixed(1);

    onSaveFeedback({
      ...formData,
      overall_rating: parseFloat(overall)
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Thin Horizontal Executive Banner */}
      <ExecutiveHeroBanner
        title="360° Feedback & Performance Appraisals"
        icon="⭐"
        badge="TALENT EVALUATION"
        metrics={[
          {
            label: "Total Appraisals Logged",
            value: `${feedback.length} Appraisals`,
            subtext: "Mentors & Interns",
            subtextColor: "text-emerald-300",
            icon: <MessageSquareQuote className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            highlight: true
          },
          {
            label: "Average Rating Score",
            value: "4.9 / 5.0",
            subtext: "Top Performing Cohort",
            subtextColor: "text-amber-300",
            icon: <Star className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500"
          },
          {
            label: "Mentor Recommendations",
            value: "100% Positive",
            subtext: "Hiring Endorsements",
            subtextColor: "text-sky-300",
            icon: <Sparkles className="w-5 h-5 text-white" />,
            iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500"
          }
        ]}
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">360° Feedback & Evaluation</h2>
            <p className="text-xs text-slate-500 font-medium">
              Comprehensive performance appraisal, mentor reviews & intern feedback
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Appraisal Form</span>
        </button>
      </div>

      {/* Feedback Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">{item.intern_name}</h3>
                  <p className="text-xs font-semibold text-slate-500">{item.role}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-amber-700 font-black text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.overall_rating} / 5.0</span>
                </div>
              </div>

              {/* Competency Ratings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Technical</span>
                  <div className="text-sm font-black text-slate-800 mt-0.5">{item.technical_skills}★</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Comms</span>
                  <div className="text-sm font-black text-slate-800 mt-0.5">{item.communication}★</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Teamwork</span>
                  <div className="text-sm font-black text-slate-800 mt-0.5">{item.teamwork}★</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Punctuality</span>
                  <div className="text-sm font-black text-slate-800 mt-0.5">{item.punctuality}★</div>
                </div>
              </div>

              {/* Mentor Feedback Quote */}
              {item.mentor_feedback && (
                <div className="mt-4 p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-800 text-[11px]">
                    <Quote className="w-3 h-3" />
                    <span>Mentor Review ({item.mentor_name})</span>
                  </div>
                  <p className="italic leading-relaxed">"{item.mentor_feedback}"</p>
                </div>
              )}

              {/* Intern Feedback Quote */}
              {item.intern_feedback && (
                <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-600 text-[11px]">
                    <Quote className="w-3 h-3" />
                    <span>Intern Experience & Reflection</span>
                  </div>
                  <p className="italic leading-relaxed">"{item.intern_feedback}"</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Appraisal Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Submit Performance Appraisal</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Intern Name</label>
                  <input
                    type="text"
                    required
                    value={formData.intern_name}
                    onChange={(e) => setFormData({ ...formData, intern_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mentor Name</label>
                  <input
                    type="text"
                    required
                    value={formData.mentor_name}
                    onChange={(e) => setFormData({ ...formData, mentor_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mentor Written Review</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Evaluate problem solving, execution speed, ownership..."
                  value={formData.mentor_feedback}
                  onChange={(e) => setFormData({ ...formData, mentor_feedback: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Intern Self-Reflection</label>
                <textarea
                  rows="2"
                  placeholder="Key learnings, challenges overcome, suggestions..."
                  value={formData.intern_feedback}
                  onChange={(e) => setFormData({ ...formData, intern_feedback: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-md shadow-indigo-500/20"
              >
                Save Appraisal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

