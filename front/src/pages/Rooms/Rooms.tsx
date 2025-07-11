import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FrontRoute } from "../../App";
import type { Room } from "../../api/Room";
import { GetApi } from "../../api/Axios";
import Loading from "../../components/Loading";
import { EndpointRoute } from "../../api/Endpoint";
import BackButton from "../../components/BackButton";

type Props = {
  date?: string
}

// Coupe tableau 3 lignes
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export function Room({date}: Props) {
  const [rooms, setRooms] = useState<Room[]>();
  useEffect(() => {
    (async () => {
      if(date){
        const res = await GetApi(EndpointRoute.rooms + "/sessions", {date});
        setRooms(res);
      } else {
        const res = await GetApi(EndpointRoute.rooms, {date});
        setRooms(res);
      }
    })();
  }, [date]);

  if (!rooms) return <Loading />;

  return <RoomsCards date={date} rooms={rooms} />;
}

export function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
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
        <BackButton />
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
        {room.max_participants && (
          <li>
            <strong>Participants maximum :</strong> {room.max_participants}
          </li>
        )}
      </ul>
      <div>
        <button onClick={() => navigate(`${FrontRoute.Booking}/${room._id}?date=${date}`)}>Réserver</button>
        <BackButton/>
      </div>
    </div>
  );
}

export function RoomsCards({ rooms, date }: { rooms: Room[], date?: string }) {
  const rows = chunkArray(rooms, 3);

  return (
    <>
      {rows.map((row, i) => (
        <div className="cards" key={i}>
          {row.map((room) => (
            <Link
              to={`${FrontRoute.Rooms}/${room._id}?date=${date}`}
              className="card"
              key={room._id}
            >
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p><strong>Temps estimé : </strong>{room.estimated_duration} minutes</p>
              <p><strong>Temps maximum : </strong>{room.duration} minutes</p>
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