CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  order_number text NOT NULL,
  figurine_price numeric(10,2) NOT NULL DEFAULT 0,
  delivery_price numeric(10,2) NOT NULL DEFAULT 0,
  delivery_label text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'W realizacji',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners insert orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'W realizacji');