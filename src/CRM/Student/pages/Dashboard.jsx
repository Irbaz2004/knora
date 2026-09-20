import { signOut } from "firebase/auth";
import {
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  PlayCircle,
} from "lucide-react";
import { auth } from "@/firebase";
import logo from "@/assets/knoralogo.png";
import "../../crm.css";

const courses = [
  ["AI Engineering", "12 of 18 lessons", 68],
  ["Python Fundamentals", "16 of 20 lessons", 80],
  ["Data Visualization", "7 of 14 lessons", 50],
];

export default function StudentDashboard({ profile }) {
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <main className="role-portal student-portal">
      <aside className="role-sidebar">
        <img src={logo} alt="Knora Academy" />
        <p>STUDENT PORTAL</p>
        <nav>
          <button className="active">
            <LayoutDashboard /> Dashboard
          </button>
          <button>
            <BookOpen /> My Courses
          </button>
          <button>
            <PlayCircle /> Live Classes
          </button>
          <button>
            <CalendarDays /> Attendance
          </button>
          <button>
            <Award /> Certificates
          </button>
        </nav>
        <button className="role-logout" onClick={logout}>
          <LogOut /> Logout
        </button>
      </aside>
      <section className="role-content">
        <header className="role-header">
          <div>
            <span>Student Dashboard</span>
            <h1>Hello, {profile?.fullName?.split(" ")[0] || "Student"}!</h1>
            <p>Continue learning and keep your progress moving.</p>
          </div>
          <div className="role-user">
            <button>
              <Bell />
            </button>
            <span>{profile?.fullName?.[0] || "S"}</span>
            <div>
              <strong>{profile?.fullName || "Student"}</strong>
              <small>{profile?.role}</small>
            </div>
          </div>
        </header>
        <div className="role-stats">
          <article>
            <span>
              <BookOpen />
            </span>
            <div>
              <small>Enrolled Courses</small>
              <strong>3</strong>
              <em>2 in progress</em>
            </div>
          </article>
          <article>
            <span>
              <CheckCircle2 />
            </span>
            <div>
              <small>Attendance</small>
              <strong>94%</strong>
              <em>Excellent record</em>
            </div>
          </article>
          <article>
            <span>
              <Clock3 />
            </span>
            <div>
              <small>Learning Time</small>
              <strong>36h</strong>
              <em>This month</em>
            </div>
          </article>
          <article>
            <span>
              <Award />
            </span>
            <div>
              <small>Certificates</small>
              <strong>2</strong>
              <em>View achievements</em>
            </div>
          </article>
        </div>
        <section className="role-panel">
          <div className="role-panel-title">
            <div>
              <h2>My Courses</h2>
              <p>Pick up where you left off</p>
            </div>
            <button>Browse courses</button>
          </div>
          <div className="course-grid">
            {courses.map(([name, lessons, progress]) => (
              <article key={name}>
                <div className="course-icon">
                  <GraduationCap />
                </div>
                <h3>{name}</h3>
                <p>{lessons}</p>
                <div className="progress">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <footer>
                  <small>{progress}% complete</small>
                  <button>
                    <PlayCircle /> Continue
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
