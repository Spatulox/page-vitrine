import FullCalendar from "@fullcalendar/react";
import { type EventInput } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { RoomSessions } from "../../api/Room";
import type { Sessions } from "../../api/Sessions";

const colors = ["#b2f2bb", "#a5d8ff", "#ffd6a5", "#ffa8a8", "#e7c6ff"];

type Props = {
  reservations: RoomSessions[];
  date: string;
  onCancel: (reservationId: string) => void;
  onDetails: (reservation: any) => void;
};

export default function SalleCalendarEmploye({
  reservations,
  date,
  onCancel,
  onDetails,
}: Props) {
  // Générer une couleur par salle
  const salleColors: Record<string, string> = {};
  reservations.forEach((r, i) => {
    if (!salleColors[r.room._id]) {
      salleColors[r.room._id] = colors[i % colors.length];
    }
  });

  // Aplatir toutes les sessions pour générer les events
  const events: EventInput[] = reservations.flatMap((r) =>
    r.sessions.map((session: Sessions) => ({
      id: session._id,
      title: `${r.room.name} - ${session.user ? session.user.name : "Réservation"}`,
      start: session.start_time,
      color: salleColors[r.room._id],
      editable: false,
      extendedProps: {
        room: r.room,
        session,
      },
    }))
  );

  const handleEventClick = (info: any) => {
    const sessionId = info.event.id;
    // Retrouver la réservation (session) correspondante
    let foundReservation = null;
    let foundRoom = null;
    for (const r of reservations) {
      const s = r.sessions.find((sess: Sessions) => sess._id === sessionId);
      if (s) {
        foundReservation = s;
        foundRoom = r.room;
        break;
      }
    }
    if (!foundReservation) return;

    if (window.confirm("Voir les détails de la réservation ?")) {
      onDetails({ ...foundReservation, room: foundRoom });
    }
    if (window.confirm("Annuler cette réservation ?")) {
      onCancel(sessionId);
    }
  };
  return (
    <div>
      <h2>Emploi du temps de toutes les salles</h2>
      <FullCalendar
        key={date}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        initialDate={date}
        events={events}
        eventClick={handleEventClick}
        headerToolbar={false}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="25:00:00"
        allDaySlot={false}
      />
    </div>
  );
}