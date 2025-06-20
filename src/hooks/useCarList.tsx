import { getCars } from '@/api/car';
import type { Car } from '@/models/car';
import { useQuery } from '@tanstack/react-query';

export function useCarList(from?: Date, to?: Date) {
  return useQuery<Car[]>({
    queryKey: ['cars', from, to],
    queryFn: async () => {
      if (from && to) {
        return await getCars(from, to);
      }
      return [];
    },
    enabled: !!from && !!to,
  });
}
