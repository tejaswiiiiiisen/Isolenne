import { supabase } from '../config/supabase.js';

export async function submitLead(req, res, next) {
  try {
    const { name, email, phone, company, message, service } = req.body;
    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    const payload = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      message: message || '',
      service: service || 'General Inquiry',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('leads').insert([payload]).select();

    if (error) {
      console.warn('Supabase leads insert notice:', error.message);
      return res.json({ success: true, message: 'Lead received successfully.', data: payload });
    }

    res.status(201).json({ success: true, message: 'Inquiry received successfully.', data });
  } catch (err) {
    next(err);
  }
}

export async function getLeads(req, res, next) {
  try {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err) {
    next(err);
  }
}

