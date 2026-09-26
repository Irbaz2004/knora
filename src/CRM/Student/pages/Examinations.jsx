import { CalendarDays, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";

const exams = [
  [
    "Data Structures Mid Term",
    "Data Structures & Algorithms",
    "30 May 2025",
    "10:00 AM – 12:00 PM",
    "2 hrs",
    "100",
  ],
  [
    "Database Management Quiz",
    "Database Management Systems",
    "02 Jun 2025",
    "03:00 PM – 04:00 PM",
    "1 hr",
    "50",
  ],
  [
    "Python Programming Test",
    "Python Programming",
    "05 Jun 2025",
    "10:00 AM – 12:00 PM",
    "2 hrs",
    "100",
  ],
  [
    "Operating Systems Mid Term",
    "Operating Systems",
    "09 Jun 2025",
    "10:00 AM – 12:00 PM",
    "2 hrs",
    "100",
  ],
  [
    "Final End Term Examination",
    "All Courses",
    "20 Jun 2025",
    "09:00 AM – 01:00 PM",
    "4 hrs",
    "300",
  ],
];
const results = [
  [
    "Data Structures Mid Term",
    "Data Structures & Algorithms",
    "10 May 2025",
    "100",
    "86",
    "86%",
    "A",
  ],
  [
    "Database Management Quiz",
    "Database Management Systems",
    "12 May 2025",
    "50",
    "42",
    "84%",
    "A",
  ],
  [
    "Python Programming Test",
    "Python Programming",
    "15 May 2025",
    "100",
    "92",
    "92%",
    "A+",
  ],
  [
    "Operating Systems Mid Term",
    "Operating Systems",
    "18 May 2025",
    "100",
    "78",
    "78%",
    "B+",
  ],
  [
    "Computer Networks Quiz",
    "Computer Networks",
    "22 May 2025",
    "50",
    "32",
    "64%",
    "B",
  ],
];
export default function StudentExaminations({ profile, reportOnly = false }) {
  const navigate = useNavigate();
  return (
    <StudentLayout
      title={reportOnly ? "Report Card" : "Examinations"}
      description="Dashboard  ›  Examinations"
      profile={profile}
    >
      <div className="student-tabs">
        <button
          className={!reportOnly ? "active" : ""}
          onClick={() => navigate("/crm/student/examinations")}
        >
          Exam Schedule
        </button>
        <button
          className={reportOnly ? "active" : ""}
          onClick={() => navigate("/crm/student/examinations/report-card")}
        >
          Report Card
        </button>
      </div>
      {!reportOnly && (
        <section className="student-card student-section-table">
          <header>
            <h2>
              <CalendarDays />
              Upcoming Exam Schedule
            </h2>
          </header>
          <div className="faculty-table-wrap">
            <table className="faculty-table">
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Course</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Total Marks</th>
                  <th>Venue / Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((e, i) => (
                  <tr key={e[0]}>
                    <td>
                      <span className={`class-symbol tone-${i}`}>
                        <FileText />
                      </span>
                      <strong>{e[0]}</strong>
                    </td>
                    <td>{e[1]}</td>
                    <td>
                      <strong>{e[2]}</strong>
                      <small className="cell-subtitle">{e[3]}</small>
                    </td>
                    <td>{e[4]}</td>
                    <td>{e[5]}</td>
                    <td>Online</td>
                    <td>
                      <button className="faculty-outline-button">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="faculty-text-link">View Full Schedule →</button>
        </section>
      )}
      <section className="student-card student-results">
        <header>
          <h2>My Results / Report Card</h2>
          <select>
            <option>All Courses</option>
          </select>
        </header>
        <div className="result-stats">
          <div>
            <span>Overall Performance</span>
            <div className="result-ring">
              84%<small>Overall Average</small>
            </div>
          </div>
          {[
            ["Total Exams", "12"],
            ["Exams Attended", "11"],
            ["Highest Score", "92%"],
            ["Lowest Score", "65%"],
          ].map((x) => (
            <div key={x[0]}>
              <span>{x[0]}</span>
              <strong>{x[1]}</strong>
            </div>
          ))}
        </div>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Course</th>
                <th>Date</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r[0]}>
                  {r.slice(0, 7).map((v, i) => (
                    <td key={i}>
                      {i === 6 ? (
                        <span className="faculty-status success">{v}</span>
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                  <td>
                    <span className="faculty-status success">Pass</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="faculty-text-link">View Full Report Card →</button>
      </section>
    </StudentLayout>
  );
}
