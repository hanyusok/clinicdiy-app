-- Drop NOT NULL constraint on email
ALTER TABLE public.profiles ALTER COLUMN email DROP NOT NULL;

-- Update trigger to handle missing emails
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  generated_email text;
  generated_username text;
BEGIN
  -- Fallback to a local UUID email if missing
  generated_email := COALESCE(new.email, new.id::text || '@no-email.local');
  
  -- Try to extract a name from raw_user_meta_data, fallback to the email prefix
  generated_username := COALESCE(
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'name', 
    split_part(generated_email, '@', 1)
  );
  
  INSERT INTO public.profiles (id, email, username)
  VALUES (new.id, generated_email, generated_username);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
