import FullCalendar from "@fullcalendar/react";
import { type EventInput } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { Room } from "../../api/Room";

type Props = {
  room: Room;
  disponibilites: string[];
  date: string;
  onReserver: (start: string, end: string) => void;
};

function addRoomDuration(startIso: string, duration: number): string {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + duration * 60 * 1000);
  return end.toISOString();
}

export default function SalleCalendarClient({room, disponibilites, date, onReserver}: Props) {

  const today = new Date();
  const dateObj = new Date(date);
  
  const filteredDisponibilites = disponibilites.filter((iso) => {
    const start = new Date(iso);
    if (today.toISOString().split("T")[0] === dateObj.toISOString().split("T")[0]) {
      return start > today;
    }
    return true;
  });
  
  const availableEvents: EventInput[] = filteredDisponibilites.map((iso, idx) => ({
    id: `dispo-${idx}`,
    title: "Disponible",
    start: iso,
    end: addRoomDuration(iso, room.duration),
    color: "#b2f2bb",
    editable: false,
  }));

  const handleEventClick = (info: any) => {
    if (info.event.title === "Disponible") {
      onReserver(info.event.startStr, info.event.endStr);
    }
  };

  return (
    <div>
      <h2>{room.name} – Disponibilités</h2>
      <FullCalendar
        key={date}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        initialDate={date}
        events={[...availableEvents]}
        eventClick={handleEventClick}
        headerToolbar={false}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="25:00:00"
        allDaySlot={false}
      />
    </div>
  );
};