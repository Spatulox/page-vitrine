import { useState, useEffect } from 'react';
import type { RoomSessions } from '../../api/Room';
import { UserRole } from '../../api/User';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { FrontRoute } from '../../App';
import { DeleteApi, GetApi } from '../../api/Axios';
import { EndpointRoute } from '../../api/Endpoint';
import type { DetailsReservation } from './SalleCalendarEmploye';
import SalleCalendarEmploye from './SalleCalendarEmploye';

export default function ManageSessions() {
  const [sessions, setRoomSessions] = useState<RoomSessions[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<DetailsReservation | null>(null);
  const [refresh, setRefresh] = useState(0)

  const navigate = useNavigate();
  const { me } = useAuth();

  useEffect(() => {
    if (me?.role !== UserRole.admin && me?.role !== UserRole.employee) {
      navigate(FrontRoute.Accueil);
      return;
    }
  }, [me]);

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const param = { date: selectedDate };
      const res = await GetApi(`${EndpointRoute.adminRoom}/sessions`, param);
      setRoomSessions(res);
    })();
  }, [selectedDate, refresh]);

  async function handleCancel() {
    if (!selectedReservation) return;
    try {
      if(!confirm("Voulez-vous annuler la réservation ?")){
        return
      }
      await DeleteApi(`${EndpointRoute.book}/${selectedReservation._id}`)
      setRefresh(r => r + 1)
    } catch (error) {
      console.error(error)
    }
    setShowModal(false);
  }

  const handleVoirDetails = (reservation: DetailsReservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  return (
    <div>
      <label>
        Choisir une date :{' '}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={new Date().toISOString().split('T')[0]}
        />
      </label>
      <SalleCalendarEmploye
        key={selectedDate}
        reservations={sessions}
        onCancel={handleCancel}
        date={selectedDate}
        onDetails={handleVoirDetails}
      />

      {showModal && selectedReservation && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Détails de la réservation</h2>
            <p><strong>Salle :</strong> {selectedReservation.room.name}</p>
            <p><strong>Nom :</strong> Mr/Mme {selectedReservation.user.lastname}</p>
            <p><strong>Participants :</strong> {selectedReservation.participants}</p>
            <p><strong>Début :</strong> {new Date(selectedReservation.start_time).toLocaleString()}</p>
            <p><strong>Durée :</strong> {selectedReservation.room.duration} minutes</p>
            <p><strong>Description :</strong> {selectedReservation.room.description || 'Aucune'}</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={handleCancel}>Annuler la réservation</button>
              <button className="modal-btn" onClick={handleCloseModal}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
