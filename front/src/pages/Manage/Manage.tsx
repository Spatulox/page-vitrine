import { useNavigate } from "react-router-dom"
import { FrontRoute } from "../../App"

export default function Manage(){
    const navigate = useNavigate()
    return <>
        <h1>Manage</h1>
        <button onClick={() => navigate(FrontRoute.Users)}>Gérer les utilisateurs</button>
        <button onClick={() => navigate(FrontRoute.ManageSessions)}>Gérer les sessions</button>
        <button onClick={() => navigate(FrontRoute.Rooms)}>Gérer les Salles</button>
    </>
}