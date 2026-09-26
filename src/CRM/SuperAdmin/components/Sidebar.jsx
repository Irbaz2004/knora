import { useState } from "react";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  CalendarCheck,
  ChevronDown,
  CircleHelp,
  FileBadge,
  FileText,
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
import {
  assignmentModule,
  attendanceModule,
  courseModule,
  examinationModule,
  feeModule,
  liveClassModule,
  reportModule,
  studentModule,
  teacherModule,
  timetableModule,
  userModule,
} from "../data/adminModules";

const base = "/crm/superadmin";

const navigation = [
  { icon: LayoutDashboard, label: "Dashboard", href: base, exact: true },
  {
    icon: Users,
    label: "Student Management",
    href: `${base}/students`,
    children: studentModule.pages,
  },
  {
    icon: UserRound,
    label: "Teacher & Staff Management",
    href: `${base}/teachers`,
    children: teacherModule.pages,
  },
  {
    icon: BookOpen,
    label: "Course & Batch Management",
    href: `${base}/courses`,
    children: courseModule.pages,
  },
  {
    icon: Video,
    label: "Live / Online Class Management",
    href: `${base}/live-classes`,
    children: liveClassModule.pages,
  },
  {
    icon: CalendarCheck,
    label: "Attendance Management",
    href: `${base}/attendance`,
    children: attendanceModule.pages,
  },
  {
    icon: FileText,
    label: "Examination",
    href: `${base}/examinations`,
    children: examinationModule.pages,
  },
  {
    icon: BookOpen,
    label: "Assignments & Study Materials",
    href: `${base}/assignments`,
    children: assignmentModule.pages,
  },
  {
    icon: WalletCards,
    label: "Fee Management",
    href: `${base}/fees`,
    children: feeModule.pages,
  },
  {
    icon: CalendarCheck,
    label: "Timetable Management",
    href: `${base}/timetable`,
    children: timetableModule.pages,
  },
  {
    icon: FileText,
    label: "Reports",
    href: `${base}/reports`,
    children: reportModule.pages,
  },
  {
    icon: UserCog,
    label: "User & Role Management",
    href: `${base}/users`,
    children: userModule.pages,
  },
  { icon: FileBadge, label: "Certificates" },
  { icon: Library, label: "Library" },
  { icon: Bell, label: "Notifications" },
  {
    icon: Settings,
    label: "Settings",
    href: `${base}/cms`,
    children: [{ label: "Website Content", path: `${base}/cms` }],
  },
];

const isActive = (item, pathname) =>
  item.href &&
  (item.exact
    ? pathname === item.href || pathname === `${item.href}/`
    : pathname.startsWith(item.href));

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeItem = navigation.find((item) => isActive(item, pathname));
  const [expanded, setExpanded] = useState(activeItem?.label ?? "");

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  const openItem = (item) => {
    if (item.children) setExpanded(item.label);
    if (item.href) {
      onClose();
      navigate(item.href);
    }
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
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item, pathname);
            const showChildren = Boolean(
              item.children && (active || expanded === item.label),
            );

            return (
              <div className="crm-nav-group" key={item.label}>
                <button
                  className={`crm-nav-item ${active ? "active" : ""}`}
                  onClick={() => openItem(item)}
                  type="button"
                >
                  <Icon />
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      className={`chevron ${showChildren ? "open" : ""}`}
                    />
                  )}
                </button>
                {showChildren && (
                  <div className="crm-subnav">
                    {item.children.map((child) => (
                      <button
                        className={pathname === child.path ? "selected" : ""}
                        key={child.path}
                        onClick={() => {
                          onClose();
                          navigate(child.path);
                        }}
                        type="button"
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

        <div className="crm-sidebar-bottom">
          <button className="crm-nav-item" type="button">
            <CircleHelp />
            <span>Help & Support</span>
          </button>
          <button className="crm-nav-item" onClick={logout} type="button">
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
