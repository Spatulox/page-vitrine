import { useEffect, useState } from "react"
import type { User } from "../../api/User"
import { GetApi } from "../../api/Axios"
import { useNavigate } from "react-router-dom"

export default function AdminAccount(){
    const [users, setUsers] = useState<User[] | null>()
    const navigate = useNavigate()


    useEffect(() => {
        (async () => {
            const res = await GetApi("/admin/users")
            setUsers(res)
        })()
    },[])

    function handleViewDetails(user: User) {
        navigate(`/users/${user._id}`);
    }
    function handleCreateEmployeeAccount(){
        alert("Crée !")
    }

    return (<>
        
        <div>
            <table border={1} cellPadding={8} style={{ marginTop: 16 }}>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Détails</th>
                </tr>
                </thead>
                <tbody>
                {users && users.length === 0 ? (
                    <tr>
                    <td colSpan={3}>Aucun utilisateur trouvé.</td>
                    </tr>
                ) : (
                    users && users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.lastname}</td>
                        <td>
                        <button onClick={() => handleViewDetails(user)}>
                            Voir détails
                        </button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
        <button onClick={handleCreateEmployeeAccount}>Créer un compte employé</button>
        </>
    )
}