import { useState } from "react";
import FacultyHeader from "../components/FacultyHeader";
import FacultySidebar from "../components/FacultySidebar";

export default function FacultyLayout({
  title,
  description,
  profile,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="faculty-shell">
      <FacultySidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="faculty-main">
        <FacultyHeader
          title={title}
          description={description}
          profile={profile}
          onMenu={() => setMenuOpen(true)}
        />
        <div className="faculty-page">{children}</div>
        <footer className="faculty-footer">
          © 2026 Knora Academy. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
