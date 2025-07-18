
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useContactForm = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([formData]);
      
      if (dbError) {
        throw new Error(dbError.message);
      }

      // Send email via edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) {
        console.error('Email sending error:', error);
        // Don't throw error here as the message is already saved to DB
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for your message. We will get back to you soon.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
