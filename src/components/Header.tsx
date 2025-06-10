import { Link } from "react-router-dom"

function Header(){
    return (
        <header>
            <nav>
                <Link to="/">Accueil</Link> |{" "}
                <Link to="/sessions">Sessions</Link> |{" "}
                <Link to="/booking">Réservation</Link> |{" "}
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    )
}

export default Header