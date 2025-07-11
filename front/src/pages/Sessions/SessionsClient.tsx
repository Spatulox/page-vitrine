// AppClient.tsx
import { useEffect, useState } from "react";
import SalleCalendarClient from "./SalleCalendarClient";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import { GetApi, PostApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import type { Room, RoomSessionsEmpty } from "../../api/Room";
import { Room as RoomComponent } from "../Rooms/Rooms";
import ReservationModal, { type ClientReserveType } from "../Booking/BookingModal";
import { DateProfileGenerator } from "@fullcalendar/core/internal";

type SessionsClientProps = {
  date: string;
};

export default function SessionsClient({ date }: SessionsClientProps) {
  const [room, setRoom] = useState<RoomSessionsEmpty | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);
  const [refresh, setRefresh] = useState(0)
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
  }, [id, date, refresh]);

  if (!id) {
    return <>
      <p>Choisir une salle :</p>
      <RoomComponent date={date} />
    </>
  }

  if (!room) {
    return <Loading />;
  }

  const handleReserver = (start: string, end: string) => {
    setSelectedSlot({ start, end });
    setModalOpen(true);
  };

  const handleReserveConfirm = async (data: ClientReserveType) => {

    try {
      const dataTSend = {
        ...data,
        room_id: room.room._id
      }
      await PostApi(`${EndpointRoute.book}`, dataTSend)
    } catch (error) {
      console.error(error)
    }

    setModalOpen(false);
    setRefresh(r => r+1)
  };
  return (<>
    <SalleCalendarClient
      key={date}
      room={room.room}
      disponibilites={room.free_sessions}
      date={date}
      onReserver={handleReserver}
    />
    <ReservationModal
      open={modalOpen}
      room={room.room}
      onClose={() => setModalOpen(false)}
      onReserve={handleReserveConfirm}
      start={selectedSlot?.start || ""}
      end={selectedSlot?.end || ""}
    />
    </>
  );
}