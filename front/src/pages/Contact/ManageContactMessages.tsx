import { useEffect, useState } from "react"
import type { Contact } from "../../api/Contact"
import { GetApi, PostApi } from "../../api/Axios"
import { EndpointRoute } from "../../api/Endpoint"
import { ToastService } from "../../services/ToastService"
import Loading from "../../components/Loading"
import NotFound from "../../components/NotFound"

export default function ManageContactMessages(){
    const [messages, setMessage] = useState<Contact[] | null>(null)
    const [resfresh, setRefresh] = useState(0)


    useEffect(() => {
        (async () => {
            try {
                const res = await GetApi(EndpointRoute.contact)
                if(res){
                    setMessage(res)
                }
            } catch (error) {
                console.error(error)
            }
        })()
    }, [resfresh])

    async function handleAnswered(id: string){
        try {
            await PostApi(EndpointRoute.contact + `/${id}`)
            ToastService.info("Le message est marqué comme répondu et ne sera plus visible")
            setRefresh(r => r + 1)
        } catch (error) {
            console.error(error)
        }
    }

    if(messages == null){
        return <Loading />
    }

    if(messages && messages.length == 0){
        return <p>Rien à afficher</p>
    }

    return <>
    <div className="user-table fit-content max-width-90vw">
        <h1>Prise de contact</h1>
        <thead>
            <tr>
                <td>Prénom Nom</td>
                <td>Email</td>
                <td>Sujet</td>
                <td>Message</td>
                <td>Actions</td>
            </tr>
        </thead>
        <tbody>
        {messages && messages.map((mess) => (

            <tr>
                <td>{mess.name}, {mess.lastname}</td>
                <td> <a href={"mailto:" + mess.email}>{mess.email}</a></td>
                <td>{mess.subject}</td>
                <td>{mess.message}</td>
                <td><button onClick={() => handleAnswered(mess._id)}>Marquer comme répondu</button></td>
            </tr>

        ))}
        </tbody>
    
    </div>
    </>
}