// src/lib/supabase.ts
  // Resilient Supabase client implementation
  let createSupabaseClient;
  
  try {
    // Try to import from @supabase/supabase-js
    createSupabaseClient = require('@supabase/supabase-js').createClient;
  } catch (e) {
    // Fallback implementation if module not found
    console.warn('Supabase module not found, using fallback client');
    createSupabaseClient = (url, key) => {
      console.warn('Using mock Supabase client - database operations will not work');
      // Return a mock client that won't break the app
      return {
        from: () => ({
          select: () => ({ data: null, error: new Error('Supabase not available') }),
          insert: () => ({ data: null, error: new Error('Supabase not available') }),
          update: () => ({ data: null, error: new Error('Supabase not available') }),
          delete: () => ({ data: null, error: new Error('Supabase not available') }),
        }),
        auth: {
          getSession: () => Promise.resolve({ data: { session: null }, error: null }),
          getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        }
      };
    };
  }
  
  export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials are missing');
    }
    
    try {
      return createSupabaseClient(supabaseUrl, supabaseAnonKey);
    } catch (error) {
      console.error('Error creating Supabase client:', error);
      // Return a dummy client to prevent app crashes
      return {
        from: () => ({
          select: () => ({ data: null, error: new Error('Supabase client creation failed') }),
        }),
        auth: {
          getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        }
      };
    }
  }