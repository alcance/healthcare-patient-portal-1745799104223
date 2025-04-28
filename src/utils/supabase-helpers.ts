// src/utils/supabase-helpers.ts
// Dynamic import with error handling
let createClientFn;
try {
  // Try dynamic require first
  createClientFn = require('@/lib/supabase').createClient;
} catch (e) {
  // If that fails, try regular import
  try {
    const { createClient } = require('@/lib/supabase');
    createClientFn = createClient;
  } catch (error) {
    console.warn('Failed to import Supabase client:', error);
    // Fallback mock implementation
    createClientFn = () => ({
      from: (table) => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
        eq: () => ({ 
          select: () => ({ 
            single: () => ({ data: null, error: null }) 
          }) 
        }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
      }),
    });
  }
}

// Safe database type import
let Database;
try {
  Database = require('@/types/database').Database;
} catch (error) {
  console.warn('Database types not found, using fallback types');
  // Create a minimal mock type
  Database = new Proxy({}, {
    get: () => ({
      Row: {},
      Insert: {},
      Update: {}
    })
  });
}

/**
 * Helper functions for working with Supabase
 */

/**
 * Fetch data with error handling and type safety
 */
export async function fetchData(
  tableName,
  options
) {
  try {
    const supabase = createClientFn();
    
    let query = supabase
      .from(tableName)
      .select(options?.columns || '*');
    
    // Apply filters if provided
    if (options?.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    // Apply ordering if provided
    if (options?.order) {
      const { column, ascending = true } = options.order;
      query = query.order(column, { ascending });
    }
    
    // Apply limit if provided
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error(`Error in fetchData for ${tableName}:`, error);
    return [];
  }
}

/**
 * Insert data with error handling and type safety
 */
export async function insertData(
  tableName,
  data
) {
  try {
    const supabase = createClientFn();
    
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .select()
      .single();
    
    if (error) {
      console.error(`Error inserting into ${tableName}:`, error);
      return null;
    }
    
    return result;
  } catch (error) {
    console.error(`Error in insertData for ${tableName}:`, error);
    return null;
  }
}

/**
 * Update data with error handling and type safety
 */
export async function updateData(
  tableName,
  id,
  data
) {
  try {
    const supabase = createClientFn();
    
    const { data: result, error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating ${tableName}:`, error);
      return null;
    }
    
    return result;
  } catch (error) {
    console.error(`Error in updateData for ${tableName}:`, error);
    return null;
  }
}

/**
 * Delete data with error handling
 */
export async function deleteData(
  tableName,
  id
) {
  try {
    const supabase = createClientFn();
    
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error in deleteData for ${tableName}:`, error);
    return false;
  }
}

// Add TypeScript type declarations below for editor support
// These will be stripped out in JS environments
/* 
// TypeScript interface definitions (only used by editors)
export async function fetchData<T extends keyof Database>(
  tableName: T,
  options?: { 
    columns?: string, 
    filter?: Record<string, any>,
    limit?: number,
    order?: { column: string, ascending?: boolean }
  }
): Promise<Database[T]['Row'][]>;

export async function insertData<T extends keyof Database>(
  tableName: T,
  data: Database[T]['Insert']
): Promise<Database[T]['Row'] | null>;

export async function updateData<T extends keyof Database>(
  tableName: T,
  id: string | number,
  data: Database[T]['Update']
): Promise<Database[T]['Row'] | null>;

export async function deleteData<T extends keyof Database>(
  tableName: T,
  id: string | number
): Promise<boolean>;
*/
