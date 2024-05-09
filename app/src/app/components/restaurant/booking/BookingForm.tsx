import { FC, useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { BookingHours } from "./BookingHours";
import { BookingSeat } from "./BookingSeat";
import { format} from "date-fns";
import { fr } from "date-fns/locale";

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
  let [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedHours, setSelectedHours] = useState<Date | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

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
    console.log(selectedHours);
  }, [restaurant]);

  useEffect(() => {
    if (selectedDay) {
      nextStep();
    }
    if (selectedHours) {
      nextStep();
    }
    if (selectedSeat) {
      nextStep();
    }
  }, [selectedDay, selectedHours, selectedSeat]);

  return (
    <div>
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
            <p>Date: {format(selectedDay ?? new Date(), 'EEEE d MMMM yyyy', { locale: fr })}</p>
            <p>Heure: {selectedHours?.getHours() + ":00"}</p>
            <p>Nombre de personnes: {selectedSeat}</p>
          </div>
        )}
      </div>
    </div>
  );
};
