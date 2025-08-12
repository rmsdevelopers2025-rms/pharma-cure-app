-- Create a profiles table to store user information
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  age integer,
  height integer,
  weight integer,
  sex text,
  email text,
  medical_info text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies: users can manage only their own profile
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can delete their own profile"
  on public.profiles for delete
  using (auth.uid() = id);

-- Function to update updated_at automatically
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Create a trigger to insert a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, age, height, weight, sex, email, medical_info)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', null),
    coalesce((new.raw_user_meta_data ->> 'age')::int, null),
    coalesce((new.raw_user_meta_data ->> 'height')::int, null),
    coalesce((new.raw_user_meta_data ->> 'weight')::int, null),
    coalesce(new.raw_user_meta_data ->> 'sex', null),
    coalesce(new.raw_user_meta_data ->> 'email', new.email),
    coalesce(new.raw_user_meta_data ->> 'medicalInfo', null)
  );
  return new;
end;
$$;

-- Trigger: on auth.users insert
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();