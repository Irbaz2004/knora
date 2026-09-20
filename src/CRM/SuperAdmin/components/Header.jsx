import { Bell, ChevronDown, Menu, Search } from "lucide-react";

export default function Header({ profile, title, description, onMenuOpen }) {
  return (
    <header className="crm-topbar">
      <div className="crm-heading">
        <button
          className="crm-menu"
          type="button"
          onClick={onMenuOpen}
          aria-label="Open sidebar"
        >
          <Menu />
        </button>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="crm-header-tools">
        <label className="crm-global-search">
          <Search />
          <input placeholder="Search anything..." aria-label="Search CRM" />
        </label>
        <button className="crm-notify" type="button" aria-label="Notifications">
          <Bell />
          <b>4</b>
        </button>
        <button className="crm-profile" type="button">
          <span className="profile-avatar">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="" />
            ) : (
              profile?.fullName?.[0] || "A"
            )}
          </span>
          <span>
            <strong>{profile?.fullName || "Admin"}</strong>
            <small>{profile?.role || "Super Admin"}</small>
          </span>
          <ChevronDown />
        </button>
      </div>
    </header>
  );
}
