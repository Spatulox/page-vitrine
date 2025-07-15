import React, { useEffect, useState } from "react";
import { DeleteApi, GetApi, PutApi } from "../../api/Axios";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { FrontRoute } from "../../App";
import { EndpointRoute } from "../../api/Endpoint";
import DetailsNormalUser from "../Users/DetailsNormalUser";
import { UserRole } from "../../api/User";
import BackButton from "../../components/BackButton";
import { ToastService } from "../../services/ToastService";

async function fetchCurrentUser(): Promise<User> {
  const res = await GetApi(EndpointRoute.me)
  return res
}

async function updateAccountEndpoint(data: Partial<User>): Promise<boolean> {
    const {me} = useAuth()
    if(!me){
        ToastService.error("Pas de moi")
        return false
    }
    try {
        await PutApi(`/${EndpointRoute.users}/${me._id}`, data);
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

async function deleteAccountEndpoint(): Promise<boolean> {
    if (!window.confirm("Supprimer cet utilisateur ?")) return false;
    const {me} = useAuth()
    const navigate = useNavigate()
    if(!me){
        ToastService.error("Pas de moi")
        return false
    }
    try {
        await DeleteApi(`/${EndpointRoute.users}/${me._id}`);
        navigate(FrontRoute.Base);
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

type User = {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role: UserRole;
};


type FormUser = {
  name: string;
  lastname: string;
  phone: string;
  role: UserRole;
};

export default function UpdateAccount() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<FormUser>({
    name: "",
    lastname: "",
    phone: "",
    role: UserRole.client,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const {me} = useAuth()

  useEffect(() => {
    fetchCurrentUser().then((u) => {
      setUser(u);
      setForm({
        name: u.name || "",
        lastname: u.lastname || "",
        phone: u.phone || "",
        role: u.role || "client",
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
    const success = await updateAccountEndpoint(form);
    setMessage(success ? "Mise à jour réussie !" : "Erreur lors de la mise à jour.");
  };

  const handleDelete = async () => {
    setMessage(null);
    const success = await deleteAccountEndpoint();
    setMessage(success ? "Compte supprimé !" : "Erreur lors de la suppression.");
    // Optionnel : rediriger ou déconnecter
  };

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur non trouvé.</div>;


  return (<div style={{display: "block"}}>
      <DetailsNormalUser
        user={user}
        form={form}
        me={me}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <BackButton />
      </div>
  );
  /*
  return (
    <div className="user-details-container">
    <div className="user-details">
      <h1>Mon compte</h1>
      <div className="">
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
        <div className="user-details-actions">
          <button className="user-delete-btn" onClick={handleDelete}>
            Supprimer mon compte
          </button>
          <button className="user-update-btn" onClick={handleUpdate}>
            Mettre à jour
          </button>
        </div>
        {message && <div className="account-message">{message}</div>}
      </div>
    </div>
    </div>
  );*/
}