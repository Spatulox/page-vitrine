import { Link, useNavigate, useParams } from "react-router-dom";
import { rooms } from "../data";
import { UrlRoute } from "../../App";

export type Room = {
    _id: number,
    name: string,
    description: string,
    long_description: string,
    price: number,
    estimated_duration: number,
    duration: number, /* In Minutes */
    participants: number,
    max_participants: number,
}

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
);


export function Room() {
  return (
    <RoomsCards />
  );
}


export function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const room = id ? rooms[parseInt(id, 10)] : undefined;
  const navigate = useNavigate()

  if (!room) {
    return (
      <div>
        <h1>Salle non trouvée</h1>
        <Link to="/rooms">Retour à la liste</Link>
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
        <button onClick={() => navigate(`${UrlRoute.Booking}/${room._id}`)}>Réserver</button>
        <Link to={UrlRoute.Rooms}>← Retour à la liste</Link>
      </div>
    </div>
  );
}



export function RoomsCards() {
  const rows = chunkArray(rooms, 3);

  return (
    <>
      {rows.map((row, i) => (
        <div className="cards" key={i}>
          {row.map((room) => (
            <Link
              to={`${UrlRoute.Rooms}/${room._id}`}
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