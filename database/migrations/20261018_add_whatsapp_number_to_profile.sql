ALTER TABLE public.profile
ADD COLUMN IF NOT EXISTS whatsapp_number text;

NOTIFY pgrst, 'reload schema';
