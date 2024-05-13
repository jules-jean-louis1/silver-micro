import { FC, useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { BookingHours } from "./BookingHours";
import { BookingSeat } from "./BookingSeat";
import {
  format,
} from "date-fns";
import { da, fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { formatDateWithoutUTCConversion } from "@/app/utils/Booking";
import { useSession } from "next-auth/react";

type StepName = "date" | "time" | "seats" | "confirm";

type Step = {
  name: string;
  title: string;
};

const STEPS: Step[] = [
  { name: "date", title: "Sélectionnez un date" },
  { name: "time", title: "Sélectionnez une heure" },
  { name: "seats", title: "Nombre de personnes" },
  { name: "confirm", title: "Confirmer votre réservation" },
] as const;

interface BookingFormProps {
  restaurant: any;
}

export const BookingForm: FC<BookingFormProps> = (props) => {
  const { data } = useSession();
  console.log(data);
  const { id } = useParams<{ id: string }>();
  const { restaurant } = props;
  const [steps, setSteps] = useState([...STEPS]);
  const [activeStep, setActiveStep] = useState<StepName>("date");
  const [daysClosed, setDaysClosed] = useState({
    monday: false,
    tuesday: false,
  });
  const [opperatingHours, setOpperatingHours] = useState({
    start: "",
    end: "",
  });
  const [restaurantSeats, setRestaurantSeats] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedHours, setSelectedHours] = useState<any>(null);
  const [selectDate, setSelectDate] = useState<String | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const [clickedConfim, setClickedConfirm] = useState(false);

  const isStepActive = (stepName: StepName) => activeStep === stepName;
  const nextStep = () => {
    const currentStepIndex = steps.findIndex(
      (step) => step.name === activeStep
    );
    if (currentStepIndex < steps.length - 1) {
      setActiveStep(steps[currentStepIndex + 1].name as StepName);
    }
  };
  const previousStep = () => {
    const currentStepIndex = steps.findIndex(
      (step) => step.name === activeStep
    );
    if (currentStepIndex > 0) {
      setActiveStep(steps[currentStepIndex - 1].name as StepName);
    }
  };

  const formatHours = (hours: string, date: Date) => {
    const hoursMinutes = hours.split(":");
    const hour = parseInt(hoursMinutes[0]);
    const minutes = parseInt(hoursMinutes[1]);

    const newDate = new Date(date);
    newDate.setHours(hour, minutes);
    const formatedDate = formatDateWithoutUTCConversion(newDate);
    return formatedDate;
  };

  useEffect(() => {
    if (restaurant) {
      setDaysClosed({
        monday: restaurant.close_monday,
        tuesday: restaurant.close_tuesday,
      });
      setOpperatingHours({
        start: restaurant.opening_time,
        end: restaurant.closing_time,
      });
      setRestaurantSeats(restaurant.seat);
    }
  }, [restaurant]);

  useEffect(() => {
    if (selectedDay) {
      nextStep();
    }
    if (selectedHours) {
      if (selectedDay) {
        setSelectDate(formatHours(selectedHours, selectedDay));
      }
      nextStep();
    }
    if (selectedSeat) {
      nextStep();
    }
  }, [selectedDay, selectedHours, selectedSeat]);

  useEffect(() => {
    if (clickedConfim) {
      (async () => {
        const response = await fetch("/api/booking", {
          method: "POST",
          body: JSON.stringify({
            restaurant_id: id,
            date: selectDate,
            seats: selectedSeat,
          }),
        });
        const data = await response.json();

        console.log(data);
      })();
      setClickedConfirm(false);
    }
  }, [clickedConfim]);

  return (
    <div>
      <div>
        <h1>{steps.find((step) => step.name === activeStep)?.title}</h1>
        <div>
          <Button onClick={previousStep}>Précédent</Button>
          <Button onClick={nextStep}>Suivant</Button>
        </div>
      </div>
      <div>
        {isStepActive("date") && (
          <Calendar daysClosed={daysClosed} setSelectedDay={setSelectedDay} />
        )}
        {isStepActive("time") && (
          <BookingHours
            setSelectedHours={setSelectedHours}
            opperatingHours={opperatingHours}
          />
        )}
        {isStepActive("seats") && (
          <BookingSeat
            setSelectedSeat={setSelectedSeat}
            restaurantSeats={restaurantSeats}
          />
        )}
        {isStepActive("confirm") && (
          <div>
            <h1>Confirmation</h1>
            <p>
              Date:{" "}
              {format(selectedDay ?? new Date(), "EEEE d MMMM yyyy", {
                locale: fr,
              })}
            </p>
            <p>Heure: {selectedHours}</p>
            <p>Nombre de personnes: {selectedSeat}</p>
            <Button onClick={() => setClickedConfirm(true)}>Confirmer</Button>
          </div>
        )}
      </div>
    </div>
  );
};
