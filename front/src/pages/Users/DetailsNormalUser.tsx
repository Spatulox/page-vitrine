import React from "react";
import { type User, UserRole } from "../../api/User";
import BackButton from "../../components/BackButton";

type DetailsNormalUserProps = {
  user: User;
  form: {
    name: string;
    lastname: string;
    role: string;
    phone: string;
  };
  me?: User | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleUpdate: () => void;
  handleDelete: () => void;
};

const DetailsNormalUser: React.FC<DetailsNormalUserProps> = ({
  user,
  form,
  me,
  handleChange,
  handleUpdate,
  handleDelete,
}) => (
  <div className="user-details-container">
    <div className="user-details">
      <h1>Détails de l'utilisateur</h1>
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
      {me?.role === UserRole.admin ? (
        <label>
          Rôle :
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="employee">Employé</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      ) : (
        <label>
          Rôle : {user.role}
        </label>
      )}
      <div className="user-details-actions">
        <button className="user-delete-btn" onClick={handleDelete}>
          Supprimer l'utilisateur
        </button>
        <button className="user-update-btn" onClick={handleUpdate}>
          Mettre à jour
        </button>
      </div>
    </div>
    <BackButton/>
  </div>
);

export default DetailsNormalUser;