import React from "react";
import type { Sessions } from "../../api/Sessions";

type Props = {
  sessions: Sessions[];
};

export const SessionsList: React.FC<Props> = ({ sessions }) => (
  <div className="sessions-container">
    <h1>Mes sessions</h1>
    <div className="sessions-list">
      {sessions.length === 0 ? (
        <p>Aucune session à venir.</p>
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
              <span>
                <strong>Réservé par :</strong> {session.user.name} {session.user.lastname}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
