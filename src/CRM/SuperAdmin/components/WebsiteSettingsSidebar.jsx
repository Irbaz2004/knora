import { ArrowLeft, ExternalLink, Globe2, X } from "lucide-react";
import logo from "@/assets/knora-logo-transparent.png";
import { CMS_PAGES } from "@/lib/cms";

export default function WebsiteSettingsSidebar({
  open,
  onClose,
  pageId,
  onPageChange,
}) {
  return (
    <>
      <aside
        className={`crm-sidebar cms-settings-sidebar ${open ? "open" : ""}`}
      >
        <div className="crm-logo">
          <img src={logo} alt="Knora Academy" />
          <button type="button" onClick={onClose} aria-label="Close sidebar">
            <X />
          </button>
        </div>

        <div className="cms-sidebar-heading">
          <span>
            <Globe2 />
          </span>
          <div>
            <strong>Website Settings</strong>
            <small>Manage public pages</small>
          </div>
        </div>

        <nav className="crm-sidebar-nav" aria-label="Website pages">
          <p className="cms-sidebar-label">Website pages</p>
          {CMS_PAGES.map((page) => (
            <button
              type="button"
              className={`crm-nav-item ${pageId === page.id ? "active" : ""}`}
              onClick={() => {
                onPageChange(page.id);
                onClose();
              }}
              key={page.id}
            >
              <span className="cms-page-initial">{page.label[0]}</span>
              <span>{page.label}</span>
              <small>{page.path}</small>
            </button>
          ))}
        </nav>

        <div className="crm-sidebar-bottom cms-sidebar-actions">
          <a className="crm-nav-item" href="/" target="_blank" rel="noreferrer">
            <ExternalLink />
            <span>View Website</span>
          </a>
          <a className="crm-nav-item cms-back-crm" href="/crm/superadmin">
            <ArrowLeft />
            <span>Back to CRM</span>
          </a>
        </div>
      </aside>
      <button
        className={`crm-backdrop ${open ? "show" : ""}`}
        type="button"
        onClick={onClose}
        aria-label="Close sidebar"
      />
    </>
  );
}
