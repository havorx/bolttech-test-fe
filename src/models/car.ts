import type { BaseResource } from './base';

export interface Car extends BaseResource {
  brand: string;
  model: string;
  stock: number;
  averagePricePerDay: number;
  totalPrice: number;
}
