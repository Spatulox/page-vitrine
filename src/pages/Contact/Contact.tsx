function Contact() {
    return (
        <div>
            <h1>Contactez-nous</h1>
            <form>
                <input type="text" placeholder="Nom" required/><br/>
                <input type="email" placeholder="Email" required/><br/>
                <textarea placeholder="Votre message..." required></textarea><br/>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    )
}

export default Contact