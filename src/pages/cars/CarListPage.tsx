import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { useState } from 'react';
import { addDays, startOfDay } from 'date-fns';
import { useCarList } from '@/hooks/useCarList';
import type { Car } from '@/models/car';
import BookingModal from '@/components/features/booking/BookingForm';
import BookingSummaryModal from '@/components/features/booking/BookingSummaryModal';
import CarList from '@/components/features/car/CarList';
export default function CarListPage() {
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const { data: cars, isLoading, refetch } = useCarList(range.from, range.to);

  const closeModal = () => {
    setSelectedCar(null);
  };

  const [bookingId, setBookingId] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleDateSelect = (value: DateRange | undefined) => {
    setRange(value ?? { from: undefined, to: undefined });
  };

  const tomorrow = startOfDay(addDays(new Date(), 1));

  return (
    <>
      <div className="mx-auto w-full max-w-5xl space-y-10 px-9">
        <h1 className="text-center text-4xl font-extrabold">
          Bolttech Car Booking
        </h1>
        <h2 className="text-center text-2xl font-bold">Select Booking Dates</h2>

        <div className="mx-auto w-[700px] border shadow-sm">
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            disabled={(date) => date < tomorrow}
            className="w-full"
          />
        </div>

        {cars && (
          <div>
            <CarList
              data={cars}
              isLoading={isLoading}
              setSelectedCar={setSelectedCar}
            />
          </div>
        )}
      </div>

      {selectedCar && range.from && range.to && (
        <BookingModal
          open={!!selectedCar}
          onClose={closeModal}
          car={selectedCar}
          from={range.from}
          to={range.to}
          onSuccess={(bookingId) => {
            console.log(bookingId);
            setBookingId(bookingId);
            refetch();
          }}
        />
      )}

      {bookingId && (
        <BookingSummaryModal
          bookingId={bookingId}
          open={!!bookingId}
          onClose={() => setBookingId(null)}
        />
      )}
    </>
  );
}
