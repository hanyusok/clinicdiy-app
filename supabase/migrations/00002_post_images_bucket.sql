-- Create the post-images bucket
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true);

-- Enable RLS
alter table storage.objects enable row level security;

-- Policies for post-images
create policy "Public access to post-images"
  on storage.objects for select
  using ( bucket_id = 'post-images' );

create policy "Authenticated users can upload to post-images"
  on storage.objects for insert
  with check ( bucket_id = 'post-images' and auth.role() = 'authenticated' );

create policy "Users can update their own images in post-images"
  on storage.objects for update
  using ( bucket_id = 'post-images' and auth.uid() = owner );

create policy "Users can delete their own images in post-images"
  on storage.objects for delete
  using ( bucket_id = 'post-images' and auth.uid() = owner );
