import { supabase } from './db'
import { PostgrestError } from '@supabase/supabase-js';


export async function testSupabase () {
    try {
        const { data, error } = await supabase.from('TestTable').select('*');
        if (data) {
            console.log('Query result:', data);
        } else if (error) {
            console.error('Error occurred:', (error as PostgrestError).message);
        }
    } catch (error) {
        console.error('Error occurred:', (error as PostgrestError).message);
    }
}
