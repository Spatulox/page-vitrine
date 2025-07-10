import { useEffect, useState } from "react"
import type { Room } from "../../api/Room"
import { GetApi } from "../../api/Axios"
import { EndpointRoute } from "../../api/Endpoint"
import { useAuth } from "../../components/AuthContext"
import { UserRole } from "../../api/User"
import { FrontRoute } from "../../App"
import { useNavigate } from "react-router-dom"

export function MenuManageRoom(){
    return <>
        <button>Ajouter une salle</button>
        <ListRoom/>
    </>
}



function ListRoom() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const {me} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(me?.role != UserRole.admin && me?.role != UserRole.employee){
            navigate(FrontRoute.Accueil)
            return
        }
    }, [me])

    useEffect(() => {
        (async () => {
        try {
            const res = await GetApi(EndpointRoute.adminRoom);
            setRooms(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    const handleViewDetails = (room: Room) => {
        alert(`Détails de la salle : ${room.name}`);
    };

    return (
        <div className="user-tabs-container">
        <div className="user-tabs-bar">
            <span className="user-tab-btn selected">Toutes les salles</span>
        </div>

        <table className="user-table">
            <thead>
            <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix (€)</th>
                <th>Durée (min)</th>
                <th>Max participants</th>
                <th>Détails</th>
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                <td colSpan={6} className="user-table-empty">
                    Chargement...
                </td>
                </tr>
            ) : rooms.length === 0 ? (
                <tr>
                <td colSpan={6} className="user-table-empty">
                    Aucune salle trouvée.
                </td>
                </tr>
            ) : (
                rooms.map((room) => (
                <tr key={room._id}>
                    <td>{room.name}</td>
                    <td>{room.description}</td>
                    <td>{room.price}</td>
                    <td>{room.duration}</td>
                    <td>{room.max_participants}</td>
                    <td>
                    <button
                        className="user-details-btn"
                        onClick={() => handleViewDetails(room)}
                    >
                        Voir détails
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
}