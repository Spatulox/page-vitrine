function Booking(){
    return (
        <div>
            <h1>Formulaire de Réservation</h1>
            <form>
            <input type="text" placeholder="Nom" required /><br />
            <input type="email" placeholder="Email" required /><br />
            <select required>
                <option value="">Choisissez une session</option>
                <option value="crypte">Crypte Maudite</option>
                <option value="manoir">Manoir du Diable</option>
                <option value="asile">Asile 666</option>
            </select><br />
            <input type="date" required /><br />
            <button type="submit">Réserver</button>
            </form>
        </div>
    )
}

export default Booking