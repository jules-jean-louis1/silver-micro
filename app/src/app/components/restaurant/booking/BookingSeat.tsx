import { Button } from "@/components/ui/button";
import { FC } from "react";

interface BookingSeatProps {
  setSelectedSeat: (seat: number | null) => void;
  restaurantSeats: number;
  restaurant: any;
}

export const BookingSeat: FC<BookingSeatProps> = (props) => {
  const { setSelectedSeat, restaurantSeats, restaurant } = props;

  const displaySeats = () => {
    const seats = [];
    for (let i = 0; i < restaurant?.seat; i++) {
      seats.push(i + 1);
    }
    return seats;
  };

  return (
    <div className="grid grid-cols-4 gap-4 pt-6">
      {displaySeats().map((seat, index) => (
        <Button
          key={index}
          onClick={(e) =>
            setSelectedSeat(Number((e.target as HTMLButtonElement).textContent))
          }
          size="sm"
          variant="outline"
          disabled={seat > restaurantSeats}
        >
          {seat}
        </Button>
      ))}
    </div>
  );
};
