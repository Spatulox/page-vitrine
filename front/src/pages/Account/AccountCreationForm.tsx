import React, { useState } from "react";

interface AccountCreationFormProps {
  onSuccess?: (userData: any) => void; // À adapter selon ton besoin
  onClose?: () => void;
}

export default function AccountCreationForm({
  onSuccess,
  onClose,
}: AccountCreationFormProps) {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simule la création de compte (à remplacer par ton appel API)
  const createAccount = async (user: any) => {
    // Exemple d'appel API: await fetch('/api/register', { ... })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "existant@mail.com") reject("Email déjà utilisé !");
        else resolve({ id: 123, ...user });
      }, 1200);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation simple
    if (!name || !prenom || !email || !phone || !password) {
      setError("Merci de remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      // Création du compte
      const user: any = await createAccount({
        name,
        prenom,
        email,
        phone,
        password,
      });

      onSuccess(user);

      // Nettoyage des champs
      setName("");
      setPrenom("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (err: any) {
      setError(err?.toString() || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        autoFocus
      />
      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={e => setPrenom(e.target.value)}
      />
      <input
        type="email"
        placeholder="Adresse mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Numéro de téléphone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <div className="form-error">{error}</div>}
      <div className="modal-actions">
        <button className="modal-btn" type="submit" disabled={loading}>
          {loading ? "Création en cours..." : "Créer le compte"}
        </button>
        <button className="modal-btn cancel" type="button" onClick={onClose} disabled={loading}>
          Annuler
        </button>
      </div>
    </form>
  );
}
