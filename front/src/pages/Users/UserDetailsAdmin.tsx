import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserRole, type User } from "../../api/User";
import { GetApi, PutApi, DeleteApi } from "../../api/Axios";
import { FrontRoute } from "../../App";
import { useAuth } from "../../components/AuthContext";
import DetailsNormalUser from "./DetailsNormalUser";
import { EndpointRoute } from "../../api/Endpoint";
import { ToastService } from "../../services/ToastService";

export default function UserDetailsAdmin() {
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

  useEffect(() => {
    (async () => {
      try {
        const res = await GetApi(`${EndpointRoute.adminUser}/${id}`);
        setUser(res);
        setForm({
          name: res.name,
          lastname: res.lastname,
          role: res.role,
          phone: res.phone,
        });
      } catch (e) {
        ToastService.error("Utilisateur introuvable !");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate() {
    try {
      await PutApi(`${EndpointRoute.adminUser}/${id}`, form);
    } catch (e) {
      console.log(e)
    }
  }

  async function handleDelete() {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await DeleteApi(`${EndpointRoute.adminUser}/${id}`);
      navigate(FrontRoute.Users);
    } catch (e) {
      console.log(e)
    }
  }

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur introuvable.</div>;

  return (
    <DetailsNormalUser
      user={user}
      form={form}
      me={me}
      handleChange={handleChange}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  );
}
