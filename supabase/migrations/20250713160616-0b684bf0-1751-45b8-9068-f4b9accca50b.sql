-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('customer', 'owner')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shops table for owner shops
CREATE TABLE public.shops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  phone TEXT,
  photo_url TEXT,
  total_seats INTEGER NOT NULL DEFAULT 0,
  wifi_available BOOLEAN DEFAULT false,
  power_outlets BOOLEAN DEFAULT false,
  food_available BOOLEAN DEFAULT false,
  quiet_environment BOOLEAN DEFAULT false,
  parking_available BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create seat requests table
CREATE TABLE public.seat_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seat_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for shops
CREATE POLICY "Anyone can view active shops" 
ON public.shops 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Owners can manage their own shops" 
ON public.shops 
FOR ALL 
USING (owner_id = auth.uid());

-- Create policies for seat requests
CREATE POLICY "Users can view their own seat requests" 
ON public.seat_requests 
FOR SELECT 
USING (customer_id = auth.uid());

CREATE POLICY "Shop owners can view requests for their shops" 
ON public.seat_requests 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.shops 
  WHERE shops.id = seat_requests.shop_id 
  AND shops.owner_id = auth.uid()
));

CREATE POLICY "Customers can create seat requests" 
ON public.seat_requests 
FOR INSERT 
WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Shop owners can update requests for their shops" 
ON public.seat_requests 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.shops 
  WHERE shops.id = seat_requests.shop_id 
  AND shops.owner_id = auth.uid()
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shops_updated_at
  BEFORE UPDATE ON public.shops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seat_requests_updated_at
  BEFORE UPDATE ON public.seat_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'user_type'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for shop photos
INSERT INTO storage.buckets (id, name, public) VALUES ('shop-photos', 'shop-photos', true);

-- Create storage policies for shop photos
CREATE POLICY "Shop photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'shop-photos');

CREATE POLICY "Shop owners can upload photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'shop-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Shop owners can update their photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'shop-photos' AND auth.uid()::text = (storage.foldername(name))[1]);