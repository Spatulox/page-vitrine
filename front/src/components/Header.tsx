import { FrontRoute } from "../App";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "./Theme";
import { UserRole } from "../api/User";

function Header() {
    const { isLogged, logout, me } = useAuth();
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
                    <Link to={FrontRoute.Base}>Accueil</Link> |{" "}
                    <Link to={FrontRoute.Booking}>Réserver</Link> |{" "}
                    <Link to={FrontRoute.Contact}>Contact</Link> |{" "}
                    {isLogged ? (
                        <>
                            <Link to={FrontRoute.Account}>Compte</Link> |{" "}
                            {me?.role !== UserRole.client && (
                                <>
                                <Link to={FrontRoute.Manage}>Gérer</Link> |{" "}
                                </>
                            )}
                            <Link to={""} onClick={logout}>Se déconnecter</Link>
                        </>
                    ) : (
                        <Link to={FrontRoute.Account}>Compte</Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

//<Link to={FrontRoute.Booking}>Réservation</Link> |{" "}

export default Header