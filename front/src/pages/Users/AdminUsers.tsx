import { useState } from "react";
import EmployeeUsers from "./EmployeeUsers";
import { PostApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";

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
    const res = await PostApi(EndpointRoute.adminUser, form)
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
        <div className="popup-create-employee-account">
          <div className="popup-content">
            <button
              className="popup-close"
              onClick={handleClosePopup}
              aria-label="Fermer"
            >
              ×
            </button>
            <h1>Nouvel compte Employé</h1>
            <form onSubmit={handleSubmit} className="popup-form">
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
              <button type="submit" className="popup-submit">
                Créer
              </button>
              {message && <div className="popup-message">{message}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
