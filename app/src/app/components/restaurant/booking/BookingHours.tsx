import { useState } from "react";

export const BookingHours = () => {
    // Définir les heures que vous voulez afficher
    const [startHours, setStartHours] = useState(new Date().setHours(9, 0, 0));
    const [endHours, setEndHours] = useState(new Date().setHours(20, 0, 0));

    let hours = [];
    for(let i = startHours; i <= endHours; i = new Date(i).setHours(new Date(i).getHours() + 1)) {
        hours.push(new Date(i).getHours() + ":00");
    }
  
    return (
      <div className="grid grid-cols-4 gap-4">
        {hours.map((hour, index) => (
          <div key={index} className="border p-2">
            {hour}
          </div>
        ))}
      </div>
    );
}