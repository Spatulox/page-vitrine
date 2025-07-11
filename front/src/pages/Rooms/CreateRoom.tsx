import React, { useState } from "react";
import type { Room } from "../../api/Room";
import { PostApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";

const EMPTY_ROOM: Omit<Room, "_id" | "visible"> = {
  name: "",
  description: "",
  long_description: "",
  price: 12,
  estimated_duration: 50,
  duration: 60,
  max_participants: 1,
};

type Props = {
    onCreated?: () => void,
}

export default function CreateRoom({onCreated}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState<Omit<Room, "_id" | "visible">>(EMPTY_ROOM);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      [name]: name === "price" || name === "estimated_duration" || name === "duration" || name === "max_participants"
        ? Number(value)
        : value,
    }));
  }

  function handleClose() {
    setShowModal(false);
    setNewRoom(EMPTY_ROOM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
        await PostApi(`${EndpointRoute.adminRoom}`, newRoom)
    } catch (error) {
        console.error(error)
    }
    if(onCreated){
        onCreated()
    }
    handleClose();
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>Ajouter une salle</button>
      {showModal && (
        <div className="modal-overlay">
          <form className="modal" onSubmit={handleSubmit}>
            <h2>Ajouter une salle</h2>
            <label>
              Nom :
              <input
                type="text"
                name="name"
                value={newRoom.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description courte :
              <input
                type="text"
                name="description"
                value={newRoom.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description longue :
              <textarea
                name="long_description"
                value={newRoom.long_description}
                onChange={handleChange}
                rows={3}
                style={{ width: "100%", margin: "1rem 0" }}
                required
              />
            </label>
            <label>
              Prix (€) :
              <input
                type="number"
                name="price"
                value={newRoom.price}
                onChange={handleChange}
                required
                min={0}
              />
            </label>
            <label>
              Durée estimée (min) :
              <input
                type="number"
                name="estimated_duration"
                value={newRoom.estimated_duration}
                onChange={handleChange}
                required
                min={0}
              />
            </label>
            <label>
              Durée réelle (min) :
              <input
                type="number"
                name="duration"
                value={newRoom.duration}
                onChange={handleChange}
                required
                min={0}
              />
            </label>
            <label>
              Max participants :
              <input
                type="number"
                name="max_participants"
                value={newRoom.max_participants}
                onChange={handleChange}
                required
                min={1}
              />
            </label>
            <div className="modal-actions">
              <button type="button" className="modal-btn cancel" onClick={handleClose}>
                Annuler
              </button>
              <button type="submit" className="modal-btn">
                Créer
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
