import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FrontRoute } from "../../App";
import type { Room } from "../../api/Room";
import { GetApi } from "../../api/Axios";
import Loading from "../../components/loading";
import { EndpointRoute } from "../../api/Endpoint";

// Helper pour découper le tableau en lignes de 3
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

// Composant principal de la page des rooms (liste)
export function Room() {
  const [rooms, setRooms] = useState<Room[]>();
  useEffect(() => {
    (async () => {
      const res = await GetApi(EndpointRoute.rooms);
      setRooms(res);
    })();
  }, []);

  if (!rooms) return <Loading />;

  return <RoomsCards rooms={rooms} />;
}

// Détails d'une salle
export function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const [rooms, setRooms] = useState<Room[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await GetApi(EndpointRoute.rooms);
      setRooms(res);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Chargement...</div>;

  const room = rooms?.find((r) => r._id === id);

  if (!room) {
    return (
      <div>
        <h1>Salle non trouvée</h1>
        <Link to={FrontRoute.Rooms}>Retour à la liste</Link>
      </div>
    );
  }

  return (
    <div className="room-details">
      <h1>{room.name}</h1>
      <p>{room.long_description}</p>
      <ul>
        <li>
          <strong>Tarif :</strong> {room.price}€/joueur
        </li>
        {room.estimated_duration && (
          <li>
            <strong>Durée estimée :</strong> {room.estimated_duration} min
          </li>
        )}
        {room.duration && (
          <li>
            <strong>Durée maximale :</strong> {room.duration} min
          </li>
        )}
        {room.participants && (
          <li>
            <strong>Participants recommandés :</strong> {room.participants}
          </li>
        )}
        {room.max_participants && (
          <li>
            <strong>Participants maximum :</strong> {room.max_participants}
          </li>
        )}
      </ul>
      <div>
        <button onClick={() => navigate(`${FrontRoute.Booking}/${room._id}`)}>Réserver</button>
        <Link to={FrontRoute.Rooms}>← Retour à la liste</Link>
      </div>
    </div>
  );
}

// Affichage des cartes de rooms (reçoit rooms en props)
export function RoomsCards({ rooms }: { rooms: Room[] }) {
  const rows = chunkArray(rooms, 3);

  return (
    <>
      {rows.map((row, i) => (
        <div className="cards" key={i}>
          {row.map((room) => (
            <Link
              to={`${FrontRoute.Rooms}/${room._id}`}
              className="card"
              key={room._id}
            >
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p><strong>Temps estimé : </strong>{room.estimated_duration} minutes</p>
              <p>
                <strong>Tarif :</strong> {room.price}€/joueur
              </p>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}