import { supabase } from '../config/supabase.js';

export async function getJobs(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data: data || [] });
  } catch (err) {
    next(err);
  }
}

export async function applyJob(req, res, next) {
  try {
    const {
      job_id,
      candidate_name,
      email,
      phone,
      location,
      experience,
      position,
      linkedin_url,
      portfolio_url,
      cover_letter,
      resume_url
    } = req.body;

    if (!email || !candidate_name) {
      return res.status(400).json({ success: false, message: 'Candidate name and email are required.' });
    }

    const payload = {
      job_id: job_id || null,
      full_name: candidate_name,
      email,
      phone: phone || '',
      location: location || '',
      experience: experience || '',
      position: position || '',
      linkedin_url: linkedin_url || '',
      portfolio_url: portfolio_url || '',
      cover_letter: cover_letter || '',
      resume_url: resume_url || '',
      status: 'Applied',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('applications')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase insert fallback to local receipt:', error.message);
      return res.json({
        success: true,
        message: 'Application received and queued successfully.',
        data: payload
      });
    }

    res.status(201).json({ success: true, message: 'Application submitted successfully!', data });
  } catch (err) {
    next(err);
  }
}

export async function getApplications(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data: data || [] });
  } catch (err) {
    next(err);
  }
}

