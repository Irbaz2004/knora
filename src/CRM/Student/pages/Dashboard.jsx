import { useNavigate } from "react-router-dom";
import {
  BellRing,
  CalendarDays,
  FileText,
  IndianRupee,
  Pin,
  Video,
} from "lucide-react";
import StudentLayout from "../layouts/StudentLayout";

const exams = [
  ["Data Structures", "20 May 2025"],
  ["Database Management Systems", "28 May 2025"],
  ["Operating Systems", "05 Jun 2025"],
  ["Computer Networks", "12 Jun 2025"],
];
const notices = [
  [
    "University holiday on 16th May on account of Annual Day celebration.",
    "12 May 2025",
  ],
  [
    "Internal assessment marks are published. Check your performance now.",
    "10 May 2025",
  ],
  ["New webinar on ‘AI & Future of Tech’ on 18th May at 4 PM.", "08 May 2025"],
  [
    "Last date to submit projects for 2nd year students is 30th May.",
    "06 May 2025",
  ],
];
const assignments = [
  ["Data Structures – Linked List Implementation", "20 May 2025", "Pending"],
  ["Database Management – ER Diagram", "22 May 2025", "In Progress"],
  ["Operating Systems – Process Scheduling", "25 May 2025", "Pending"],
];

export default function StudentDashboard({ profile }) {
  const navigate = useNavigate();
  const name = profile?.fullName?.split(" ")[0] || "Irbaz";
  return (
    <StudentLayout
      title={`Good Morning, ${name}! 👋`}
      description="Stay consistent and keep learning every day."
      profile={profile}
    >
      <section className="student-hero-grid">
        <article className="student-card attendance-summary">
          <h2>Attendance</h2>
          <div>
            <div className="student-ring">
              <span>
                <strong>87%</strong>
                <small>Present</small>
              </span>
            </div>
            <ul>
              <li>
                <i />
                Present <strong>87%</strong>
              </li>
              <li>
                <i />
                Absent <strong>8%</strong>
              </li>
              <li>
                <i />
                Leaves <strong>5%</strong>
              </li>
            </ul>
          </div>
          <p>
            <Pin /> Keep it up! You’re doing great.
          </p>
        </article>
        <article className="student-card student-live-now">
          <header>
            <h2>Today’s Live Class</h2>
            <span>Live Now</span>
          </header>
          <h3>Data Structures & Algorithms</h3>
          <p>by Mr. Arjun Kumar</p>
          <p>
            <CalendarDays />
            10:00 AM - 11:00 AM
          </p>
          <div className="student-faces">
            <span>A</span>
            <span>N</span>
            <span>R</span>
            <em>+32</em>
          </div>
          <button onClick={() => navigate("/crm/student/live-classes")}>
            <Video />
            Join Class
          </button>
        </article>
        <article className="student-card student-fee-due">
          <h2>Fee Due</h2>
          <div>
            <span>
              <IndianRupee />
            </span>
            <strong>₹ 3,750</strong>
          </div>
          <p>
            Due Date: <em>25 May 2025</em>
          </p>
          <button onClick={() => navigate("/crm/student/fee")}>Pay Now</button>
        </article>
      </section>
      <section className="student-dashboard-grid">
        <article className="student-card student-list-card">
          <header>
            <h2>Upcoming Exams</h2>
            <button onClick={() => navigate("/crm/student/examinations")}>
              View All
            </button>
          </header>
          {exams.map((e) => (
            <div key={e[0]}>
              <FileText />
              <strong>{e[0]}</strong>
              <span>
                <CalendarDays />
                {e[1]}
              </span>
            </div>
          ))}
        </article>
        <article className="student-card student-list-card">
          <header>
            <h2>Notices & Announcements</h2>
            <button onClick={() => navigate("/crm/student/notices")}>
              View All
            </button>
          </header>
          {notices.map((n) => (
            <div key={n[0]}>
              <BellRing />
              <strong>
                {n[0]}
                <small>{n[1]}</small>
              </strong>
            </div>
          ))}
        </article>
        <article className="student-card student-list-card student-assignments">
          <header>
            <h2>Latest Assignments</h2>
            <button
              onClick={() => navigate("/crm/student/materials/assignments")}
            >
              View All
            </button>
          </header>
          {assignments.map((a) => (
            <div key={a[0]}>
              <FileText />
              <strong>
                {a[0]}
                <small>Due: {a[1]}</small>
              </strong>
              <em className={a[2] === "In Progress" ? "info" : "warning"}>
                {a[2]}
              </em>
              <button>View</button>
            </div>
          ))}
        </article>
        <article className="student-card student-quote">
          <span>“</span>
          <p>
            The beautiful thing about learning is that no one can take it away{" "}
            <strong>from you.</strong>
          </p>
          <div className="quote-art">🎓</div>
        </article>
      </section>
    </StudentLayout>
  );
}
