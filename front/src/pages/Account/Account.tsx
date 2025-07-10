import { useEffect, useState } from "react";
import { GetApi, PostApi, UserIsLogged } from "../../api/Axios";
import { UserRole, type User } from "../../api/User";
import Loading from "../../components/Loading";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { FrontRoute } from "../../App";
import DisplayUser from "../Users/DisplayUser";
import { EndpointRoute } from "../../api/Endpoint";

export default function Account() {
    const [me, setMe] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const {login} = useAuth()

    // Champs du formulaire de login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (UserIsLogged()) {
                try {
                    const res = await GetApi(EndpointRoute.me);
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
            const res = await PostApi(EndpointRoute.login, { email, password });
            // Stocke les tokens si l'API en renvoie
            if (res.accessToken) localStorage.setItem("accessToken", res.accessToken);
            if (res.refreshToken) localStorage.setItem("refreshToken", res.refreshToken);
            if(res.accessToken){
                const user = await GetApi(EndpointRoute.me);
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

    return <>
        <DisplayUser
            user={me}
            me={me}
        />
        <button onClick={() => navigate(FrontRoute.UpdateAccount)}>Mettre à jour mon compte</button>
    </>
}
