import { FC, use, useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { BookingHours } from "./BookingHours";
import { BookingSeat } from "./BookingSeat";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { formatDateWithoutUTCConversion } from "@/app/utils/Booking";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProgressBarBooking } from "./ProgressBarBooking";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
  const [restaurantSeats, setRestaurantSeats] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedHours, setSelectedHours] = useState<any>(null);
  const [selectDate, setSelectDate] = useState<String | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const [orderOfDay, setOrderOfDay] = useState<any>([]);
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
    if (
      selectedDay === null ||
      selectedHours === null ||
      selectedSeat === null
    ) {
      setActiveStep("date");
      return;
    }
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
      })();
      setClickedConfirm(false);
    }
  }, [clickedConfim]);
  
  return (
    <div className="lg:max-h-[10rem] lg:min-h-[10rem] lg:min-w-[6rem]">
      <ProgressBarBooking activeStep={activeStep} />
      <div>
        <div className="flex justify-between items-center">
          <Button onClick={previousStep} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="font-semibold">
              {steps.find((step) => step.name === activeStep)?.title}
            </h3>
          </div>
          <Button onClick={nextStep} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
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
            selectedDay={selectedDay}
            orderOfDay={orderOfDay}
            setOrderOfDay={setOrderOfDay}
            restaurantSeats={restaurantSeats}
            setRestaurantSeats={setRestaurantSeats}
            restaurant={restaurant}
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
            {data ? (
              <Button onClick={() => setClickedConfirm(true)}>Confirmer</Button>
            ) : (
              <Button variant={"outline"}>
                <Link href="/login">
                  Connectez-vous pour confirmer votre réservation
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
