import { Button } from "@/components/ui/button";
import { useState } from "react";

export const BookingSeat = () => {
  const [seat, setSeat] = useState<number | null>(null);
  const handleSeatClick = () => {
    setSeat(seat === null ? 1 : seat + 1);
    console.log(`Seat ${seat} is clicked`);
  };

  const seats = [];
  for (let i = 0; i < 12; i++) {
    seats.push(
      <Button key={i} onClick={handleSeatClick}>
        {i + 1}
      </Button>
    );
  }

  return <div>{seats}</div>;
};
