import { Button } from "@/components/ui/button";

interface BookingHoursProps {
  setSelectedHours: (hours: Date | null) => void;
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
        <Button key={index} onClick={() => setSelectedHours(new Date("1970-01-01T" + hour))}>
          {hour}
        </Button>
      ))}
    </div>
  );
};
