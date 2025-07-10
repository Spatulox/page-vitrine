import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Room } from "../../api/Room";
import { GetApi } from "../../api/Axios";
import Loading from "../../components/loading";
import { EndpointRoute } from "../../api/Endpoint";

export default function Booking() {
  const { id } = useParams<{ id?: string }>();

  // States
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomId, setRoomId] = useState<string>("");

  // Form fields
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const hours = [
    "09:30", "11:15", "13:00", "14:45",
    "16:30", "18:15", "20:00", "21:45"
  ];

  // Fetch logic
  useEffect(() => {
    if (id) {
      // On récupère uniquement la room demandée
      GetApi(`/${EndpointRoute.rooms}/${id}`).then((room: Room) => {
        setSelectedRoom(room);
        setRoomId(room._id);
      });
    } else {
      // On récupère toutes les rooms
      GetApi(EndpointRoute.rooms).then((rooms: Room[]) => {
        setRooms(rooms);
      });
    }
  }, [id]);

  // Affichage du loader
  if ((id && !selectedRoom) || (!id && !rooms)) {
    return <Loading />;
  }

  // Gestion du submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const roomName = selectedRoom
      ? selectedRoom.name
      : rooms?.find((r) => r._id === roomId)?.name ?? "Non sélectionnée";
    alert(
      `Réservation pour la salle : ${roomName}\nDate : ${date}\nHeure : ${hour}\nNom : ${name}\nEmail : ${email}`
    );
  }

  return (
    <div className="booking-container">
      <h1 className="booking-title">RÉSERVATION</h1>
      <p className="booking-info">
        Les réservations s’effectuent <strong>exclusivement en ligne</strong>, jusqu’à 3 mois à l’avance.
      </p>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-controls">
          {/* Sélecteur de salle */}
          {selectedRoom ? (
            <input
              type="text"
              value={selectedRoom.name}
              disabled
              className="booking-room-input"
              style={{ fontWeight: "bold" }}
            />
          ) : (
            <select
              required
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            >
              <option value="">Choisissez une session</option>
              {rooms &&
                rooms.map((room) => (
                  <option value={room._id} key={room._id}>
                    {room.name}
                  </option>
                ))}
            </select>
          )}

          {/* Date */}
          <input
            type="date"
            min={today}
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* Heure */}
          <select
            required
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          >
            <option value="">Choisissez une heure</option>
            {hours.map((h) => (
              <option value={h} key={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="booking-inputs">
          <input
            type="text"
            placeholder="Nom"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="booking-button">
          Continuer ma réservation
        </button>
      </form>
    </div>
  );
}