import type { BaseResource } from './base';
import type { Car } from './car';

export interface Booking extends BaseResource {
  car: Omit<Car, 'stock' | 'averagePricePerDay' | 'totalPrice'>;
  email: string;
  startDate: string;
  endDate: string;
  averagePricePerday: number;
  totalPrice: number;
}

export type BookingSummary = Omit<Booking, 'id'>;
