import { useEffect, useState } from "react";
import SessionsClient from "./SessionsClient";
import { useSearchParams } from "react-router-dom";

function Sessions() {
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const [searchParams] = useSearchParams();
    const date = searchParams.get("date");

    const handleDateChange = (e: any) => {
        setSelectedDate(e.target.value);
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
