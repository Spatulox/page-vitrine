import { UrlRoute } from "../App";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

function Header() {
    const { isLogged, logout } = useAuth();

    return (
        <header>
            <nav>
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