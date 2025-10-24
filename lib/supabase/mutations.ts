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

export async function createRoom(roomData: any) {
  try {
    const client = initializeSupabase();
    
    if (!client) {
      return { success: false, error: 'Supabase client not initialized' };
    }

    const { data, error } = await client
      .from('listing')
      .insert([roomData])
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Error creating room:', error);
    }
    return { success: false, error: 'Failed to create room' };
  }
}

export async function createOpportunity(opportunityData: any) {
  try {
    const client = initializeSupabase();
    
    if (!client) {
      return { success: false, error: 'Supabase client not initialized' };
    }

    const { data, error } = await client
      .from('opportunity')
      .insert([opportunityData])
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Error creating opportunity:', error);
    }
    return { success: false, error: 'Failed to create opportunity' };
  }
}

export async function createItem(itemData: any) {
  try {
    const client = initializeSupabase();
    
    if (!client) {
      return { success: false, error: 'Supabase client not initialized' };
    }

    const { data, error } = await client
      .from('market')
      .insert([itemData])
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Error creating item:', error);
    }
    return { success: false, error: 'Failed to create item listing' };
  }
}
