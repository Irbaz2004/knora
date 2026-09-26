import { Bell, Menu, ChevronDown } from "lucide-react";

export default function FacultyHeader({ title, description, profile, onMenu }) {
  const name = profile?.fullName || "Dr. Ahmed";
  const photo = profile?.photoURL;

  return (
    <header className="faculty-header">
      <button
        className="faculty-menu-button"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu />
      </button>
      <div className="faculty-heading">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="faculty-header-actions">
        <button className="faculty-notification" aria-label="Notifications">
          <Bell />
          <span>4</span>
        </button>
        <div className="faculty-user-card">
          {photo ? (
            <img src={photo} alt="" />
          ) : (
            <span className="faculty-avatar">{name.charAt(0)}</span>
          )}
          <div>
            <strong>{name}</strong>
            <small>Teacher</small>
          </div>
          <ChevronDown />
        </div>
      </div>
    </header>
  );
}
