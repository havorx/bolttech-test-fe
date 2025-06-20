// src/components/features/booking/BookingSummaryModal.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useBookingDetail } from '@/hooks/useBookings';

interface BookingSummaryModalProps {
  open: boolean;
  onClose: () => void;
  bookingId: string;
}

export default function BookingSummaryModal({
  open,
  onClose,
  bookingId,
}: BookingSummaryModalProps) {
  const { data } = useBookingDetail(bookingId);
  console.log(bookingId);

  if (!data) {
    return <></>;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Confirmation</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Car:</strong> {data.car.brand} {data.car.model}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Booking Dates:</strong>{' '}
            {format(new Date(data.startDate), 'PPP')} →{' '}
            {format(new Date(data.endDate), 'PPP')}
          </p>
          {data.totalPrice !== undefined && (
            <p>
              <strong>Total Price:</strong> ${data?.totalPrice}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
