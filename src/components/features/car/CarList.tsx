import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { Car } from '@/models/car';
import { Toaster } from 'sonner';

interface CarListProps {
  data: Car[];
  isLoading: boolean;
  setSelectedCar: React.Dispatch<React.SetStateAction<Car | null>>;
}

export default function CarList(props: CarListProps) {
  const { data: cars, setSelectedCar, isLoading } = props;

  const handleBookingClick = (car: Car) => {
    setSelectedCar(car);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Toaster />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(cars) &&
          cars.map((car) => (
            <Card key={car.id}>
              <CardContent className="space-y-2 p-4">
                <div className="text-lg font-semibold">
                  {car.brand} {car.model}
                </div>
                <div className="text-muted-foreground text-sm">
                  Stock: {car.stock}
                </div>
                <div className="text-sm">
                  Avg/Day: ${car.averagePricePerDay.toFixed(2)}
                </div>
                <div className="text-sm">
                  Total: ${car.totalPrice.toFixed(2)}
                </div>
                <Button
                  className="mt-2 w-full"
                  onClick={() => handleBookingClick(car)}
                >
                  Book
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
}
