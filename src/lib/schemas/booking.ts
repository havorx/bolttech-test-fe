import { z } from 'zod/v4';

export const createBookingSchema = z
  .object({
    carId: z.string(),

    email: z.email(),

    drivingLicense: z.string().regex(/^[A-Z0-9-]+$/, {
      message: 'License must contain only A-Z, 0-9, or -',
    }),

    drivingLicenseExpiry: z.date({
      message: 'Expiry must be a valid ISO datetime string',
    }),

    startDate: z.iso.datetime(),

    endDate: z.iso.datetime(),
  })
  .refine(
    (data) => new Date(data.drivingLicenseExpiry) > new Date(data.startDate),
    {
      message: 'License must be valid through the booking period',
      path: ['drivingLicenseExpiry'],
    },
  )
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: 'End date must be after start date',
    path: ['endDate'],
  });

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
