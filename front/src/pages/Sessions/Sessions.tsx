import { useState } from "react";
import SessionsClient from "./SessionsClient";

function Sessions() {
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div>
            <label>
                Choisir une date :{" "}
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                />
            </label>
            <SessionsClient date={selectedDate} />
        </div>
    );
}

export default Sessions;
