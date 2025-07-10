import { useEffect, useState } from "react"
import type { User } from "../../api/User"
import { GetApi } from "../../api/Axios"
import { useNavigate } from "react-router-dom"
import { EndpointRoute } from "../../api/Endpoint";


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
        navigate(`/users/${user._id}`);
    }

    return (
    <div>
      {/* Onglets */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as keyof UsersByRole)}
            style={{
              padding: "8px 16px",
              fontWeight: activeTab === tab.key ? "bold" : "normal",
              background: activeTab === tab.key ? "#D94711" : "#D94711A8",
              border: "1px solid #ccc",
              borderBottom: activeTab === tab.key ? "2px solid #007bff" : "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <table border={1} cellPadding={8} style={{ marginTop: 16, width: "100%" }}>
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
              <td colSpan={5}>Aucun utilisateur trouvé.</td>
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
  );
}