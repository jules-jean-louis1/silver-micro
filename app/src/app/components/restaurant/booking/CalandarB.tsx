import { useState } from "react";

export const CalandarB = () => {
  const [sDate, setsDate] = useState(new Date());

  const findMonthDays = (y: any, m: any) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const findFirstDay = (y: any, m: any) => {
    return new Date(y, m, 1).getDay();
  };

  const changeToPrevMonth = () => {
    setsDate((pDate) => {
      const pMonth = pDate.getMonth() - 1;
      const pYear = pDate.getFullYear();
      return new Date(pYear, pMonth);
    });
  };

  const changeToNextMonth = () => {
    setsDate((pDate) => {
      const nMonth = pDate.getMonth() + 1;
      const nYear = pDate.getFullYear();
      return new Date(nYear, nMonth);
    });
  };

  const handleDateClick = (date: any) => {
    setsDate(date);
  };

  const showCalendar = () => {
    const currDate = new Date();
    const y = sDate.getFullYear();
    const m = sDate.getMonth();
    const mDays = findMonthDays(y, m);
    const fDay = findFirstDay(y, m);

    const allDays = [];

    // For empty cells
    for (let p = 0; p < fDay; p++) {
      allDays.push(<div key={`em-${p}`} className="box empty"></div>);
    }

    // Show actual days
    for (let d = 1; d <= mDays; d++) {
      const date = new Date(y, m, d);
      const isSelected = sDate && date.toDateString() === sDate.toDateString();

      allDays.push(
        <button
          key={`d-${d}`}
          className={`box ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {d}
        </button>
      );
    }

    return allDays;
  };


  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-4">
        <button onClick={changeToPrevMonth} className="px-4 py-2 bg-blue-500 text-white rounded"> - </button>
        <h2 className="text-2xl">
          {sDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={changeToNextMonth} className="px-4 py-2 bg-blue-500 text-white rounded"> + </button>
      </div>
      <div className="grid grid-cols-7 gap-1">{showCalendar()}</div>
      {sDate && (
        <div className="text-lg">
          Selected Date: {sDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};
