import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envConfig = dotenv.parse(fs.readFileSync(path.resolve('.env.local')));
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbGdhYXpvam93bXltbXhwZGpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTAwMzc1NSwiZXhwIjoyMTAwNTc5NzU1fQ.nSNAD6EVqz88wzxxCh5UPV3ZGWQJHTItSmJVs89aBOU";

const supabase = createClient(envConfig.VITE_SUPABASE_URL, SERVICE_ROLE_KEY);

async function updateNumber() {
  const { error } = await supabase
    .from('settings')
    .update({ value: '"+91 866 816 0867"' })
    .eq('key', 'whatsapp_number');
    
  if (error) {
    console.error("Error updating number:", error.message);
  } else {
    console.log("Successfully updated WhatsApp number!");
  }
}

updateNumber();
