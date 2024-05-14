import { Button } from "@/components/ui/button";
import { FC } from "react";

interface BookingSeatProps {
  setSelectedSeat: (seat: number | null) => void;
  restaurantSeats: number;
}

export const BookingSeat: FC<BookingSeatProps> = (props) => {
  const { setSelectedSeat, restaurantSeats } = props;

  const displaySeats = () => {
    const seats = [];
    for (let i = 0; i < restaurantSeats; i++) {
      seats.push(i + 1);
    }
    return seats;
  };
  return (
    <div className="grid grid-cols-4 gap-4">
      {displaySeats().map((seat, index) => (
        <Button
          key={index}
          onClick={(e) =>
            setSelectedSeat(Number((e.target as HTMLButtonElement).textContent))
          }
          size="sm"
          variant="outline"
        >
          {seat}
        </Button>
      ))}
    </div>
  );
};
