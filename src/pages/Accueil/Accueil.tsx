import { Link } from "react-router-dom";

function Accueil() {
    return (
        <div>
            <h1>La Maison Horrifique</h1>
            <p>
                Bienvenue dans l’univers terrifiant de l’escape game horreur.
            </p>

            <div className="cards">
                <Link to="/crypte" className="card">
                    <h3>La Crypte Maudite</h3>
                    <p>Explorez une crypte maudite et échappez à ses pièges mortels.</p>
                    <p><strong>Tarif :</strong> 14€/joueur</p>
                </Link>

                <Link to="/manoir" className="card">
                    <h3>Le Manoir du Diable</h3>
                    <p>Infiltrez un manoir abandonné et affrontez ses forces maléfiques.</p>
                    <p><strong>Tarif :</strong> 16€/joueur</p>
                </Link>

                <Link to="/asile" className="card">
                    <h3>Asile 666</h3>
                    <p>Survivrez-vous à l’asile oublié ? Frissons garantis.</p>
                    <p><strong>Tarif :</strong> 18€/joueur</p>
                </Link>
            </div>

            <div className="cards">

                <Link to="/mine" className="card">
                    <h3>La Mine Oubliée</h3>
                    <p>Explorez une galerie où les mineurs ont disparu...</p>
                    <p><strong>Tarif :</strong> 15€/joueur</p>
                </Link>

                <Link to="/labo" className="card">
                    <h3>Le Laboratoire Interdit</h3>
                    <p>Des expériences ont mal tourné… À vous d’en sortir.</p>
                    <p><strong>Tarif :</strong> 17€/joueur</p>
                </Link>

                <Link to="/train" className="card">
                    <h3>Train Fantôme</h3>
                    <p>Un train maudit vous attend… oserez-vous monter à bord ?</p>
                    <p><strong>Tarif :</strong> 16€/joueur</p>
                </Link>
            </div>

            <h2>À propos</h2>
            <p >
                La Maison Horrifique propose des expériences immersives uniques à Lyon depuis 2020.
            </p>

        </div>
    );
}

export default Accueil;
