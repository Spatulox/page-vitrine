import './Sessions.css';

function Sessions() {
    return (
        <div className="sessions-container">
            <h1>Détails des Sessions</h1>
            <p className="intro">
                Chaque session dure environ 1 heure. Groupes de 2 à 6 joueurs. Ambiance garantie.
            </p>

            <h2>Déroulement d’une Session</h2>
            <p className="centered-text">
                Vous arrivez 15 minutes avant le début de la session. Un briefing est fait avant d’entrer dans la salle.<br />
                L’équipe a 60 minutes pour résoudre les énigmes et s’échapper. Une Game Master vous guide à distance si besoin.
            </p>

            <h2>Réservation</h2>
            <p className="centered-text">
                Les réservations se font via le formulaire en ligne. Le paiement s’effectue sur place par carte ou espèces.
            </p>

            <h2>Règlement</h2>
            <ul className="reglement-list">
                <li>Les participants doivent avoir plus de 16 ans.</li>
                <li>L’alcool et les comportements agressifs sont strictement interdits.</li>
                <li>Tout dégât causé par négligence sera facturé.</li>
                <li>Il est interdit de filmer ou photographier l’intérieur des salles.</li>
            </ul>
        </div>
    );
}

export default Sessions;
