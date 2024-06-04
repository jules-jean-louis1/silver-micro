import { Calendar, CircleCheck, Clock, PersonStanding } from "lucide-react";
import { FC } from "react";

interface ProgressBarBookingProps {
  activeStep: string;
}

export const ProgressBarBooking: FC<ProgressBarBookingProps> = (props) => {
  const { activeStep } = props;

  return (
    <div className="flex justify-between rounded-lg min-h-9 w-full border border-skyline-border bg-sunshine-yellow-light my-1">
      <div className={`w-full flex justify-center items-center rounded-l-lg ${activeStep === "date" ? "bg-sunshine-yellow" : "transparent"}`}>
        <div className="flex items-center space-x-2">
          <Calendar />
          <span className="text-midnight-black">Date</span>
        </div>
      </div>
      <div className={`w-full flex justify-center items-center ${activeStep === "time" ? "bg-sunshine-yellow" : "transparent"}`}>
        <div className="flex items-center space-x-2">
          <Clock />
          <span className="text-midnight-black">Heure</span>
        </div>
      </div>
      <div className={`w-full flex justify-center items-center ${activeStep === "seats" ? "bg-sunshine-yellow" : "transparent"}`}>
        <div className="flex items-center space-x-2">
          <PersonStanding />
          <span className="text-midnight-black">Places</span>
        </div>
      </div>
      <div className={`w-full flex justify-center items-center rounded-r-lg ${activeStep === "confirm" ? "bg-sunshine-yellow" : "transparent"}`}>
        <div className="flex items-center space-x-2">
          <CircleCheck />
          <span className="text-midnight-black">Confirmation</span>
        </div>
      </div>
      {/* {activeStep === "date" && (
      )} */}
    </div>
  );
};
