-- Fix search path for existing functions
ALTER FUNCTION public.search_drugs(text) SET search_path = public;
ALTER FUNCTION public.get_auto_correct_suggestion(text) SET search_path = public;