function Booking() {
    const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD

    return (
        <div className="booking-container">
            <h1 className="booking-title">RÉSERVATION</h1>

            <p className="booking-info">
                Les réservations s’effectuent <strong>exclusivement en ligne</strong>, jusqu’à 3 mois à l’avance.
            </p>

            <form className="booking-form">
                <div className="booking-controls">
                    <select required>
                        <option value="">Choisissez une session</option>
                        <option value="crypte">La Crypte Maudite</option>
                        <option value="manoir">Le Manoir du Diable</option>
                        <option value="asile">Asile 666</option>
                        <option value="mine">La Mine Oubliée</option>
                        <option value="train">Train Fantôme</option>
                        <option value="labo">Le Laboratoire Interdit</option>
                    </select>

                    <input type="date" min={today} required />

                    <select required>
                        <option value="">Choisissez une heure</option>
                        <option value="09:30">09:30</option>
                        <option value="11:15">11:15</option>
                        <option value="13:00">13:00</option>
                        <option value="14:45">14:45</option>
                        <option value="16:30">16:30</option>
                        <option value="18:15">18:15</option>
                        <option value="20:00">20:00</option>
                        <option value="21:45">21:45</option>
                    </select>
                </div>

                <div className="booking-inputs">
                    <input type="text" placeholder="Nom" required />
                    <input type="email" placeholder="Email" required />
                </div>

                <button type="submit" className="booking-button">Continuer ma réservation</button>
            </form>
        </div>
    );
}

export default Booking;
