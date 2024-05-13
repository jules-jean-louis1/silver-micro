import { Button } from "@/components/ui/button";

interface BookingHoursProps {
  setSelectedHours: (hours: string | null) => void;
  opperatingHours: {
    start: string;
    end: string;
  };
}
export const BookingHours: React.FC<BookingHoursProps> = (props) => {
  const { setSelectedHours, opperatingHours } = props;

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

  return (
    <div className="grid grid-cols-4 gap-4">
      {displayHours().map((hour, index) => (
        <Button
          key={index}
          onClick={() => setSelectedHours(hour)}
          className="h-fit-content"
          variant="outline"
        >
          {hour}
        </Button>
      ))}
    </div>
  );
};
