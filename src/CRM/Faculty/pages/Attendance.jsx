import {
  CalendarDays,
  ChartNoAxesColumn,
  CircleUserRound,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FacultyLayout from "../layouts/FacultyLayout";

const records = [
  ["24 May 2025", "Sat", "Data Structures", "BCA 2A", "Present"],
  ["22 May 2025", "Thu", "Database Management Systems", "BCA 2A", "Present"],
  ["20 May 2025", "Tue", "Data Structures", "BCA 2A", "Present"],
  ["17 May 2025", "Sat", "Python Programming", "BCA 1A", "Absent"],
  ["15 May 2025", "Thu", "Database Management Systems", "BCA 2A", "Present"],
  ["13 May 2025", "Tue", "Data Structures", "BCA 2A", "Present"],
  ["10 May 2025", "Sat", "Python Programming", "BCA 1A", "Present"],
];
const days = Array.from({ length: 35 }, (_, i) => (i < 4 ? 27 + i : i - 3));

export default function FacultyAttendance({ profile, mode = "mine" }) {
  const navigate = useNavigate();
  const title =
    mode === "students"
      ? "Student Attendance"
      : mode === "reports"
        ? "Attendance Reports"
        : "Attendance";
  return (
    <FacultyLayout
      title={title}
      description="Manage and view attendance records."
      profile={profile}
    >
      <div className="faculty-tabs">
        <button
          className={mode === "mine" ? "active" : ""}
          onClick={() => navigate("/crm/faculty/attendance")}
        >
          <CircleUserRound />
          My Attendance
        </button>
        <button
          className={mode === "students" ? "active" : ""}
          onClick={() => navigate("/crm/faculty/attendance/students")}
        >
          <GraduationCap />
          Student Attendance
        </button>
        <button
          className={mode === "reports" ? "active" : ""}
          onClick={() => navigate("/crm/faculty/attendance/reports")}
        >
          <ChartNoAxesColumn />
          Attendance Reports
        </button>
      </div>
      {mode === "students" && (
        <section className="faculty-filter-bar faculty-card">
          <label>
            <span>Select Batch</span>
            <select>
              <option>BCA 2A</option>
            </select>
          </label>
          <label>
            <span>Select Subject</span>
            <select>
              <option>Data Structures</option>
            </select>
          </label>
          <label>
            <span>Date</span>
            <input type="date" defaultValue="2025-05-24" />
          </label>
          <button className="faculty-primary-button">Load Students</button>
        </section>
      )}
      <section className="faculty-attendance-overview">
        <article className="faculty-card">
          <h2>
            {mode === "mine" ? "My Overall Attendance" : "Class Attendance"}
          </h2>
          <div className="attendance-ring-wrap">
            <div className="attendance-ring">
              <span>
                <strong>92%</strong>
                <small>Present</small>
              </span>
            </div>
            <ul>
              <li>
                <i className="green" />
                Present Days <strong>44</strong>
              </li>
              <li>
                <i className="red" />
                Absent Days <strong>4</strong>
              </li>
              <li>
                <i className="yellow" />
                Total Days <strong>48</strong>
              </li>
            </ul>
          </div>
        </article>
        <article className="faculty-card">
          <div className="faculty-card-head">
            <h2>Attendance Summary (This Month)</h2>
            <button className="faculty-outline-button">
              May 2025 <CalendarDays />
            </button>
          </div>
          <div className="attendance-summary-grid">
            <div>
              <CalendarDays />
              <span>
                Classes Held<strong>12</strong>
              </span>
            </div>
            <div>
              <CalendarDays />
              <span>
                Present<strong>11</strong>
              </span>
            </div>
            <div className="red">
              <CalendarDays />
              <span>
                Absent<strong>1</strong>
              </span>
            </div>
            <div className="blue">
              <GraduationCap />
              <span>
                Attendance %<strong>91.67%</strong>
              </span>
            </div>
          </div>
        </article>
      </section>
      <section className="faculty-attendance-bottom">
        <article className="faculty-card faculty-table-card">
          <div className="faculty-card-head">
            <h2>Attendance Details</h2>
          </div>
          <div className="faculty-table-wrap">
            <table className="faculty-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r[0]}>
                    {r.slice(0, 4).map((v) => (
                      <td key={v}>{v}</td>
                    ))}
                    <td>
                      <span
                        className={`faculty-status ${r[4] === "Present" ? "success" : "danger"}`}
                      >
                        {r[4]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="faculty-text-link">View All Records →</button>
        </article>
        <article className="faculty-card faculty-calendar">
          <h2>Attendance Calendar</h2>
          <div className="calendar-head">
            <button>‹</button>
            <strong>May 2025</strong>
            <CalendarDays />
          </div>
          <div className="calendar-week">
            <b>Sun</b>
            <b>Mon</b>
            <b>Tue</b>
            <b>Wed</b>
            <b>Thu</b>
            <b>Fri</b>
            <b>Sat</b>
            {days.map((d, i) => (
              <span
                className={
                  [9, 11, 13, 16, 18, 20, 24].includes(d)
                    ? "present"
                    : d === 17
                      ? "absent"
                      : d === 24
                        ? "today"
                        : ""
                }
                key={i}
              >
                {d > 31 ? d - 31 : d}
              </span>
            ))}
          </div>
          <div className="calendar-legend">
            <span>
              <i className="green" />
              Present
            </span>
            <span>
              <i className="red" />
              Absent
            </span>
            <span>
              <i />
              No Class
            </span>
          </div>
        </article>
      </section>
      <div className="faculty-info-banner">
        <CircleUserRound />
        <span>
          <strong>Note:</strong> Attendance is calculated based on classes you
          are assigned to.
        </span>
      </div>
    </FacultyLayout>
  );
}
