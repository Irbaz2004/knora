import { CalendarDays, Download, FileText, Video } from "lucide-react";
import StudentLayout from "../layouts/StudentLayout";

const slots = [
  "08:00 AM – 09:30 AM",
  "10:00 AM – 11:30 AM",
  "12:00 PM – 01:30 PM",
  "03:00 PM – 04:30 PM",
  "05:00 PM – 06:30 PM",
];
const courses = [
  [
    "Data Structures & Algorithms",
    "Data Structures & Algorithms",
    "—",
    "Database Management Systems",
    "Data Structures & Algorithms",
    "weekend",
    "weekend",
  ],
  [
    "Database Management Systems",
    "—",
    "Python Programming",
    "—",
    "Database Management Systems",
    "weekend",
    "weekend",
  ],
  [
    "—",
    "Operating Systems",
    "—",
    "Operating Systems",
    "—",
    "weekend",
    "weekend",
  ],
  [
    "Python Programming",
    "—",
    "Data Structures & Algorithms",
    "—",
    "Operating Systems",
    "weekend",
    "weekend",
  ],
  [
    "Operating Systems",
    "Database Management Systems",
    "—",
    "Python Programming",
    "—",
    "weekend",
    "weekend",
  ],
];
const courseTone = {
  "Data Structures & Algorithms": "blue",
  "Database Management Systems": "green",
  "Python Programming": "purple",
  "Operating Systems": "yellow",
};
export default function StudentTimetable({ profile }) {
  const days = [
    ["MON", "26 May"],
    ["TUE", "27 May"],
    ["WED", "28 May"],
    ["THU", "29 May"],
    ["FRI", "30 May"],
    ["SAT", "31 May"],
    ["SUN", "01 June"],
  ];
  return (
    <StudentLayout
      title="Timetable"
      description="Dashboard  ›  Timetable"
      profile={profile}
    >
      <div className="student-page-intro">
        <p>
          Your class schedule and course syllabus. All timings are in your local
          time (IST).
        </p>
        <div>
          <CalendarDays />
          26 May 2025 - 01 June 2025 <button>‹</button>
          <button>›</button>
        </div>
      </div>
      <section className="student-card student-timetable">
        <div className="student-view-tabs">
          <button className="active">Weekly View</button>
          <button>List View</button>
        </div>
        <div className="student-timetable-grid">
          <div className="time-head">Time</div>
          {days.map((d) => (
            <div className="day-head" key={d[0]}>
              <strong>{d[0]}</strong>
              <small>{d[1]}</small>
            </div>
          ))}
          {slots.map((s, row) => (
            <div className="student-time-row" key={s}>
              <div className="student-time">{s}</div>
              {courses[row].map((c, col) => (
                <div
                  className={`student-class-cell ${c === "weekend" ? "weekend" : ""}`}
                  key={col}
                >
                  {c === "weekend" ? (
                    row === 1 ? (
                      <>
                        <CalendarDays />
                        <strong>No Live Classes</strong>
                        <small>Enjoy your weekend and keep learning!</small>
                      </>
                    ) : null
                  ) : c !== "—" ? (
                    <span className={courseTone[c]}>
                      <strong>{c}</strong>
                      <small>
                        {c.includes("Database")
                          ? "Neha Sharma"
                          : c.includes("Operating")
                            ? "Rohit Verma"
                            : "Arjun Kumar"}
                      </small>
                      <Video />
                    </span>
                  ) : (
                    "—"
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="student-timetable-legend">
          <span>
            <Video />
            Live Class
          </span>
          <span>
            <FileText />
            Recorded / Material
          </span>
          <span>--- No Class</span>
        </div>
      </section>
      <section className="student-card student-syllabus">
        <header>
          <h2>Syllabus / Course Content</h2>
          <button className="faculty-outline-button">
            <Download />
            Download Syllabus
          </button>
        </header>
        <div>
          <aside>
            {Object.keys(courseTone)
              .concat("Computer Networks")
              .map((c, i) => (
                <button className={i === 0 ? "active" : ""} key={c}>
                  <FileText />
                  <span>
                    <strong>{c}</strong>
                    <small>
                      Instructor: {i % 2 ? "Neha Sharma" : "Arjun Kumar"}
                    </small>
                  </span>
                  ›
                </button>
              ))}
          </aside>
          <main>
            <header>
              <h2>Data Structures & Algorithms</h2>
              <span>Total Modules: 8 · Duration: 16 Hours</span>
            </header>
            {[
              [
                "Module 1: Introduction to Data Structures",
                "Overview, time & space complexity, arrays, linked lists",
              ],
              [
                "Module 2: Stack and Queue",
                "Stack operations, applications, queue, circular queue",
              ],
              [
                "Module 3: Recursion",
                "Recursion basics, recursion trees, backtracking",
              ],
              [
                "Module 4: Sorting Algorithms",
                "Bubble sort, selection sort, insertion sort, merge sort, quick sort",
              ],
            ].map((m) => (
              <div key={m[0]}>
                <FileText />
                <span>
                  <strong>{m[0]}</strong>
                  <small>{m[1]}</small>
                </span>
                <em>2 Hours</em>
                <FileText />⌄
              </div>
            ))}
            <button className="faculty-text-link">View All Modules (8)⌄</button>
          </main>
        </div>
      </section>
    </StudentLayout>
  );
}
