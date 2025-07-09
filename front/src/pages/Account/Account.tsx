import { useEffect, useState } from "react";
import { GetApi, PostApi, UserIsLogged } from "../../api/Axios";
import type { User } from "../../api/User";
import Loading from "../../components/loading";
import { useAuth } from "../../components/AuthContext";

export default function Account() {
    const [me, setMe] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const {login} = useAuth()

    // Champs du formulaire de login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (UserIsLogged()) {
                try {
                    const res = await GetApi("/users/@me");
                    setMe(res);
                } catch (e) {
                    setMe(null);
                }
            }
            setLoading(false);
        })();
    }, []);

    // Gestion du login
    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await PostApi("/auth/login", { email, password });
            // Stocke les tokens si l'API en renvoie
            if (res.accessToken) localStorage.setItem("accessToken", res.accessToken);
            if (res.refreshToken) localStorage.setItem("refreshToken", res.refreshToken);
            if(res.accessToken){
                const user = await GetApi("/users/@me");
                setMe(user);
                login()
            }
        } catch (e: any) {
            setError("Identifiants invalides");
        }
        setLoading(false);
    }

    if (loading) return <Loading />;

    if (!me) {
        return (
            <div className="login-container">
                <h1>Connexion</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Se connecter</button>
                    {error && <div className="login-error">{error}</div>}
                </form>
            </div>
        );
    }

    return (
        <div className="account-container">
            <h1>Mon compte</h1>
            <p><strong>Nom :</strong> {me.name}</p>
            <p><strong>Email :</strong> {me.email}</p>
            <p><strong>Téléphone :</strong> {me.phone}</p>
            {/* Ajoute d'autres infos utilisateur ici */}
            <h1>Mes réservations</h1>
            <h1>Mon Historique de reservations</h1>
        </div>
    );
}
