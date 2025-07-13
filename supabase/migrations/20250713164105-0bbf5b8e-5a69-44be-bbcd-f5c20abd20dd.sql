-- Add additional fields to profiles table for customer and owner data
ALTER TABLE public.profiles 
ADD COLUMN city text,
ADD COLUMN state text;

-- Update shops table to include description field if not exists
ALTER TABLE public.shops 
ADD COLUMN IF NOT EXISTS description text;

-- Create a trigger to update the updated_at column for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();