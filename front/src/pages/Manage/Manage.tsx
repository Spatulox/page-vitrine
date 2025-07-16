import { useNavigate } from "react-router-dom"
import { FrontRoute } from "../../App"
import { useAuth } from "../../components/AuthContext"
import { UserRole } from "../../api/User"
import { useEffect } from "react"

export default function Manage(){
    const navigate = useNavigate()
    const {me} = useAuth()


    useEffect(() => {
        if(me?.role == UserRole.client){
            navigate(FrontRoute.Accueil)
            return
        }
    }, [me])

    return <>
        <h1>Manage</h1>
        <button onClick={() => navigate(FrontRoute.Users)}>Gérer les utilisateurs</button>
        <button onClick={() => navigate(FrontRoute.ManageSessions)}>Gérer les sessions</button>
        <button onClick={() => navigate(FrontRoute.ManageRooms)}>Gérer les Salles</button>
        <button onClick={() => navigate(FrontRoute.ManageMessages)}>Gérer les Messages</button>
    </>
}