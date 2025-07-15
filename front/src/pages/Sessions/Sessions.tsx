import { useEffect, useState } from "react";
import SessionsClient from "./SessionsClient";
import { useSearchParams } from "react-router-dom";
import { ToastService } from "../../services/ToastService"

function Sessions() {
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const [searchParams] = useSearchParams();
    const date = searchParams.get("date");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const selected = new Date(value);

    if (selected.getDay() === 0) {
      ToastService.error("Les réservations ne sont pas disponibles le dimanche.");
      return;
    }

    setSelectedDate(value);
  };
    
    const todayISO = new Date().toISOString().split('T')[0];
    const dateMin = (date && !isNaN(Date.parse(date))) ? date : todayISO;

    useEffect(() => {
        setSelectedDate(dateMin)
    }, [dateMin])


    return (
        <div>
            <label>
                Choisir une date :{" "}
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={dateMin}
                />
            </label>
            <SessionsClient date={selectedDate} />
        </div>
    );
}

export default Sessions;
