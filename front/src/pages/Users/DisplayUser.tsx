import type { User } from "../../api/User";

type Props = {
  user: User;
  me: User;
};

export default function DisplayUser({ user, me }: Props) {
  return (
    <div className="user-details-container">
    <div className="user-details">
      <h1>Détails de l'utilisateur</h1>
      <div className="display-user">
        <label>
          Nom : {user.name}
        </label>
        <label>
          Prénom : {user.lastname}
        </label>
        <label>
          Email : {user.email}
        </label>
        <label>
          Téléphone : {user.phone}
        </label>
        <label>
          Rôle : {user.role}
        </label>
      </div>
    </div>
    </div>
  );
}