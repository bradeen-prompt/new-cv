import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

function loadEnv() {
  try {
    const envPath = path.resolve('.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let key = match[1];
        let value = match[2] || '';
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        envVars[key] = value;
      }
    });
    return envVars;
  } catch (error) {
    console.error('Could not load .env file');
    return {};
  }
}

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key not found in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  // A simple test is to fetch a public table or just call an RPC, but we can also just select from a non-existent table and check if the error is "relation does not exist" vs network error. Or we can just get the session or check auth.
  const { data, error } = await supabase.from('_non_existent_table_').select('*').limit(1);
  if (error) {
    if (error.code === '42P01' || error.message.includes('relation') || error.code === 'PGRST116' || error.code === 'PGRST204') {
       // Table doesn't exist, which means we successfully connected to the API!
       console.log('Supabase connection successful!');
       return;
    }
    // Auth errors or network errors
    console.error('Supabase connection error:', error.message);
  } else {
    console.log('Supabase connection successful!');
  }
}

testConnection();
