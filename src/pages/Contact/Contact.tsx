function Contact() {
    return (
        <div className="contact-container">
            <h1>📞 CONTACT THE GAME 📞</h1>
            <p>Vous souhaitez obtenir plus d'informations sur La Maison Horrifique ?</p>
            <p><strong>Toutes les réponses aux questions les plus fréquentes sont dans notre FAQ.</strong></p>
            <p>
                Vous n'avez pas trouvé de réponse ? Contactez-nous via ce formulaire ou directement par mail à<br />
                <a href="mailto:contact@maisonhorrifique.fr">contact@maisonhorrifique.fr</a>
            </p>
            <p>
                📵 Nous vous invitons à <strong>privilégier le formulaire</strong> pour une réponse rapide.<br />
                ☎️ <strong>+33 1 43 29 26 21</strong>
            </p>

            <form className="contact-form">
                <div className="form-row">
                    <input type="text" placeholder="Nom *" required />
                    <input type="text" placeholder="Prénom *" required />
                </div>
                <div className="form-row">
                    <input type="tel" placeholder="N° de Téléphone *" required />
                    <input type="email" placeholder="Email *" required />
                </div>
                <input type="text" placeholder="Objet de votre demande" />
                <textarea placeholder="Votre message" rows={5}></textarea>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default Contact;
