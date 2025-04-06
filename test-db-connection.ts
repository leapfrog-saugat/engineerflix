import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

// Load environment variables
dotenv.config();

async function testSupabaseConnection() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    console.log('✅ Successfully connected to Supabase!');
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:');
    console.error(error);
  }
}

async function testPostgresConnection() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ Missing DATABASE_URL in .env file');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Successfully connected to PostgreSQL!');
    console.log('Current database time:', result.rows[0].now);
    client.release();
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL:');
    console.error(error);
  } finally {
    await pool.end();
  }
}

async function runTests() {
  console.log('Testing Supabase connection...');
  await testSupabaseConnection();
  
  console.log('\nTesting PostgreSQL connection...');
  await testPostgresConnection();
}

runTests(); 