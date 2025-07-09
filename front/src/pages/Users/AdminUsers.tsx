import { useState } from "react";
import EmployeeUsers from "./EmployeeUsers";
import { PostApi } from "../../api/Axios";

export default function AdminUsers() {
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    role: "employee",
  });
  const [message, setMessage] = useState("");

  function handleCreateEmployeeUsers() {
    setShowPopup(true);
    setMessage("");
    setForm({
      name: "",
      lastname: "",
      email: "",
      phone: "",
      role: "employee",
    });
  }

  function handleClosePopup() {
    setShowPopup(false);
    setMessage("");
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await PostApi("/admin/users", form)
    console.log(res)
    setMessage("Compte employé créé !");
    setTimeout(() => {
      setShowPopup(false);
      setMessage("");
    }, 1500);
  }

  return (
    <>
        <button onClick={handleCreateEmployeeUsers}>Créer un compte employé</button>
        <EmployeeUsers />

      {showPopup && (
        <div className="popup-create-employee-account" style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "rgb(32, 32, 32)",
            padding: 32,
            borderRadius: 8,
            minWidth: 350,
            boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
            position: "relative"
          }}>
            <button
              style={{ position: "absolute", top: 8, right: 8, fontSize: 18, background: "none", border: "none", cursor: "pointer", width: "50px" }}
              onClick={handleClosePopup}
              aria-label="Fermer"
            >
              ×
            </button>
            <h1>Nouvel compte Employé</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label>
                Nom :
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Prénom :
                <input name="lastname" value={form.lastname} onChange={handleChange} required />
              </label>
              <label>
                Email :
                <input name="email" value={form.email} onChange={handleChange} type="email" required />
              </label>
              <label>
                Téléphone :
                <input name="phone" value={form.phone} onChange={handleChange} type="tel" />
              </label>
              <label>
                Rôle : <b>Employé</b>
              </label>
              <button type="submit" style={{ background: "green", color: "white" }}>
                Créer
              </button>
              {message && <div style={{ color: "green" }}>{message}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
