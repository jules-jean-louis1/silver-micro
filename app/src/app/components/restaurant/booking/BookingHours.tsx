import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect } from "react";

interface BookingHoursProps {
  setSelectedHours: (hours: string | null) => void;
  opperatingHours: {
    start: string;
    end: string;
  };
  selectedDay: Date | null;
  orderOfDay: any;
  setOrderOfDay: any;
  restaurantSeats: number;
  setRestaurantSeats: any;
  restaurant: any;
}
export const BookingHours: React.FC<BookingHoursProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  const {
    setSelectedHours,
    opperatingHours,
    selectedDay,
    orderOfDay,
    setOrderOfDay,
    restaurantSeats,
    setRestaurantSeats,
    restaurant,
  } = props;

  const displayHours = () => {
    let hours = [];
    for (
      let i = parseInt(opperatingHours.start);
      i <= parseInt(opperatingHours.end);
      i++
    ) {
      hours.push(i + ":00");
    }
    return hours;
  };

  const computeSeatsHour = (hour: string) => {
    const availableSeats = restaurant?.seat;
    const orders = orderOfDay.filter((order: any) => {
      return new Date(order.date).getUTCHours() === parseInt(hour);
    });
    const seats = orders.reduce((acc: any, order: any) => {
      return acc + order.seat;
    }, 0);
    return availableSeats - seats;
  };

  useEffect(() => {
    if (selectedDay === null) return;
    (async () => {
      const response = await fetch(
        `/api/booking/${selectedDay.toISOString()}/${id}`
      );
      const data = await response.json();
      if (!data) return;
      setOrderOfDay(data);
    })();
  }, [selectedDay]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {displayHours().map((hour, index) => (
        <Button
          key={index}
          onClick={() => {
            setSelectedHours(hour);
            setRestaurantSeats(computeSeatsHour(hour)),
              console.log("com⁰", computeSeatsHour(hour));
          }}
          size="sm"
          variant="outline"
        >
          {hour}
        </Button>
      ))}
    </div>
  );
};
