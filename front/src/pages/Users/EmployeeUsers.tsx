import { useEffect, useState } from "react"
import type { User } from "../../api/User"
import { GetApi } from "../../api/Axios"
import { useNavigate } from "react-router-dom"
import { EndpointRoute } from "../../api/Endpoint";
import { FrontRoute } from "../../App";


const TABS = [
  { key: "client", label: "Clients" },
  { key: "employee", label: "Employés" },
  { key: "admin", label: "Admins" },
];

type UsersByRole = {
  client: User[];
  employee: User[];
  admin: User[];
};

export default function EmployeeUsers(){
    const [users, setUsers] = useState<UsersByRole | null>()
    const [activeTab, setActiveTab] = useState<keyof UsersByRole>("client");
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const res = await GetApi(EndpointRoute.adminUser, {employee: "1", admin: "1", client: "1"})
            console.log(res)
            setUsers(res)
        })()
    },[])

    function handleViewDetails(user: User) {
        navigate(`${FrontRoute.Users}/${user._id}`);
    }

    return (
    <div className="user-tabs-container">
      {/* Onglets */}
      <div className="user-tabs-bar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as keyof UsersByRole)}
            className={`user-tab-btn${activeTab === tab.key ? " selected" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {users && users[activeTab] && users[activeTab].length === 0 ? (
            <tr>
              <td colSpan={5} className="user-table-empty">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          ) : (
            users &&
            users[activeTab] &&
            users[activeTab].map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="user-details-btn" onClick={() => handleViewDetails(user)}>
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