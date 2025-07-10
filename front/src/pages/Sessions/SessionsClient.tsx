// AppClient.tsx
import { useEffect, useState } from "react";
import SalleCalendarClient from "./SalleCalendarClient";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import { GetApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import type { Room, RoomSessionsEmpty } from "../../api/Room";
import { Room as RoomComponent } from "../Rooms/Rooms";

type SessionsClientProps = {
  date: string;
};

export default function SessionsClient({ date }: SessionsClientProps) {
  const [room, setRoom] = useState<RoomSessionsEmpty | null>(null);
  const [listRooms, setListRooms] = useState<Room[] | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id || !date) return;
    (async () => {
      try {
        const param = { date };
        const res = await GetApi(`${EndpointRoute.rooms}/${id}/sessions`, param) as RoomSessionsEmpty;
        setRoom(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, date]);

  useEffect(() => {
    if(!date) return
    (async () => {
      const param = { date };
      const rooms = await GetApi(EndpointRoute.rooms, param) as Room[]
      setListRooms(rooms)
    })()
  }, [date])

  if (!id) {
    return <RoomComponent date={date} />
  }

  if (!room) {
    return <Loading />;
  }

  const handleReserver = (start: string, end: string) => {
    const title = prompt("Votre nom pour la réservation ?");
    if (!title) return;
    alert("réservé !");
  };

  return (
    <SalleCalendarClient
      key={date}
      salleName={room.room}
      disponibilites={room.free_sessions}
      date={date}
      onReserver={handleReserver}
    />
  );
}