import type { User } from "../../api/User";

type Props = {
  user: User;
  me: User;
};

export default function DisplayUser({ user, me }: Props) {
  return (
    <div>
      <h1>Détails de l'utilisateur</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
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
  );
}