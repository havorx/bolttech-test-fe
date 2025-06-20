import { api } from '@/lib/axios';
import type { CreateBookingInput } from '@/lib/schemas/booking';
import type { Booking } from '@/models/booking';

export type CreateBookingPayload = Omit<
  CreateBookingInput,
  'drivingLicenseExpiry'
> & {
  drivingLicenseExpiry: string;
};

export async function createBooking(
  data: CreateBookingPayload,
): Promise<Booking> {
  const res = await api.post('/bookings', data);
  return res.data;
}

export async function getBooking(id: string) {
  const res = await api.get(`/bookings/${id}`);
  return res.data;
}
