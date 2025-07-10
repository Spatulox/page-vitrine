import {Link} from 'react-router-dom';
import { FrontRoute } from '../App';

function Footer() {
    return (
    <footer>
        <p>Suivez-nous :
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> |
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
        <p>
            <Link to={FrontRoute.Sessions}>Détails des sessions</Link> |{" "}
            <Link to={FrontRoute.Contact}>Contact</Link> |{" "}
            <Link to={FrontRoute.Legal}>Mentions légales</Link>
        </p>
    </footer>
    )
}

export default Footer;
