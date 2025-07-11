import { Link } from "react-router-dom";

export default function NotFound(){
    return (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#1d1f20",//"linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
    color: "white",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
    padding: "2rem",
    height : "100%"
  }}>
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#860707"/>
      <text x="12" y="16" textAnchor="middle" fontSize="48" fill="#fff" fontWeight="bold">404</text>
    </svg>
    <h1 style={{ fontSize: "3rem", margin: "1rem 0 0.5rem" }}>Page non trouvée</h1>
    <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
      Oups ! L'élément que vous cherchez n’existe pas ou a été déplacée.
    </p>
    <Link
      to="/"
      style={{
        display: "inline-block",
        padding: "0.75rem 1.5rem",
        background: "#3b82f6",
        color: "#fff",
        borderRadius: "0.5rem",
        textDecoration: "none",
        fontWeight: "bold",
        boxShadow: "0 2px 8px rgba(59,130,246,0.15)",
        transition: "background 0.2s"
      }}
    >
      Retour à l’accueil
    </Link>
  </div>
);
}