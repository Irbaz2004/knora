import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpenCheck,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  CircleUserRound,
  ClipboardPenLine,
  LayoutDashboard,
  LogOut,
  PanelsTopLeft,
  Users,
  Video,
  X,
} from "lucide-react";
import { auth } from "@/firebase";
import logo from "@/assets/knora-logo-transparent.png";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/crm/faculty" },
  { label: "My Profile", icon: CircleUserRound, to: "/crm/faculty/profile" },
  {
    label: "My Batches",
    icon: PanelsTopLeft,
    to: "/crm/faculty/batches",
    children: [
      { label: "Student List", to: "/crm/faculty/students" },
      { label: "Batch Details", to: "/crm/faculty/batches" },
    ],
  },
  {
    label: "Live Classes",
    icon: Video,
    to: "/crm/faculty/live-classes",
    children: [
      { label: "Schedule / Start Class", to: "/crm/faculty/live-classes" },
      { label: "My Recordings", to: "/crm/faculty/live-classes/recordings" },
    ],
  },
  {
    label: "Attendance",
    icon: CalendarCheck,
    to: "/crm/faculty/attendance",
    children: [
      { label: "My Attendance", to: "/crm/faculty/attendance" },
      { label: "Student Attendance", to: "/crm/faculty/attendance/students" },
      { label: "Attendance Reports", to: "/crm/faculty/attendance/reports" },
    ],
  },
  {
    label: "Assignments & Study Materials",
    icon: BookOpenCheck,
    to: "/crm/faculty/materials",
    children: [
      { label: "My Assignments", to: "/crm/faculty/materials/assignments" },
      { label: "Study Materials", to: "/crm/faculty/materials" },
      { label: "Question Bank", to: "/crm/faculty/materials/question-bank" },
    ],
  },
  { label: "Marks Entry", icon: ClipboardPenLine, to: "/crm/faculty/marks" },
  { label: "Timetable", icon: CalendarDays, to: "/crm/faculty/timetable" },
  { label: "Students", icon: Users, to: "/crm/faculty/students" },
  { label: "Notices", icon: Bell, to: "/crm/faculty/notices" },
];

function isActive(pathname, item) {
  if (item.to === "/crm/faculty") return pathname === item.to;
  return (
    pathname === item.to ||
    item.children?.some((child) => pathname === child.to)
  );
}

export default function FacultySidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(() => {
    const current = navigation.find((item) =>
      isActive(location.pathname, item),
    );
    return current?.children ? current.label : "";
  });

  useEffect(() => {
    const current = navigation.find((item) =>
      isActive(location.pathname, item),
    );
    if (current?.children) setExpanded(current.label);
  }, [location.pathname]);

  const go = (to) => {
    navigate(to);
    onClose?.();
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <>
      {open && (
        <button
          className="faculty-overlay"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}
      <aside className={`faculty-sidebar ${open ? "is-open" : ""}`}>
        <div className="faculty-brand">
          <img src={logo} alt="Knora Academy" />
          <button onClick={onClose} aria-label="Close navigation">
            <X />
          </button>
        </div>
        <nav className="faculty-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(location.pathname, item);
            const isExpanded = expanded === item.label;
            return (
              <div className="faculty-nav-group" key={item.label}>
                <button
                  className={active ? "active" : ""}
                  onClick={() => {
                    if (item.children)
                      setExpanded(isExpanded ? "" : item.label);
                    go(item.to);
                  }}
                >
                  <Icon />
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown className={isExpanded ? "rotate" : ""} />
                  )}
                </button>
                {item.children && isExpanded && (
                  <div className="faculty-subnav">
                    {item.children.map((child) => (
                      <button
                        key={child.to}
                        className={
                          location.pathname === child.to ? "active" : ""
                        }
                        onClick={() => go(child.to)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="faculty-sidebar-footer">
          <button>
            <CircleHelp />
            <span>Help & Support</span>
          </button>
          <button onClick={logout}>
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
