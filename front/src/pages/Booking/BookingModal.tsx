import React, { useEffect, useState } from "react";
import "./Booking.css";
import { useAuth } from "../../components/AuthContext";
import AccountCreationForm from "../Account/AccountCreationForm";
import Account from "../Account/Account";
import type { User } from "../../api/User";
import { GetApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import type { Room } from "../../api/Room";
export type ClientReserveType = { user_id: string, start_time: any, end: any, participants: number }


interface ReservationModalProps {
  open: boolean;
  room: Room,
  onClose: () => void;
  onReserve: (data: ClientReserveType) => void;
  start: string;
  end: string;
}

export default function ReservationModal({
  open,
  room,
  onClose,
  onReserve,
  start,
  end,
}: ReservationModalProps) {
  const { me, isLogged } = useAuth();
  const [showCreation, setShowCreation] = useState(false);
  const [pendingAccount, setPendingAccount] = useState(false);
  const [user, setUser] = useState<User | null>()
  const [participants, setParticipants] = useState(1)

  useEffect(() => {
    (async () => {
      if (pendingAccount && isLogged) {
        try {
          const res = await GetApi(EndpointRoute.me) 
          setUser(res)
          setShowCreation(false);
          setPendingAccount(false);
        } catch (error) {
          setUser(null)
        }
      }
    })()
  }, [pendingAccount, isLogged, me]);

  useEffect(() => {
    (async () => {
      if (isLogged) {
        try {
          const res = await GetApi(EndpointRoute.me) 
          setUser(res)
        } catch (error) {
          setUser(null)
        }
      }
    })()
  }, []);

  if (!open) return null;

  function handleParticipants(e: any){
    const { name, value } = e.target;
    setParticipants(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogged && user?._id) {
      const data: ClientReserveType = {
        user_id: user?._id,
        start_time: start,
        end,
        participants,
      }
      onReserve(data);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Réserver la salle</h2>
        <ul>
          <li>Créneau : <b>{(new Date(start)).toLocaleString()}</b> à <b>{(new Date(end)).toLocaleString()}</b></li>
          <li>Nom : <b>{user?.name} {user?.lastname}</b></li>
          <li>Participants Maximium : {room.max_participants}</li>
        </ul>
        {isLogged && user?._id ? (
          <form onSubmit={handleSubmit}>
            <label>
                Nom :
                <input type="number" name="participants" min={1} max={room.max_participants} value={participants} onChange={handleParticipants} required />
              </label>
            <p>
              Confirmer la réservation ?
            </p>
            <div className="modal-actions">
              <button className="modal-btn" type="submit">
                Oui, réserver
              </button>
              <button className="modal-btn cancel" type="button" onClick={onClose}>
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>Veuillez vous connecter avant de réserver</p>
            {!showCreation ? (
              <Account
                onSuccess={() => setPendingAccount(true)}
              />
            ) : (
              <AccountCreationForm
                onSuccess={() => setPendingAccount(true)}
                onClose={() => setShowCreation(false)}
              />
            )}
            <button onClick={() => setShowCreation((prev) => !prev)}>
              {showCreation ? "Se connecter" : "Créer un compte"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}