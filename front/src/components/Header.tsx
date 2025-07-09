import { UrlRoute } from "../App";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "./Theme";

function Header() {
    const { isLogged, logout } = useAuth();
    const [theme, setTheme] = useTheme() // Unused here, but it run in the background once imported, so we need to import it here

    return (
        <header>
            <nav>
                <div className="theme-select">
                    <select
                        id="theme-select"
                        value={theme}
                        onChange={e => setTheme(e.target.value as "light" | "dark")}
                    >
                        <option value="light">Light mode</option>
                        <option value="dark">Dark mode</option>
                    </select>
                </div>
                <div>
                    <Link to={UrlRoute.Base}>Accueil</Link> |{" "}
                    <Link to={UrlRoute.Sessions}>Sessions</Link> |{" "}
                    <Link to={UrlRoute.Booking}>Réservation</Link> |{" "}
                    <Link to={UrlRoute.Contact}>Contact</Link> |{" "}
                    {isLogged ? (<>
                        <Link to={UrlRoute.Account}>Compte</Link> |{" "}
                        <Link to={""} onClick={logout}>Se déconnecter</Link>
                        </>
                    ) : (
                        <Link to={UrlRoute.Account}>Compte</Link>
                    )}
                </div>
            </nav>
        </header>
    );
}


export default Header