import { Link, useParams } from "react-router-dom";
import { rooms } from "../data";
import { UrlRoute } from "../../App";

export type Room = {
    _id: number,
    name: string,
    description: string,
    long_description: string,
    price: number,
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

  if (!room) {
    return (
      <div>
        <h1>Salle non trouvée</h1>
        <Link to="/rooms">Retour à la liste</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{room.name}</h1>
      <p>{room.description}</p>
      <p>
        <strong>Tarif :</strong> {room.price}€/joueur
      </p>
      <Link to={UrlRoute.Base}>← Retour à la liste</Link>
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