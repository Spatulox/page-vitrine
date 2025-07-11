import type { Sessions } from "../../api/Sessions";

type Props = {
  sessions: Sessions[];
  onCancel?: (session: Sessions) => void;
};

export function SessionsList({ sessions, onCancel }: Props) {
  return (
    <div className="sessions-container">
      <div className="sessions-list">
        {sessions.length === 0 ? (
          <p>Aucune session</p>
        ) : (
          sessions.map((session) => (
            <div className="session-card" key={session._id}>
              <div className="session-room">{session.room.name}</div>
              <div className="session-info">
                <span>
                  <strong>Date :</strong>{" "}
                  {new Date(session.start_time).toLocaleString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span>
                  <strong>Participants :</strong> {session.participants}
                </span>
              </div>
              <div>
                <button onClick={() => onCancel?.(session)}>
                  Annuler
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

//<strong>Réservé par :</strong> {session.user.name} {session.user.lastname}
