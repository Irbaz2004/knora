import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  CalendarCheck,
  CheckCircle2,
  Eye,
  Filter,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const statIcons = [Users, CheckCircle2, Activity, WalletCards, CalendarCheck];
const statusNames = new Set([
  "active",
  "inactive",
  "upcoming",
  "present",
  "absent",
  "late",
  "published",
  "completed",
  "pending",
  "pending review",
  "on leave",
  "in progress",
  "draft",
]);

export default function AdminSectionPage({ module, page, profile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const rows = useMemo(
    () =>
      page.rows.filter((row) =>
        row.join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [page.rows, query],
  );

  const submit = (event) => {
    event.preventDefault();
    setShowModal(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  return (
    <DashboardLayout
      profile={profile}
      title={module.title}
      description={module.description}
    >
      <section className="suite-stats">
        {module.stats.map((stat, index) => {
          const Icon = statIcons[index % statIcons.length];
          return (
            <article key={stat.label}>
              <span className={`suite-icon ${stat.tone}`}>
                <Icon />
              </span>
              <div>
                <small>{stat.label}</small>
                <strong>{stat.value}</strong>
                <em>{stat.meta}</em>
              </div>
            </article>
          );
        })}
      </section>

      <section className="crm-card suite-module">
        <div
          className="suite-tabs"
          role="navigation"
          aria-label={`${module.title} pages`}
        >
          {module.pages.map((item) => (
            <button
              className={location.pathname === item.path ? "active" : ""}
              key={item.path}
              onClick={() => navigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="suite-toolbar">
          <div>
            <h2>{page.title}</h2>
            <p>{page.description}</p>
          </div>
          <div>
            <label>
              <Search />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={page.searchPlaceholder ?? "Search records..."}
              />
            </label>
            <button className="suite-filter" type="button">
              <Filter /> Filters
            </button>
            <button
              className="crm-primary"
              onClick={() => setShowModal(true)}
              type="button"
            >
              <Plus /> {page.actionLabel ?? "Add New"}
            </button>
          </div>
        </div>

        <div className="suite-filter-row">
          {(page.filters ?? ["All Records", "All Status", "This Month"]).map(
            (filter) => (
              <button key={filter} type="button">
                {filter}
                <span>⌄</span>
              </button>
            ),
          )}
        </div>

        <div className="crm-table-wrap suite-table-wrap">
          <table className="crm-table suite-table">
            <thead>
              <tr>
                {page.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${row[0]}-${rowIndex}`}>
                  {row.map((cell, index) => {
                    const value = String(cell);
                    const status = statusNames.has(value.toLowerCase());
                    return (
                      <td key={`${value}-${index}`}>
                        {status ? (
                          <span
                            className={`crm-badge ${value
                              .toLowerCase()
                              .replaceAll(" ", "-")}`}
                          >
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                  <td>
                    <div className="crm-actions">
                      <button aria-label="View" type="button">
                        <Eye />
                      </button>
                      <button aria-label="Edit" type="button">
                        <Pencil />
                      </button>
                      <button aria-label="More" type="button">
                        <MoreVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="crm-table-footer">
          <span>
            Showing 1 to {rows.length} of{" "}
            {Math.max(rows.length, page.total ?? 24)} records
          </span>
          <div>
            <button type="button">‹</button>
            <button className="current" type="button">
              1
            </button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">›</button>
          </div>
        </div>
      </section>

      <section className="suite-bottom-grid">
        {(page.cards ?? ["Summary", "Recent Activity", "Reports"]).map(
          (title, index) => (
            <article className="crm-card" key={title}>
              <span
                className={`suite-icon ${["blue", "green", "purple", "orange"][index % 4]}`}
              >
                <Activity />
              </span>
              <div>
                <h3>{title}</h3>
                <p>View and manage detailed {title.toLowerCase()}.</p>
                <button type="button">View Details</button>
              </div>
            </article>
          ),
        )}
      </section>

      {saved && (
        <div className="suite-toast">
          <CheckCircle2 /> Changes saved successfully
        </div>
      )}
      {showModal && (
        <div
          className="crm-modal-backdrop"
          onMouseDown={() => setShowModal(false)}
        >
          <form
            className="crm-modal"
            onSubmit={submit}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div>
              <h2>{page.actionLabel ?? "Add New"}</h2>
              <button type="button" onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>
            <label>
              Name / Title
              <input required placeholder="Enter a name" />
            </label>
            <label>
              Description
              <input required placeholder="Enter details" />
            </label>
            <label>
              Status
              <select defaultValue="Active">
                <option>Active</option>
                <option>Pending</option>
                <option>Draft</option>
              </select>
            </label>
            <button className="crm-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}
