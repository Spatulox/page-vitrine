// AppClient.tsx
import React, { useEffect, useState } from "react";
import SalleCalendarClient from "./SalleCalendarClient";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import { GetApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import type { RoomSessionsEmpty } from "../../api/Room";

type SessionsClientProps = {
  date: string;
};

export default function SessionsClient({ date }: SessionsClientProps) {
  const [rooms, setRooms] = useState<RoomSessionsEmpty | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id || !date) return;
    (async () => {
      try {
        // Passe la date sélectionnée dans les paramètres de la requête
        const param = { date };
        const res = await GetApi(`${EndpointRoute.rooms}/${id}/sessions`, param) as RoomSessionsEmpty;
        setRooms(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, date]);

  if (!id) {
    return <h1>Not Found</h1>;
  }

  if (!rooms) {
    return <Loading />;
  }

  const handleReserver = (start: string, end: string) => {
    const title = prompt("Votre nom pour la réservation ?");
    if (!title) return;
    alert("réservé !");
  };

  return (
    <SalleCalendarClient
      salleName={rooms.room}
      disponibilites={rooms.free_sessions}
      date={date}
      onReserver={handleReserver}
    />
  );
}