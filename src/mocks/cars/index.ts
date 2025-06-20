// src/lib/mockApi.ts

import type { Car } from '@/models/car';

export const mockGetAvailableCars = async (): Promise<Car[]> => {
  return [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Yaris',
      stock: 3,
      averagePricePerDay: 98.43,
      totalPrice: 196.86,
    },
    {
      id: '2',
      brand: 'Seat',
      model: 'Ibiza',
      stock: 5,
      averagePricePerDay: 85.12,
      totalPrice: 170.24,
    },
    {
      id: '3',
      brand: 'Nissan',
      model: 'Qashqai',
      stock: 2,
      averagePricePerDay: 101.46,
      totalPrice: 202.92,
    },
    {
      id: '4',
      brand: 'Jaguar',
      model: 'e-pace',
      stock: 1,
      averagePricePerDay: 120.54,
      totalPrice: 241.08,
    },
    {
      id: '5',
      brand: 'Mercedes',
      model: 'Vito',
      stock: 2,
      averagePricePerDay: 109.16,
      totalPrice: 218.32,
    },
  ];
};
