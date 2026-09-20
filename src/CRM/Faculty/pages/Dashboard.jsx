import { signOut } from "firebase/auth";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LogOut,
  Users,
} from "lucide-react";
import { auth } from "@/firebase";
import logo from "@/assets/knoralogo.png";
import "../../crm.css";

const classes = [
  ["Data Science — Batch A", "10:00 AM", "32 students", "Room 204"],
  ["Python Fundamentals", "12:30 PM", "28 students", "Lab 2"],
  ["Machine Learning", "03:00 PM", "24 students", "Online"],
];

export default function FacultyDashboard({ profile }) {
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <main className="role-portal">
      <aside className="role-sidebar">
        <img src={logo} alt="Knora Academy" />
        <p>FACULTY PORTAL</p>
        <nav>
          <button className="active">
            <GraduationCap /> Dashboard
          </button>
          <button>
            <Users /> My Students
          </button>
          <button>
            <CalendarDays /> Schedule
          </button>
          <button>
            <ClipboardCheck /> Attendance
          </button>
          <button>
            <BookOpen /> Study Materials
          </button>
          <button>
            <FileText /> Assessments
          </button>
        </nav>
        <button className="role-logout" onClick={logout}>
          <LogOut /> Logout
        </button>
      </aside>
      <section className="role-content">
        <header className="role-header">
          <div>
            <span>Faculty Dashboard</span>
            <h1>
              Welcome back, {profile?.fullName?.split(" ")[0] || "Faculty"}
            </h1>
            <p>Here is your teaching overview for today.</p>
          </div>
          <div className="role-user">
            <button>
              <Bell />
            </button>
            <span>{profile?.fullName?.[0] || "F"}</span>
            <div>
              <strong>{profile?.fullName || "Faculty"}</strong>
              <small>{profile?.role}</small>
            </div>
          </div>
        </header>
        <div className="role-stats">
          <article>
            <span>
              <Users />
            </span>
            <div>
              <small>Total Students</small>
              <strong>84</strong>
              <em>Across 3 batches</em>
            </div>
          </article>
          <article>
            <span>
              <BookOpen />
            </span>
            <div>
              <small>Active Courses</small>
              <strong>3</strong>
              <em>This semester</em>
            </div>
          </article>
          <article>
            <span>
              <Clock3 />
            </span>
            <div>
              <small>Classes Today</small>
              <strong>3</strong>
              <em>First at 10:00 AM</em>
            </div>
          </article>
          <article>
            <span>
              <CheckCircle2 />
            </span>
            <div>
              <small>Attendance</small>
              <strong>92%</strong>
              <em>Weekly average</em>
            </div>
          </article>
        </div>
        <section className="role-panel">
          <div className="role-panel-title">
            <div>
              <h2>Today’s Classes</h2>
              <p>Your scheduled sessions for today</p>
            </div>
            <button>View full schedule</button>
          </div>
          <div className="class-list">
            {classes.map(([name, time, count, room]) => (
              <article key={name}>
                <span className="class-time">{time}</span>
                <div>
                  <h3>{name}</h3>
                  <p>
                    {count} · {room}
                  </p>
                </div>
                <button>Open class</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
