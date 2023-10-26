#!/bin/sh

# Check if .env.local exists and source it if it does
if [ -f ".env.local" ]; then
    source .env.local
fi

echo $SUPABASE_ACCESS_TOKEN | npx supabase login

npx supabase gen types typescript --project-id $SUPABASE_PROJECT_REF > ./src/supabase/database.types.ts