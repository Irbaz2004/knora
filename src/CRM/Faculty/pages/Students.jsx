import { Download, RefreshCw, Users } from "lucide-react";
import FacultyLayout from "../layouts/FacultyLayout";

const students = [
  [
    "1001",
    "Ayesha Malik",
    "Female",
    "14 Aug 2008",
    "+91 98765 43210",
    "ayesha.malik@example.com",
  ],
  [
    "1002",
    "Rohan Mehta",
    "Male",
    "22 Jan 2008",
    "+91 87654 32109",
    "rohan.mehta@example.com",
  ],
  [
    "1003",
    "Sana Patel",
    "Female",
    "05 Mar 2008",
    "+91 76543 21098",
    "sana.patel@example.com",
  ],
  [
    "1004",
    "Arjun Kumar",
    "Male",
    "10 Nov 2007",
    "+91 65432 10987",
    "arjun.kumar@example.com",
  ],
  [
    "1005",
    "Neha Sharma",
    "Female",
    "18 Feb 2008",
    "+91 54321 09876",
    "neha.sharma@example.com",
  ],
  [
    "1006",
    "Yash Singh",
    "Male",
    "30 Jun 2008",
    "+91 43210 98765",
    "yash.singh@example.com",
  ],
  [
    "1007",
    "Pooja Rao",
    "Female",
    "12 Sep 2007",
    "+91 32109 87654",
    "pooja.rao@example.com",
  ],
  [
    "1008",
    "Kunal Das",
    "Male",
    "27 Dec 2007",
    "+91 21098 76543",
    "kunal.das@example.com",
  ],
];

export default function FacultyStudents({ profile }) {
  return (
    <FacultyLayout
      title="Student List"
      description="View student list for assigned batches only."
      profile={profile}
    >
      <section className="faculty-filter-bar faculty-card">
        <label>
          <span>Select Batch</span>
          <select>
            <option>Grade 10 - A</option>
          </select>
        </label>
        <label>
          <span>Select Exam (Optional)</span>
          <select>
            <option>All Exams</option>
          </select>
        </label>
        <label>
          <span>Select Subject (Optional)</span>
          <select>
            <option>All Subjects</option>
          </select>
        </label>
        <button className="faculty-primary-button">
          <RefreshCw />
          Load Students
        </button>
      </section>
      <section className="faculty-card faculty-table-card">
        <div className="faculty-card-head">
          <div>
            <h2>
              Batch: <span className="blue-text">Grade 10 - A</span>
            </h2>
            <p>Total Students: 28</p>
          </div>
          <button className="faculty-outline-button">
            <Download />
            Export
          </button>
        </div>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Contact Number</th>
                <th>Email ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s[0]}>
                  <td>{i + 1}</td>
                  <td>{s[0]}</td>
                  <td>
                    <span className={`faculty-name-avatar tone-${i % 5}`}>
                      {s[1]
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </span>
                    {s[1]}
                  </td>
                  <td>{s[2]}</td>
                  <td>{s[3]}</td>
                  <td>{s[4]}</td>
                  <td>{s[5]}</td>
                  <td>
                    <span className="faculty-status success">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="faculty-table-footer">
          <span>Showing 1 to 8 of 28 students</span>
          <div className="faculty-pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>›</button>
          </div>
        </div>
      </section>
      <div className="faculty-info-banner">
        <Users />
        <div>
          <strong>
            You are viewing students from batches assigned to you.
          </strong>
          <span>You can only view students from your assigned batches.</span>
        </div>
      </div>
    </FacultyLayout>
  );
}
