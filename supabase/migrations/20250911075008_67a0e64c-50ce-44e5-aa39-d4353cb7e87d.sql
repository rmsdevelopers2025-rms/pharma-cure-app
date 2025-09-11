-- Enable RLS on user tables only (skip system-managed wrappers_fdw_stats)
-- This fixes linter 0013 while preserving existing functionality

-- These tables already have RLS enabled, but ensuring it's explicit
alter table public.drugs enable row level security;
alter table public.nearby_pharmacies enable row level security;
alter table public.prescriptions enable row level security;
alter table public.profiles enable row level security;
alter table public.search_history enable row level security;
alter table public.user_subscriptions enable row level security;