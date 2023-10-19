#!/bin/sh
source .env.local
echo $SUPABASE_PROJECT_REF
echo $SUPABASE_ACCESS_TOKEN | npx supabase login
npx supabase gen types typescript --project-id $SUPABASE_PROJECT_REF > ./src/supabase/database.types.ts