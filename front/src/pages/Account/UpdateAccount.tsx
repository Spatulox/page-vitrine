import React, { useEffect, useState } from "react";
import { DeleteApi, PutApi } from "../../api/Axios";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { UrlRoute } from "../../App";

// Simule une API ou un contexte pour récupérer l'utilisateur connecté
async function fetchCurrentUser(): Promise<User> {
  // Remplace par ton appel réel (fetch/axios ou context)
  return {
    _id: "123",
    name: "Jean",
    lastname: "Dupont",
    email: "jean.dupont@email.com",
    phone: "0601020304",
    role: "client",
  };
}

// Simule une API d'update
async function updateMyAccountEndpoint(data: Partial<User>) {
    const {me} = useAuth()
    if(!me){
        alert("Pas de moi")
        return
    }
    try {
        await PutApi(`/users/${me._id}`, data);
    } catch (e) {
        console.log(e)
    }
}

// Simule une API de suppression
async function deleteMyAccountEndpoint() {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    const {me} = useAuth()
    const navigate = useNavigate()
    if(!me){
        alert("Pas de moi")
        return
    }
    try {
        await DeleteApi(`/users/${me._id}`);
        navigate(UrlRoute.Base);
    } catch (e) {
        console.log(e)
    }
}

type User = {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role: "client" | "employee" | "admin";
};

const UserRole = {
  client: "client",
  employee: "employee",
  admin: "admin",
};

export default function UpdateMyAccount() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentUser().then((u) => {
      setUser(u);
      setForm({
        name: u.name || "",
        lastname: u.lastname || "",
        phone: u.phone || ""
      });
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setMessage(null);
    const success = await updateMyAccountEndpoint(form);
    setMessage(success ? "Mise à jour réussie !" : "Erreur lors de la mise à jour.");
  };

  const handleDelete = async () => {
    setMessage(null);
    const success = await deleteMyAccountEndpoint();
    setMessage(success ? "Compte supprimé !" : "Erreur lors de la suppression.");
    // Optionnel : rediriger ou déconnecter
  };

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur non trouvé.</div>;

  return (
    <div>
      <h1>Mon compte</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
        <label>
          Nom :
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          Prénom :
          <input
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          Email : {user.email}
        </label>
        <label>
          Téléphone :
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
          />
        </label>
        <label>
          Rôle : {user.role}
        </label>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button style={{ background: "red", color: "white" }} onClick={handleDelete}>
            Supprimer mon compte
          </button>
          <button style={{ background: "green", color: "white" }} onClick={handleUpdate}>
            Mettre à jour
          </button>
        </div>
        {message && <div style={{ marginTop: 10, color: "blue" }}>{message}</div>}
      </div>
    </div>
  );
}