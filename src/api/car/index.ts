import { handleError } from '@/lib/api-error';
import { api } from '@/lib/axios';
import { mockGetAvailableCars } from '@/mocks/cars';

const useMock = import.meta.env.VITE_API_USE_MOCK;

export async function getCars(startDate: Date, endDate: Date) {
  if (useMock === 'true') {
    return await mockGetAvailableCars();
  }

  try {
    const res = await api.get('/cars', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        availableOnly: true,
      },
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    handleError(error, 'Failed to load available cars');
    throw error;
  }
}
