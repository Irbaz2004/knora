import {
  CalendarDays,
  Download,
  FileText,
  Filter,
  MoreVertical,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";

const materials = [
  [
    "Array and Linked List Notes",
    "PDF",
    "Data Structures & Algorithms",
    "Arjun Kumar",
    "24 May 2025",
  ],
  [
    "Database Normalization",
    "PPT",
    "Database Management Systems",
    "Neha Sharma",
    "23 May 2025",
  ],
  [
    "Python Functions Handout",
    "PDF",
    "Python Programming",
    "Rohit Verma",
    "22 May 2025",
  ],
  [
    "Operating Systems – Processes",
    "Video",
    "Operating Systems",
    "Neha Sharma",
    "20 May 2025",
  ],
  [
    "Practice Questions Set 1",
    "ZIP",
    "Data Structures & Algorithms",
    "Arjun Kumar",
    "18 May 2025",
  ],
];
const assignments = [
  [
    "Sorting Algorithms Implementation",
    "Data Structures & Algorithms",
    "28 May 2025",
    "Pending",
    "—",
  ],
  [
    "SQL Queries Practice",
    "Database Management Systems",
    "27 May 2025",
    "Submitted",
    "25 May 2025",
  ],
  [
    "Python Programs Set 2",
    "Python Programming",
    "29 May 2025",
    "Pending",
    "—",
  ],
  [
    "Process Scheduling Problems",
    "Operating Systems",
    "26 May 2025",
    "Overdue",
    "—",
  ],
];
export default function StudentMaterials({ profile, assignmentsOnly = false }) {
  const navigate = useNavigate();
  return (
    <StudentLayout
      title="Assignments & Study Materials"
      description="Dashboard  ›  Assignments & Study Materials"
      profile={profile}
    >
      <div className="student-tabs">
        <button
          className={!assignmentsOnly ? "active" : ""}
          onClick={() => navigate("/crm/student/materials")}
        >
          Study Materials
        </button>
        <button
          className={assignmentsOnly ? "active" : ""}
          onClick={() => navigate("/crm/student/materials/assignments")}
        >
          My Assignments
        </button>
      </div>
      <section className="student-material-banners">
        <article>
          <Download />
          <div>
            <h2>Access Your Learning Resources</h2>
            <p>
              Download notes, slides, PDFs and other study materials shared by
              your instructors.
            </p>
          </div>
        </article>
        <article>
          <FileText />
          <div>
            <h2>Submit Assignments</h2>
            <p>
              Complete your assignments and submit on time to keep up with your
              progress.
            </p>
          </div>
        </article>
      </section>
      {!assignmentsOnly && (
        <section className="student-card student-section-table">
          <header>
            <div>
              <h2>Study Materials</h2>
              <p>
                View and download all study materials shared for your courses.
              </p>
            </div>
            <div className="faculty-search">
              <Search />
              <input placeholder="Search materials..." />
              <button className="faculty-outline-button">
                <Filter />
                Filter
              </button>
            </div>
          </header>
          <div className="faculty-table-wrap">
            <table className="faculty-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Type</th>
                  <th>Uploaded By</th>
                  <th>Uploaded On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m, i) => (
                  <tr key={m[0]}>
                    <td>
                      <span className={`class-symbol tone-${i}`}>
                        <FileText />
                      </span>
                      <strong>{m[0]}</strong>
                    </td>
                    <td>{m[2]}</td>
                    <td>
                      <span className="faculty-status info">{m[1]}</span>
                    </td>
                    <td>
                      <span className="student-avatar">{m[3][0]}</span>
                      <strong>{m[3]}</strong>
                      <small className="cell-subtitle">Instructor</small>
                    </td>
                    <td>{m[4]}</td>
                    <td>
                      <button className="faculty-outline-button">
                        <Download />
                        Download
                      </button>
                      <MoreVertical className="table-icon" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="faculty-text-link">View All Materials →</button>
        </section>
      )}
      <section className="student-card student-section-table">
        <header>
          <div>
            <h2>My Assignments</h2>
            <p>View all assignments, submit and track your progress.</p>
          </div>
          <div className="faculty-search">
            <Search />
            <input placeholder="Search assignments..." />
            <select>
              <option>All Status</option>
            </select>
          </div>
        </header>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Submitted On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, i) => (
                <tr key={a[0]}>
                  <td>
                    <span className={`class-symbol tone-${i}`}>
                      <FileText />
                    </span>
                    <strong>{a[0]}</strong>
                  </td>
                  <td>{a[1]}</td>
                  <td>
                    <CalendarDays className="table-icon" />
                    {a[2]}
                    <small className="cell-subtitle">11:59 PM</small>
                  </td>
                  <td>
                    <span
                      className={`faculty-status ${a[3] === "Submitted" ? "success" : a[3] === "Overdue" ? "danger" : "warning"}`}
                    >
                      {a[3]}
                    </span>
                  </td>
                  <td>{a[4]}</td>
                  <td>
                    <button
                      className={
                        a[3] === "Submitted"
                          ? "faculty-outline-button"
                          : "faculty-primary-button"
                      }
                    >
                      {a[3] === "Submitted"
                        ? "View Submission"
                        : "Submit Assignment"}
                    </button>
                    <MoreVertical className="table-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="faculty-text-link">View All Assignments →</button>
      </section>
    </StudentLayout>
  );
}
