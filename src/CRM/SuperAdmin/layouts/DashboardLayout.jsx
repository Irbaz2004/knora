import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../../crm.css";

export default function DashboardLayout({
  profile,
  title,
  description,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="crm-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <section className="crm-main">
        <Header
          profile={profile}
          title={title}
          description={description}
          onMenuOpen={() => setSidebarOpen(true)}
        />
        <div className="crm-page-content">{children}</div>
        <footer className="crm-footer">
          © 2026 Knora Academy. All rights reserved.
        </footer>
      </section>
    </main>
  );
}
