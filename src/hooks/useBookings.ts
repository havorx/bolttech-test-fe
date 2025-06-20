import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { handleError } from '@/lib/api-error';
import {
  createBooking,
  getBooking,
  type CreateBookingPayload,
} from '@/api/booking';
import type { Booking } from '@/models/booking';

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      return await createBooking(payload);
    },
    onSuccess: () => {
      toast.success('Booking successful!');
    },
    onError: (error) => {
      handleError(error, 'Booking failed');
    },
  });
}

export function useBookingDetail(id: string) {
  return useQuery<Booking>({
    queryKey: ['booking', id],
    queryFn: async () => {
      return await getBooking(id);
    },
  });
}
