import { useParams } from "react-router-dom";
import { useState } from "react";
import type { Room } from "../Escape/Rooms";
import { rooms } from "../data";

export default function Booking() {
  const { id } = useParams<{ id?: string }>();

  // Trouver la room sélectionnée si id dans l'URL
  const selectedRoom = id ? rooms.find((r: Room) => r._id === Number(id)) : undefined;

  // Form state
  const [roomId, setRoomId] = useState<number | undefined>(
    selectedRoom ? selectedRoom._id : undefined
  );
  const today = new Date().toISOString().split("T")[0];

  // Form fields (exemple, tu peux étendre)
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Heures proposées
  const hours = [
    "09:30", "11:15", "13:00", "14:45",
    "16:30", "18:15", "20:00", "21:45"
  ];

  // Gestion du submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Ici tu peux envoyer les données à ton backend
    alert(
      `Réservation pour la salle : ${
        rooms.find((r: Room) => r._id === roomId)?.name ?? "Non sélectionnée"
      }\nDate : ${date}\nHeure : ${hour}\nNom : ${name}\nEmail : ${email}`
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
          {!selectedRoom ? (
            <select
              required
              value={roomId ?? ""}
              onChange={(e) => setRoomId(Number(e.target.value))}
            >
              <option value="">Choisissez une session</option>
              {rooms.map((room: Room) => (
                <option value={room._id} key={room._id}>
                  {room.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={selectedRoom.name}
              disabled
              className="booking-room-input"
              style={{ fontWeight: "bold" }}
            />
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
