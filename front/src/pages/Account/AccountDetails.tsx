import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserRole, type User } from "../../api/User";
import { GetApi, PutApi, DeleteApi } from "../../api/Axios";
import { UrlRoute } from "../../App";
import { useAuth } from "../../components/AuthContext";

export default function AccountDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  const {me} = useAuth()

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<User, "_id" | "email">>({
    name: "",
    lastname: "",
    role: "client",
    phone: "",
  });

  // Charger l'utilisateur
  useEffect(() => {
    (async () => {
      try {
        const res = await GetApi(`/admin/users/${id}`);
        setUser(res);
        setForm({
          name: res.name,
          lastname: res.lastname,
          role: res.role,
          phone: res.phone,
        });
      } catch (e) {
        alert("Utilisateur introuvable !");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  // Gérer la modification des inputs
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Mettre à jour l'utilisateur
  async function handleUpdate() {
    try {
      await PutApi(`/admin/users/${id}`, form);
    } catch (e) {
      alert("Erreur lors de la mise à jour.");
    }
  }

  // Supprimer l'utilisateur
  async function handleDelete() {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await DeleteApi(`/admin/users/${id}`);
      navigate(UrlRoute.Users);
    } catch (e) {
      alert("Erreur lors de la suppression.");
    }
  }

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur introuvable.</div>;

  return (
    <div>
      <h1>Détails de l'utilisateur</h1>
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
        {me?.role == UserRole.admin && (
          <label>
            Rôle :
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="client">Client</option>
              <option value="employee">Employé</option>
                <option value="admin">Admin</option>
                </select>
          </label>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button style={{ background: "red", color: "white" }} onClick={handleDelete}>
            Supprimer l'utilisateur
          </button>
          <button style={{ background: "green", color: "white" }} onClick={handleUpdate}>
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
}
