-- 1. Add new categories to post_category
ALTER TYPE post_category ADD VALUE IF NOT EXISTS 'legal';
ALTER TYPE post_category ADD VALUE IF NOT EXISTS 'space_opt';

-- 2. Portfolios (Content Layer)
CREATE TABLE public.portfolios (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  specialty text NOT NULL, -- 진료과목 (내과, 소아과, 피부과 등)
  size_pyeong integer NOT NULL, -- 평수
  scope text NOT NULL, -- 시공범위 (전체, 부분, 리모델링)
  budget_range text, -- 예산
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Portfolio Images
CREATE TABLE public.portfolio_images (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id uuid REFERENCES public.portfolios(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  cad_pdf_url text, -- 의료용 동선 도면
  lighting_info text, -- 조명 조도
  materials_info text, -- 마감재 항균 정보
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Products (Commerce Layer - Inquiry System)
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL, -- 병원용 특화 가구, 친환경/항균 인테리어 자재, 조명 및 인테리어 소품, DIY 시공 키트
  name text NOT NULL,
  description text,
  price integer,
  image_url text,
  vendor_name text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Image Tags (Shopping tags on portfolio images managed by admin)
CREATE TABLE public.image_tags (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id uuid REFERENCES public.portfolio_images(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  x_coordinate numeric NOT NULL, -- 0.0 to 100.0 percentage
  y_coordinate numeric NOT NULL, -- 0.0 to 100.0 percentage
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Service Requests (Commerce Layer - Service Matching)
CREATE TABLE public.service_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  service_type text NOT NULL, -- 간판, 전기, 배관 등
  details text NOT NULL,
  status text DEFAULT 'pending', -- pending, contacted, completed
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.image_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Portfolios RLS
CREATE POLICY "Portfolios are viewable by everyone." ON public.portfolios FOR SELECT USING (true);
CREATE POLICY "Users can insert their own portfolios." ON public.portfolios FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own portfolios." ON public.portfolios FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own portfolios." ON public.portfolios FOR DELETE USING (auth.uid() = user_id);

-- Portfolio Images RLS
CREATE POLICY "Portfolio images are viewable by everyone." ON public.portfolio_images FOR SELECT USING (true);
CREATE POLICY "Users can insert images for their portfolios." ON public.portfolio_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.portfolios WHERE id = portfolio_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update their portfolio images." ON public.portfolio_images FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE id = portfolio_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete their portfolio images." ON public.portfolio_images FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE id = portfolio_id AND user_id = auth.uid())
);

-- Products RLS (Viewable by everyone, insert/update managed by admin/internal for now)
CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (true);
CREATE POLICY "Public insert products." ON public.products FOR INSERT WITH CHECK (true);

-- Image Tags RLS
CREATE POLICY "Image tags are viewable by everyone." ON public.image_tags FOR SELECT USING (true);
CREATE POLICY "Public insert image tags." ON public.image_tags FOR INSERT WITH CHECK (true);

-- Service Requests RLS
CREATE POLICY "Users can view their own requests." ON public.service_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own requests." ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
