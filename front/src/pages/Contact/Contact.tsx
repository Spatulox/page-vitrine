import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { PostApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import { ToastService } from "../../services/ToastService";

function Contact() {
    const {me} = useAuth()
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    
    const [subject, setSubject] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        if (me) {
            setFirstName(me.name || '')
            setLastName(me.lastname || '')
            setPhone(me.phone || '')
            setEmail(me.email || '')
        }
    }, [me])


    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        const formData = {
            name: firstName,
            lastname: lastName,
            phone,
            email,
            subject,
            message,
        }

        if(!subject || subject.length < 3){
            ToastService.info("Le sujet doit faire au moins 3 caractères")
            return
        }


        if(!message || message.length < 3){
            ToastService.info("Le message doit faire au moins 3 caractères")
            return
        }

        console.log('Formulaire soumis :', formData)
        try {
            await PostApi(EndpointRoute.contact, formData)
            ToastService.info("Le message a bien été envoyé")
        } catch (error) {
            
        }
    }



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
                ☎️ <strong>+33 4 00 00 00 00</strong>
            </p>

            <form className="contact-form">
                <div className="form-row">
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom *" required />
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom *" required />
                </div>
                <div className="form-row">
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="N° de Téléphone *" required />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email *" required />
                </div>
                <input type="text" onChange={e => setSubject(e.target.value)} placeholder="Objet de votre demande" />
                <textarea onChange={e => setMessage(e.target.value)} placeholder="Votre message" rows={5}></textarea>
                <button type="submit" onClick={handleSubmit}>Envoyer</button>
            </form>
        </div>
    );
}

export default Contact;
