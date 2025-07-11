import React, { useState } from "react";
import type { User } from "../../api/User";
import { GetApi, PostApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import { useAuth } from "../../components/AuthContext";

interface AccountCreationFormProps {
  onSuccess?: (userData: User | null) => void;
  onClose?: () => void;
}

type UserInfo = {
  name: string,
  lastname: string,
  email: string,
  phone: string,
  password: string
}

export default function AccountCreationForm({
  onSuccess,
  onClose,
}: AccountCreationFormProps) {
  const [name, setName] = useState("");
  const [lastname, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {me, login} = useAuth()

  async function createAccount(user: UserInfo): Promise<User | null>{
    try {
        let res = await PostApi(`${EndpointRoute.register}`, user)
        if (res.accessToken) localStorage.setItem("accessToken", res.accessToken);
        if (res.refreshToken) localStorage.setItem("refreshToken", res.refreshToken);
        if(res.accessToken){
            await login()
            return me
        }
        return null
        res = await GetApi(EndpointRoute.me)
        return res
    } catch (e: any) {
        setError("Identifiants invalides");
        return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation simple
    if (!name || !lastname || !email || !phone || !password) {
      setError("Merci de remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      // Création du compte
      const user: User | null = await createAccount({
        name,
        lastname,
        email,
        phone,
        password,
      });

      if(onSuccess){
        onSuccess(user);
      }

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

  return (<>
  <h1>Créer un compte</h1>
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
        value={lastname}
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
    </>
  );
}
