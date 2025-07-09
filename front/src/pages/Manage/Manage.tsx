import { useNavigate } from "react-router-dom"
import { UrlRoute } from "../../App"

export default function Manage(){
    const navigate = useNavigate()
    return <>
        <h1>Manage</h1>
        <button onClick={() => navigate(UrlRoute.Users)}>Gérer les utilisateurs</button>
        <button onClick={() => navigate(UrlRoute.Sessions)}>Gérer les sessions</button>
        <button onClick={() => navigate(UrlRoute.Rooms)}>Gérer les Salles</button>
    </>
}