-- Create the users table
create table if not exists users (
    id uuid         default gen_random_uuid() primary key,
    created_at      timestamp with time zone default timezone('utc'::text, now()) not null,
    username        text unique,
    email           text unique not null,
    hashed_password text not null,
    user_role       text default 'user',
    is_active       boolean default true
);

-- Enable Row Level Security (RLS)
alter table users enable row level security;
alter table users force row level security;

-- Define RLS policies

-- Allow authenticated users to view their own profile
create policy "Users can view their own profile" on users
    for select using (id = auth.uid());

-- Allow authenticated users to update their own profile (excluding role and is_active for security reasons)
create policy "Users can update their own profile" on users
    for update using (id = auth.uid())
    with check (id = auth.uid() and user_role = old.user_role and is_active = old.is_active);

-- Allow admins to view all users
create policy "Admins can view all profiles" on users
    for select to admin using (true);

-- Allow admins to modify all user data
create policy "Admins can modify all profiles" on users
    for all to admin using (true);

-- Activate the policies
alter table users force row level security;

-- Here, we are allowing authenticated users to select and update their own data, 
-- but only admins can view and modify all user data.
alter table users alter default privileges in schema public grant select, update on users to authenticated;
alter table users alter default privileges in schema public grant all on users to admin;
