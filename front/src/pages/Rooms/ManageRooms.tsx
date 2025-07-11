import { useEffect, useState } from "react";
import type { Room } from "../../api/Room";
import { DeleteApi, GetApi, PutApi } from "../../api/Axios";
import { EndpointRoute } from "../../api/Endpoint";
import { useAuth } from "../../components/AuthContext";
import { UserRole } from "../../api/User";
import { FrontRoute } from "../../App";
import { useNavigate } from "react-router-dom";
import CreateRoom from "./CreateRoom";

export function MenuManageRoom() {

    const [refresh, setRefresh] = useState(0)

    return (
        <>
        <CreateRoom onCreated={() => setRefresh(r => r+1)} />
        <ListRoom refresh={refresh} />
        </>
    );
}

const TABS = [
  { key: "visible", label: "Salles visibles" },
  { key: "hidden", label: "Salles non visibles" },
];

function ListRoom({ refresh }: { refresh: number }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [localRefresh, setLocalRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState<"visible" | "hidden">("visible");
  const { me } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (me?.role !== UserRole.admin && me?.role !== UserRole.employee) {
      navigate(FrontRoute.Accueil);
      return;
    }
  }, [me, navigate]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await GetApi(EndpointRoute.adminRoom);
        setRooms(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh, localRefresh]);

  function handleViewDetails(room: Room) {
    navigate(`${FrontRoute.Rooms}/${room._id}`);
  }

  async function handleDeleteRoom(room: Room) {
    try {
      if (!confirm("Voulez-vous supprimer la salle ?")) {
        return;
      }
      await DeleteApi(`${EndpointRoute.adminRoom}/${room._id}`);
      setLocalRefresh((r) => r + 1);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleVisibleRoom(room: Room){
    try {
        if (!confirm("Voulez-vous rendre la salle visible au publique ?")) {
            return;
        }
        await PutApi(`${EndpointRoute.adminRoom}/${room._id}`, {visible: true});
        setLocalRefresh((r) => r + 1);
    } catch (error) {
        console.error(error)
    }
  }

  // Filtrer les salles selon l'onglet actif
  const filteredRooms = rooms.filter((room) =>
    activeTab === "visible" ? room.visible === true : room.visible === false
  );

  return (
    <div className="user-tabs-container">
      {/* Onglets */}
      <div className="user-tabs-bar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "visible" | "hidden")}
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
            <th>Description</th>
            <th>Prix (€)</th>
            <th>Durée (min)</th>
            <th>Max participants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="user-table-empty">
                Chargement...
              </td>
            </tr>
          ) : filteredRooms.length === 0 ? (
            <tr>
              <td colSpan={6} className="user-table-empty">
                Aucune salle trouvée.
              </td>
            </tr>
          ) : (
            filteredRooms.map((room) => (
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
                  {!room.visible && (
                    <button
                        className="user-details-btn"
                        onClick={() => handleVisibleRoom(room)}
                    >
                        Rendre la salle visible
                    </button>
                  )}
                  <button
                    className="user-details-btn"
                    onClick={() => handleDeleteRoom(room)}
                  >
                    {room.visible ? ("Déréférencer la salle") : "Supprimer la salle"}
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