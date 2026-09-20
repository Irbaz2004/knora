import { useState } from "react";
import Header from "../components/Header";
import WebsiteSettingsSidebar from "../components/WebsiteSettingsSidebar";
import "../../crm.css";

export default function WebsiteSettingsLayout({
  profile,
  pageId,
  onPageChange,
  title,
  description,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="crm-shell cms-settings-shell">
      <WebsiteSettingsSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pageId={pageId}
        onPageChange={onPageChange}
      />
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
