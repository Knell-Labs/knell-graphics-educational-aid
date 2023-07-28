import { createClient } from '@supabase/supabase-js'
import { Database } from '../supabase-types/database.types'

export const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE ?? ''
)
