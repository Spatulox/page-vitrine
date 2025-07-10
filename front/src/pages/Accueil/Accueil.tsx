import { Room, RoomsCards } from "../Rooms/Rooms";

function Accueil() {

    return (
        <div>
            <h1>La Maison Horrifique</h1>
            <p>
                Bienvenue dans l’univers terrifiant de l’escape game horreur.
            </p>

            <Room />

            <h2>À propos</h2>
            <p >
                La Maison Horrifique propose des expériences immersives uniques à Lyon depuis 2020.
            </p>

        </div>
    );
}

export default Accueil;
