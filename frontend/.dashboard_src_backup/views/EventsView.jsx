import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  MapPin,
  X,
  Upload
} from 'lucide-react';

export default function EventsView({
  events = [],
  onSaveEvent,
  onDeleteEvent
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const initialForm = {
    title: '',
    date: new Date().toISOString().slice(0, 10),
    description: '',
    location: 'AgniX Headquarters, Ajmer',
    image: '/agnix-ad.webp'
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingEvent(evt);
    setFormData({
      title: evt.title || '',
      date: evt.date || '',
      description: evt.description || '',
      location: evt.location || '',
      image: evt.image || '/agnix-ad.webp'
    });
    setModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide event title.');
      return;
    }

    const payload = {
      ...(editingEvent ? { id: editingEvent.id } : {}),
      ...formData
    };

    await onSaveEvent(payload);
    setModalOpen(false);
  };

  const handleDelete = async (evt) => {
    if (confirm(`Delete event "${evt.title}"?`)) {
      await onDeleteEvent(evt.id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            Company Events & Culture Media
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Internal milestones, hackathons, and celebrations
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Add Company Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={evt.image || '/agnix-ad.webp'}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-slate-900/80 backdrop-blur-md text-white">
                  {evt.date}
                </span>
              </div>

              <div className="p-5">
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {evt.title}
                </h4>
                {evt.location && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mt-1">
                    <MapPin className="w-3 h-3" />
                    {evt.location}
                  </span>
                )}
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-1">
              <button
                onClick={() => handleOpenEdit(evt)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-white"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(evt)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-white"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-black tracking-tight">
                {editingEvent ? 'Edit Event' : 'Add Event & Photo'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Hackathon 2026"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Ajmer HQ"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Event Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Upload Event Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
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
                  {editingEvent ? 'Save Event' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

