import { Bell, ChevronDown, Menu } from "lucide-react";

export default function StudentHeader({ title, description, profile, onMenu }) {
  const name = profile?.fullName || "Irbaz Ahmed";
  return (
    <header className="faculty-header student-header">
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
          <span>3</span>
        </button>
        <div className="faculty-user-card">
          {profile?.photoURL ? (
            <img src={profile.photoURL} alt="" />
          ) : (
            <span className="faculty-avatar">{name.charAt(0)}</span>
          )}
          <div>
            <strong>{name}</strong>
            <small>Student</small>
          </div>
          <ChevronDown />
        </div>
      </div>
    </header>
  );
}
