import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Award,
  Bell,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  CircleUserRound,
  ClipboardList,
  LayoutDashboard,
  Library,
  LogOut,
  TicketCheck,
  Video,
  X,
} from "lucide-react";
import { auth } from "@/firebase";
import logo from "@/assets/knora-logo-transparent.png";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/crm/student" },
  { label: "My Profile", icon: CircleUserRound, to: "/crm/student/profile" },
  {
    label: "Live Classes",
    icon: Video,
    to: "/crm/student/live-classes",
    children: [
      { label: "Join Class", to: "/crm/student/live-classes" },
      { label: "Recorded Videos", to: "/crm/student/live-classes/recordings" },
    ],
  },
  { label: "Attendance", icon: CalendarCheck, to: "/crm/student/attendance" },
  { label: "Timetable", icon: CalendarDays, to: "/crm/student/timetable" },
  {
    label: "Assignments & Study Materials",
    icon: ClipboardList,
    to: "/crm/student/materials",
    children: [
      { label: "Study Materials", to: "/crm/student/materials" },
      { label: "My Assignments", to: "/crm/student/materials/assignments" },
    ],
  },
  {
    label: "Exams & Results",
    icon: BookOpen,
    to: "/crm/student/examinations",
    children: [
      { label: "Exam Schedule", to: "/crm/student/examinations" },
      { label: "Report Card", to: "/crm/student/examinations/report-card" },
    ],
  },
  {
    label: "Fee",
    icon: TicketCheck,
    to: "/crm/student/fee",
    children: [
      { label: "Pay Fee", to: "/crm/student/fee" },
      { label: "Payment History", to: "/crm/student/fee/history" },
      { label: "Receipts", to: "/crm/student/fee/receipts" },
    ],
  },
  {
    label: "Certificates",
    icon: Award,
    to: "/crm/student/certificates",
    children: [
      { label: "Request Certificate", to: "/crm/student/certificates" },
      { label: "My Requests", to: "/crm/student/certificates/requests" },
    ],
  },
  {
    label: "Library (optional)",
    icon: Library,
    to: "/crm/student/library",
    children: [{ label: "My Issued Books", to: "/crm/student/library" }],
  },
  { label: "Notices", icon: Bell, to: "/crm/student/notices" },
];

const activeFor = (path, item) =>
  item.to === "/crm/student"
    ? path === item.to
    : path === item.to || item.children?.some((c) => path === c.to);

export default function StudentSidebar({ open, onClose, profile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState("");
  useEffect(() => {
    const current = items.find((item) => activeFor(location.pathname, item));
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
      <aside
        className={`faculty-sidebar student-sidebar ${open ? "is-open" : ""}`}
      >
        <div className="faculty-brand">
          <img src={logo} alt="Knora Academy" />
          <button onClick={onClose} aria-label="Close navigation">
            <X />
          </button>
        </div>
        <nav className="faculty-nav">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activeFor(location.pathname, item);
            const isOpen = expanded === item.label;
            return (
              <div className="faculty-nav-group" key={item.label}>
                <button
                  className={active ? "active" : ""}
                  onClick={() => {
                    if (item.children) setExpanded(isOpen ? "" : item.label);
                    go(item.to);
                  }}
                >
                  <Icon />
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown className={isOpen ? "rotate" : ""} />
                  )}
                </button>
                {item.children && isOpen && (
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
        <div className="student-support">
          <CircleHelp />
          <div>
            <strong>Need Help?</strong>
            <span>Our support team is here to assist you</span>
            <button>Contact Support</button>
          </div>
        </div>
        <div className="student-mini-profile">
          <span>{(profile?.fullName || "Irbaz Ahmed").charAt(0)}</span>
          <div>
            <strong>{profile?.fullName || "Irbaz Ahmed"}</strong>
            <small>B.Tech CSE - 2nd Year</small>
            <small>Reg. No: KN12345</small>
          </div>
        </div>
        <button className="student-logout" onClick={logout}>
          <LogOut /> Logout
        </button>
      </aside>
    </>
  );
}
