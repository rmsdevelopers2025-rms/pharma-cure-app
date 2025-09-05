-- Create storage bucket for prescriptions if it doesn't exist
insert into storage.buckets (id, name, public)
values ('prescriptions', 'prescriptions', false)
on conflict (id) do nothing;

-- Policies for prescriptions bucket (private: only owner can access)
create policy "Users can view their own prescription images"
  on storage.objects for select
  using (
    bucket_id = 'prescriptions'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can upload their own prescription images"
  on storage.objects for insert
  with check (
    bucket_id = 'prescriptions'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own prescription images"
  on storage.objects for update
  using (
    bucket_id = 'prescriptions'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own prescription images"
  on storage.objects for delete
  using (
    bucket_id = 'prescriptions'
    and auth.uid()::text = (storage.foldername(name))[1]
  );