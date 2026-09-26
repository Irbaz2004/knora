import { useState } from "react";
import StudentHeader from "../components/StudentHeader";
import StudentSidebar from "../components/StudentSidebar";

export default function StudentLayout({
  title,
  description,
  profile,
  children,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faculty-shell student-shell">
      <StudentSidebar
        open={open}
        onClose={() => setOpen(false)}
        profile={profile}
      />
      <main className="faculty-main">
        <StudentHeader
          title={title}
          description={description}
          profile={profile}
          onMenu={() => setOpen(true)}
        />
        <div className="faculty-page student-page">{children}</div>
        <footer className="faculty-footer">
          © 2026 Knora Edu Academy. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
