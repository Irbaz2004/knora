import { useState } from "react";
import { CreditCard, PencilLine, RefreshCw, Save } from "lucide-react";
import FacultyLayout from "../layouts/FacultyLayout";

const initialStudents = [
  ["Ayesha Malik", "1001", 82, "Excellent"],
  ["Rohan Mehta", "1002", 74, "Good"],
  ["Sana Patel", "1003", 91, "Outstanding"],
  ["Arjun Kumar", "1004", 66, "Needs Improvement"],
  ["Neha Sharma", "1005", 88, "Very Good"],
];

export default function FacultyMarksEntry({ profile }) {
  const [rows, setRows] = useState(initialStudents);
  const [saved, setSaved] = useState(false);
  const update = (index, field, value) =>
    setRows(
      rows.map((row, i) =>
        i === index ? row.map((cell, j) => (j === field ? value : cell)) : row,
      ),
    );
  return (
    <FacultyLayout
      title="Examination"
      description="Manage exams, enter marks and view report cards for your students."
      profile={profile}
    >
      <div className="faculty-tabs">
        <button className="active">
          <PencilLine />
          Marks Entry <small>Enter marks for own subjects only</small>
        </button>
        <button>
          <CreditCard />
          Report Card <small>View for own students</small>
        </button>
      </div>
      <section className="faculty-filter-bar faculty-card">
        <label>
          <span>Select Batch</span>
          <select>
            <option>Grade 10 - A</option>
          </select>
        </label>
        <label>
          <span>Select Exam</span>
          <select>
            <option>Unit Test - 1</option>
          </select>
        </label>
        <label>
          <span>Subject</span>
          <select>
            <option>Data Structures</option>
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
            <h2>Enter Marks</h2>
            <p>Enter marks for each student in the selected exam.</p>
          </div>
          <div className="marks-actions">
            <label>
              Maximum Marks <input value="100" readOnly />
            </label>
            <button
              className="faculty-primary-button"
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 1800);
              }}
            >
              <Save />
              {saved ? "Marks Saved" : "Save Marks"}
            </button>
          </div>
        </div>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Marks Obtained</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r[1]}>
                  <td>{i + 1}</td>
                  <td>
                    <span className={`faculty-name-avatar tone-${i}`}>
                      {r[0]
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </span>
                    {r[0]}
                  </td>
                  <td>{r[1]}</td>
                  <td>
                    <input
                      className="table-input"
                      type="number"
                      min="0"
                      max="100"
                      value={r[2]}
                      onChange={(e) => update(i, 2, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="table-input"
                      value={r[3]}
                      onChange={(e) => update(i, 3, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="faculty-table-footer">
          <span>Showing 1 to 5 of 25 students</span>
          <div className="faculty-pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>›</button>
          </div>
        </div>
      </section>
      <section className="faculty-feature-strip">
        <article>
          <PencilLine />
          <div>
            <h2>Marks Entry</h2>
            <p>
              Enter marks for your own subjects only. Click on a mark field to
              edit and then save.
            </p>
          </div>
        </article>
        <article>
          <CreditCard />
          <div>
            <h2>Report Card</h2>
            <p>
              View and download report cards for your students in your assigned
              batches.
            </p>
          </div>
        </article>
      </section>
    </FacultyLayout>
  );
}
