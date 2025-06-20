import { z } from 'zod/v4';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { createBookingSchema } from '@/lib/schemas/booking';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateBooking } from '@/hooks/useBookings';
import { handleError } from '@/lib/api-error';
import type { Car } from '@/models/car';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { toISODate } from '@/common/utils';
import type { CreateBookingPayload } from '@/api/booking';

const BookingFormSchema = createBookingSchema.omit({
  carId: true,
  startDate: true,
  endDate: true,
});

type BookingFormData = z.input<typeof BookingFormSchema>;

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (bookingId: string) => void;
  onSubmitSuccess?: (data: CreateBookingPayload) => void;
  car: Car;
  from: Date;
  to: Date;
}

export default function BookingModal({
  open,
  onClose,
  onSuccess,
  car,
  from,
  to,
}: BookingModalProps) {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
  });

  const mutation = useCreateBooking();

  const onSubmit = (values: BookingFormData) => {
    try {
      const payload = {
        ...values,
        carId: car.id ?? car.id,
        drivingLicenseExpiry: toISODate(values.drivingLicenseExpiry),
        startDate: toISODate(from),
        endDate: toISODate(to),
      };

      mutation.mutate(payload, {
        onSuccess: (booking) => {
          form.reset();
          onClose();
          console.log(booking);
          onSuccess?.(booking.id);
        },
      });
    } catch (error) {
      handleError(error, 'Invalid input');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Book {car.brand} {car.model}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="drivingLicense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving License</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="drivingLicenseExpiry"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>License Expiry</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Pick a date'}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-muted-foreground text-sm">
              Booking: {from.toDateString()} → {to.toDateString()}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              Confirm Booking
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
