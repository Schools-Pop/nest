'use client';

import { createClient } from '@supabase/supabase-js';

let supabase: any = null;

function initializeSupabase() {
  if (supabase) return supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (typeof window !== 'undefined') {
      console.error('Missing Supabase environment variables');
    }
    return null;
  }

  supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

export async function getItems() {
  try {
    const client = initializeSupabase();
    
    if (!client) {
      return { success: false, error: 'Supabase client not initialized', data: [] };
    }

    const { data, error } = await client
      .from('market')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Error fetching items:', error);
    }
    return { success: false, error: 'Failed to fetch items', data: [] };
  }
}

export async function getOpportunities() {
  try {
    const client = initializeSupabase();
    
    if (!client) {
      return { success: false, error: 'Supabase client not initialized', data: [] };
    }

    const { data, error } = await client
      .from('opportunity')
      .select('*')
      .order('deadline', { ascending: true });

    if (error) {
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Error fetching opportunities:', error);
    }
    return { success: false, error: 'Failed to fetch opportunities', data: [] };
  }
}

export async function getListings() {
  try {
    const client = initializeSupabase();
    
    if (!client) {
      return { success: false, error: 'Supabase client not initialized', data: [] };
    }

    const { data, error } = await client
      .from('listing')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Error fetching listings:', error);
    }
    return { success: false, error: 'Failed to fetch listings', data: [] };
  }
}
