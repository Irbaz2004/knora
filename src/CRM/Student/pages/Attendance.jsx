import {
  CalendarDays,
  Clock3,
  Monitor,
  MoreVertical,
  Star,
} from "lucide-react";
import StudentLayout from "../layouts/StudentLayout";

const records = [
  [
    "31 May 2025",
    "Data Structures & Algorithms",
    "Graph Traversal Techniques",
    "Arjun Kumar",
    "10:00 AM - 11:00 AM",
    "Present",
    "10:01 AM",
  ],
  [
    "30 May 2025",
    "Database Management Systems",
    "SQL Joins",
    "Neha Sharma",
    "02:00 PM - 03:00 PM",
    "Present",
    "02:02 PM",
  ],
  [
    "29 May 2025",
    "Operating Systems",
    "Process Scheduling",
    "Rohit Verma",
    "10:00 AM - 11:00 AM",
    "Absent",
    "—",
  ],
  [
    "28 May 2025",
    "Python Programming",
    "File Handling in Python",
    "Arjun Kumar",
    "02:00 PM - 03:00 PM",
    "Present",
    "02:01 PM",
  ],
  [
    "27 May 2025",
    "Computer Networks",
    "TCP/IP Model",
    "Neha Sharma",
    "10:00 AM - 11:00 AM",
    "Present",
    "10:00 AM",
  ],
];
export default function StudentAttendance({ profile }) {
  return (
    <StudentLayout
      title="My Attendance"
      description="Dashboard  ›  Attendance"
      profile={profile}
    >
      <div className="student-date-filter">
        <CalendarDays />
        01 May 2025 - 31 May 2025⌄
      </div>
      <section className="student-attendance-stats">
        <article className="student-card">
          <h2>Overall Attendance</h2>
          <div className="attendance-summary">
            <div className="student-ring green">
              <span>
                <strong>86%</strong>
                <small>Present</small>
              </span>
            </div>
            <ul>
              <li>
                <i />
                Present <strong>86%</strong>
              </li>
              <li>
                <i />
                Absent <strong>10%</strong>
              </li>
              <li>
                <i />
                Leave <strong>4%</strong>
              </li>
            </ul>
          </div>
          <em>
            <Star />
            Great! Keep it up
          </em>
        </article>
        <article className="student-card metric">
          <h2>Classes Attended</h2>
          <div>
            <span>
              <Monitor />
            </span>
            <strong>
              43<small>out of 50</small>
            </strong>
          </div>
          <p>Total Live Classes</p>
        </article>
        <article className="student-card metric missed">
          <h2>Classes Missed</h2>
          <div>
            <span>
              <CalendarDays />
            </span>
            <strong>
              5<small>out of 50</small>
            </strong>
          </div>
          <p>Total Live Classes</p>
        </article>
        <article className="student-card metric ontime">
          <h2>On-time Join Rate</h2>
          <div>
            <span>
              <Clock3 />
            </span>
            <strong>
              92%<small>On-time</small>
            </strong>
          </div>
          <p>You join classes on time</p>
        </article>
      </section>
      <section className="student-chart-grid">
        <article className="student-card">
          <header>
            <h2>Attendance Trend</h2>
            <select>
              <option>Daily</option>
            </select>
          </header>
          <div className="trend-chart">
            <div className="chart-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
            <svg viewBox="0 0 700 180" preserveAspectRatio="none">
              <polyline
                points="10,120 100,85 190,55 280,110 370,40 460,70 550,55 680,80"
                fill="none"
                stroke="#0878ef"
                strokeWidth="3"
              />
            </svg>
            <div className="chart-labels">
              {[
                "01 May",
                "06 May",
                "11 May",
                "16 May",
                "21 May",
                "26 May",
                "31 May",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </article>
        <article className="student-card subject-chart">
          <h2>Attendance by Subject</h2>
          <div>
            <div className="multi-ring">
              <span>
                86%<small>Overall</small>
              </span>
            </div>
            <ul>
              {[
                ["Data Structures & Algorithms", "90%"],
                ["Database Management Systems", "85%"],
                ["Operating Systems", "82%"],
                ["Computer Networks", "87%"],
                ["Python Programming", "86%"],
              ].map((x) => (
                <li key={x[0]}>
                  {x[0]}
                  <strong>{x[1]}</strong>
                </li>
              ))}
            </ul>
          </div>
          <button className="faculty-outline-button">View Detailed ›</button>
        </article>
      </section>
      <section className="student-card faculty-table-card">
        <div className="faculty-card-head">
          <h2>Class Attendance Record</h2>
        </div>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Class</th>
                <th>Topic</th>
                <th>Instructor</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Joined At</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r[0]}>
                  {r.slice(0, 5).map((v) => (
                    <td key={v}>{v}</td>
                  ))}
                  <td>
                    <span
                      className={`faculty-status ${r[5] === "Present" ? "success" : "danger"}`}
                    >
                      {r[5]}
                    </span>
                  </td>
                  <td>{r[6]}</td>
                  <td>
                    <MoreVertical className="table-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="faculty-text-link">View All Attendance⌄</button>
      </section>
    </StudentLayout>
  );
}
