import { FC, useState } from "react";
import { Calendar } from "./Calendar";
import { BookingHours } from "./BookingHours";

type StepName = "date" | "time" | "seats" | "confirm";

type Step = {
  name: string;
  title: string;
};

const STEPS: Step[] = [
  { name: "date", title: "Sélectionnez un date" },
  { name: "time", title: "Sélectionnez une heure" },
  { name: "seats", title: "Nombre de personnes" },
  { name: "confirm", title: "Confirmer votre r&servation" },
] as const;

export const BookingForm: FC = () => {
  const [steps, setSteps] = useState([...STEPS]);
  const [activeStep, setActiveStep] = useState<StepName>("date");
  const [daysClosed, setDaysClosed] = useState({
    monday: false,
    tuesday: false,
  });
  let [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

  const isStepActive = (stepName: StepName) => activeStep === stepName;
  const nextStep = () => {
    const currentStepIndex = steps.findIndex((step) => step.name === activeStep);
    if (currentStepIndex < steps.length - 1) {
    setActiveStep(steps[currentStepIndex + 1].name as StepName);
    }
  }
  const previousStep = () => {
    const currentStepIndex = steps.findIndex((step) => step.name === activeStep);
    if (currentStepIndex > 0) {
      setActiveStep(steps[currentStepIndex - 1].name as StepName);
    }
  }
  return (
    <div>
      <div>
        {isStepActive("date") && (
          <Calendar daysClosed={daysClosed} setSelectedDay={setSelectedDay} />
        )}
        {isStepActive("time") && <BookingHours />}
      </div>
    </div>
  );
};
