-- Enable RLS on all public tables to satisfy linter 0013 and preserve existing behavior
-- Note: Enabling RLS is idempotent and safe if already enabled

alter table if exists public.drugs enable row level security;
alter table if exists public.nearby_pharmacies enable row level security;
alter table if exists public.prescriptions enable row level security;
alter table if exists public.profiles enable row level security;
alter table if exists public.search_history enable row level security;
alter table if exists public.user_subscriptions enable row level security;

-- Lock down internal stats table (not used by the app) by enabling RLS with no public policies
alter table if exists public.wrappers_fdw_stats enable row level security;