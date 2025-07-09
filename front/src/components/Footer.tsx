import {Link} from 'react-router-dom';

function Footer() {
    return (
    <footer>
        <p>Suivez-nous :
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> |
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
        <p>
            <Link to="/sessions">Détails des sessions</Link> |{" "}
            <Link to="/contact">Contact</Link> |{" "}
            <Link to="/legal">Mentions légales</Link>
        </p>
    </footer>
    )
}

export default Footer;
