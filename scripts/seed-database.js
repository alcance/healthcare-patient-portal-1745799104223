#!/usr/bin/env node
// Seed script for Supabase
// Run with: node scripts/seed-database.js
// Make sure to set up SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Important: This uses the service role key which has admin privileges
// Never expose this key in client-side code
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Seeding database...');
  
  // Seed Provider data
  const providerData = [
  {
    "id": "1",
    "firstName": "John",
    "lastName": "Smith",
    "specialization": "Family Medicine",
    "licenseNumber": "MD12345",
    "email": "dr.smith@clinic.com"
  },
  {
    "id": "2",
    "firstName": "Sarah",
    "lastName": "Johnson",
    "specialization": "Dermatology",
    "licenseNumber": "MD67890",
    "email": "dr.johnson@clinic.com"
  }
];

  console.log('Seeding provider...');
  for (const item of providerData) {
    const { data, error } = await supabase
      .from('provider')
      .upsert(item, { onConflict: 'id' });

    if (error) {
      console.error(`Error inserting ${item.id || 'item'} into provider:`, error);
    } else {
      console.log(`Inserted provider ${item.id || 'item'}`);
    }
  }

  console.log('Database seeding completed!');
}

seedDatabase()
  .catch(error => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
