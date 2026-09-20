import { signOut } from "firebase/auth";
import {
  Bell,
  BookOpen,
  CalendarCheck,
  ChevronDown,
  CircleHelp,
  FileBadge,
  FileText,
  PanelsTopLeft,
  LayoutDashboard,
  Library,
  LogOut,
  Settings,
  UserCog,
  UserRound,
  Users,
  Video,
  WalletCards,
  X,
} from "lucide-react";
import { auth } from "@/firebase";
import logo from "@/assets/knora-logo-transparent.png";

const navigation = [
  { icon: LayoutDashboard, label: "Dashboard" },
  {
    icon: Users,
    label: "Student Management",
    active: true,
    children: ["Course Registrations", "Student List", "Courses"],
  },
  { icon: UserRound, label: "Teacher Management" },
  {
    icon: PanelsTopLeft,
    label: "Website Settings",
    href: "/crm/superadmin/cms",
  },
  { icon: UserCog, label: "Staff Management", expandable: true },
  { icon: CalendarCheck, label: "Batch Management", expandable: true },
  { icon: Video, label: "Live Classes", expandable: true },
  { icon: CalendarCheck, label: "Attendance", expandable: true },
  { icon: WalletCards, label: "Fee Management", expandable: true },
  { icon: FileText, label: "Examination", expandable: true },
  { icon: BookOpen, label: "Assignments & Study Materials" },
  { icon: FileBadge, label: "Certificates", expandable: true },
  { icon: Library, label: "Library", expandable: true },
  { icon: Bell, label: "Notifications", expandable: true },
  { icon: FileText, label: "Reports", expandable: true },
  { icon: UserCog, label: "User & Role Management", expandable: true },
  { icon: Settings, label: "Settings", expandable: true },
];

export default function Sidebar({ open, onClose }) {
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <>
      <aside className={`crm-sidebar ${open ? "open" : ""}`}>
        <div className="crm-logo">
          <img src={logo} alt="Knora Academy" />
          <button type="button" onClick={onClose} aria-label="Close sidebar">
            <X />
          </button>
        </div>

        <nav className="crm-sidebar-nav" aria-label="SuperAdmin navigation">
          {navigation.map(
            ({ icon: Icon, label, active, expandable, children, href }) => (
              <div className="crm-nav-group" key={label}>
                <button
                  className={`crm-nav-item ${href && window.location.pathname.startsWith(href) ? "active" : active ? "active" : ""}`}
                  onClick={() => href && (window.location.href = href)}
                >
                  <Icon />
                  <span>{label}</span>
                  {(active || expandable) && (
                    <ChevronDown className="chevron" />
                  )}
                </button>
                {children && (
                  <div className="crm-subnav">
                    {children.map((child, index) => (
                      <button
                        className={index === 0 ? "selected" : ""}
                        key={child}
                      >
                        {child}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ),
          )}
        </nav>

        <div className="crm-sidebar-bottom">
          <button className="crm-nav-item">
            <CircleHelp />
            <span>Help & Support</span>
          </button>
          <button className="crm-nav-item" onClick={logout}>
            <LogOut />
            <span>Logout</span>
          </button>
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
