// AppEmploye.tsx
import { useEffect, useState } from "react";
import SalleCalendarEmploye, { type DetailsReservation } from "./SalleCalendarEmploye";
import { GetApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import type { RoomSessions } from "../../api/Room";
import { useAuth } from "../../components/AuthContext";
import { UserRole } from "../../api/User";
import { useNavigate } from "react-router-dom";
import { FrontRoute } from "../../App";

export default function ManageSessions() {
  const [sessions, setRoomSessions] = useState<RoomSessions[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
  });
  const navigate = useNavigate()

  const {me} = useAuth()

  useEffect(() => {
    if(me?.role != UserRole.admin && me?.role != UserRole.employee){
        navigate(FrontRoute.Accueil)
        return
    }
  }, [me])

  const handleDateChange = (e: any) => {
      setSelectedDate(e.target.value);
  };


  useEffect(() => {
    (async () => {
      const param = {date : selectedDate}
      const res = await GetApi(`${EndpointRoute.adminRoom}/sessions`, param)
      setRoomSessions(res)
    })()
  }, [selectedDate])

  function handleCancel(){

  }

  const handleVoirDetails = (reservation: DetailsReservation) => {
    alert(
      `Détails de la réservation :
Salle : ${reservation.room.name}
Nom : Mr/Mme ${reservation.user.lastname},
Participants: ${reservation.participants}
Début : ${new Date(reservation.start_time).toLocaleString()}
Duration : ${reservation.room.duration} minutes
Description : ${reservation.room.description || "Aucune"}`
    );
  };
  return (
    <div>
      <label>
          Choisir une date :{" "}
          <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={new Date().toUTCString().split('T')[0]}
          />
      </label>
      <SalleCalendarEmploye
        key={selectedDate}
        reservations={sessions}
        onCancel={handleCancel}
        date={selectedDate}
        onDetails={handleVoirDetails}
      />
    </div>
  );
};
