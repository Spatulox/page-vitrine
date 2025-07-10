import React, { useState } from "react";
import "./Booking.css";
import { useAuth } from "../../components/AuthContext";
import AccountCreationForm from "../Account/AccountCreationForm";
import { GetApi, PostApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import { useNavigate } from "react-router-dom";
import Account from "../Account/Account";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  onReserve: (data: any) => void;
  start: string;
  end: string;
}

export default function ReservationModal({
  open,
  onClose,
  onReserve,
  start,
  end,
}: ReservationModalProps) {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { me, isLogged } = useAuth();
  const navigate = useNavigate()

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogged) {
      onReserve({ userId: me?._id, start, end });
    } else {
      if (
        !name.trim() ||
        !prenom.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !password.trim()
      ) {
        alert("Merci de remplir tous les champs.");
        return;
      }
      // Tu pourras appeler ici ton API pour créer le compte puis réserver
      onReserve({ name, prenom, email, phone, password, start, end });
    }
    setName("");
    setPrenom("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Réserver la salle</h2>
        <p>
          Créneau : <b>{start}</b> à <b>{end}</b>
        </p>
        {isLogged ? (
          <form onSubmit={handleSubmit}>
            <p>
              Confirmer la réservation pour <b>{me?.name} {me?.lastname}</b> ?
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
        ) : (<div>
                <p>Veuillez vous connecter avant de réserver</p>
                <Account />
                <AccountCreationForm
                onSuccess={(user) => ({})}
                onClose={() => ({})}
                />
              </div>
            )}
      </div>
    </div>
  );
}
