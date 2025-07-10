import FullCalendar from "@fullcalendar/react";
import { type EventInput } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type Props = {
  salleName: string;
  disponibilites: string[];
  date: string;
  onReserver: (start: string, end: string) => void;
};

function addOneHourFifteen(startIso: string): string {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  return end.toISOString();
}

export default function SalleCalendarClient({salleName, disponibilites, date, onReserver}: Props) {
  const availableEvents: EventInput[] = disponibilites.map((iso, idx) => ({
    id: `dispo-${idx}`,
    title: "Disponible",
    start: iso,
    end: addOneHourFifteen(iso),
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
      <h2>{salleName} – Disponibilités</h2>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
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