import { Button } from "@/components/ui/button";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  parse,
  isBefore,
  startOfToday,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type CalendarProps = {
  daysClosed: {
    monday: boolean;
    tuesday: boolean;
  };
  setSelectedDay: (value: Date) => void;
};

export const Calendar: React.FC<CalendarProps> = ({
  daysClosed,
  setSelectedDay,
}) => {
  let today = startOfToday();

  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const previousMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const getDayOfWeek = (date: Date) => {
    const day = getDay(date);
    return day === 0 ? 7 : day;
  };

  const disabledDays = (day: any) => {
    if (
      isBefore(day, today) ||
      (getDay(day) === 1 && daysClosed.monday) ||
      (getDay(day) === 2 && daysClosed.tuesday)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-3 pt-1">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <h2 className="font-semibold text-gray-900 capitalize">
            {format(firstDayCurrentMonth, "MMMM yyyy", { locale: fr })}
          </h2>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
          <div>Lun</div>
          <div>Mar</div>
          <div>Mer</div>
          <div>Jeu</div>
          <div>Ven</div>
          <div>Sam</div>
          <div>Dim</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                (dayIdx === 0 && colStartClasses[getDayOfWeek(day)]) || "",
                "py-1.5"
              )}
            >
              <Button
                type="button"
                variant={isSameDay(day, today) ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
                disabled={disabledDays(day)}
                className={classNames(
                  //   (isEqual(day, selectedDay) && "border-white") || "",
                  //   (!isEqual(day, selectedDay) &&
                  //     isToday(day) &&
                  //     "border-red-500") ||
                  //     "",
                  //   (!isEqual(day, selectedDay) &&
                  //     !isToday(day) &&
                  //     isSameMonth(day, firstDayCurrentMonth) &&
                  //     "border-gray-900") ||
                  //     "",
                  //   (!isEqual(day, selectedDay) &&
                  //     !isToday(day) &&
                  //     !isSameMonth(day, firstDayCurrentMonth) &&
                  //     "border-gray-400") ||
                  //     "",
                  //   (isEqual(day, selectedDay) &&
                  //     isToday(day) &&
                  //     "bg-red-500") ||
                  //     "",
                  //   (isEqual(day, selectedDay) &&
                  //     !isToday(day) &&
                  //     "border-gray-900") ||
                  //     "",
                  //   (!isEqual(day, selectedDay) && "hover:bg-gray-200") || "",
                  //   ((isEqual(day, selectedDay) || isToday(day)) &&
                  //     "font-semibold") ||
                  //     "",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-md"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </Button>
            </div>
          ))}
        </div>
    </div>
  );
};

let colStartClasses = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
