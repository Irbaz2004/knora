import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckSquare,
  ClipboardPenLine,
  Megaphone,
  UploadCloud,
  Users,
  Video,
} from "lucide-react";
import FacultyLayout from "../layouts/FacultyLayout";

const schedule = [
  ["09:00 AM", "Data Structures", "BCA 2nd Year - Section A", "blue"],
  [
    "11:00 AM",
    "Database Management Systems",
    "BCA 2nd Year - Section B",
    "green",
  ],
  ["02:00 PM", "Python Programming", "BCA 1st Year - Section A", "orange"],
];
const notices = [
  [
    "General",
    "Holiday Notice",
    "The institute will remain closed on 27th May 2025 on account of Local Holiday.",
    "24 May 2025",
  ],
  [
    "Academic",
    "Internal Exam Schedule Released",
    "Internal exam schedule is now available. Please check the timetable section.",
    "22 May 2025",
  ],
  [
    "Event",
    "Faculty Development Program",
    "All faculty members are requested to attend the FDP on AI in Education.",
    "20 May 2025",
  ],
];

export default function FacultyDashboard({ profile }) {
  const navigate = useNavigate();
  const firstName = profile?.fullName?.split(" ").slice(-1)[0] || "Ahmed";
  const stats = [
    [
      CalendarDays,
      "Today’s Classes",
      "3",
      "View schedule",
      "/crm/faculty/timetable",
      "blue",
    ],
    [Users, "Total Batches", "4", "View all", "/crm/faculty/batches", "green"],
    [
      CheckSquare,
      "Attendance Pending",
      "2",
      "Mark now",
      "/crm/faculty/attendance/students",
      "orange",
    ],
    [
      ClipboardPenLine,
      "Marks Entry Pending",
      "1",
      "Enter marks",
      "/crm/faculty/marks",
      "pink",
    ],
  ];

  return (
    <FacultyLayout
      title={`Welcome back, Dr. ${firstName} 👋`}
      description="Here’s what’s happening in your classes today."
      profile={profile}
    >
      <section className="faculty-stat-grid">
        {stats.map(([Icon, label, value, action, to, tone]) => (
          <button
            className={`faculty-stat ${tone}`}
            key={label}
            onClick={() => navigate(to)}
          >
            <span>
              <Icon />
            </span>
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
              <em>
                {action} <ArrowRight />
              </em>
            </div>
          </button>
        ))}
      </section>
      <section className="faculty-dashboard-grid">
        <article className="faculty-card">
          <div className="faculty-card-head">
            <h2>
              <CalendarDays /> Today’s Class Schedule
            </h2>
            <button onClick={() => navigate("/crm/faculty/timetable")}>
              View Full Timetable
            </button>
          </div>
          <div className="faculty-schedule-list">
            {schedule.map(([time, subject, batch, tone]) => (
              <div key={time} className={tone}>
                <time>{time}</time>
                <span className="dot" />
                <div>
                  <strong>{subject}</strong>
                  <small>{batch}</small>
                </div>
                <em>Scheduled</em>
              </div>
            ))}
          </div>
          <button
            className="faculty-text-link"
            onClick={() => navigate("/crm/faculty/timetable")}
          >
            View Full Schedule <ArrowRight />
          </button>
        </article>
        <article className="faculty-card">
          <div className="faculty-card-head">
            <h2>
              <CheckSquare /> Pending Tasks
            </h2>
          </div>
          <div className="faculty-task-list">
            <button
              className="pink"
              onClick={() => navigate("/crm/faculty/attendance/students")}
            >
              <CheckSquare />
              <span>
                <strong>Mark attendance for 2 classes</strong>
                <small>Data Structures (BCA 2A), DBMS (BCA 2B)</small>
              </span>
              <em>Mark Now</em>
            </button>
            <button
              className="orange"
              onClick={() => navigate("/crm/faculty/marks")}
            >
              <ClipboardPenLine />
              <span>
                <strong>Enter marks for 1 assignment</strong>
                <small>Python Programming - Assignment 2</small>
              </span>
              <em>Enter Marks</em>
            </button>
            <button
              className="blue"
              onClick={() => navigate("/crm/faculty/materials")}
            >
              <UploadCloud />
              <span>
                <strong>Upload study material for 1 class</strong>
                <small>DBMS - Normalization Notes</small>
              </span>
              <em>Upload Now</em>
            </button>
          </div>
        </article>
        <article className="faculty-card">
          <div className="faculty-card-head">
            <h2>
              <Megaphone /> Notices & Announcements
            </h2>
            <button onClick={() => navigate("/crm/faculty/notices")}>
              View All
            </button>
          </div>
          <div className="faculty-notice-list">
            {notices.map(([type, title, text, date], index) => (
              <div key={title}>
                <span className={`tag tag-${index}`}>{type}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
                <time>{date}</time>
              </div>
            ))}
          </div>
        </article>
        <article className="faculty-card">
          <div className="faculty-card-head">
            <h2>Quick Links</h2>
          </div>
          <div className="faculty-quick-links">
            <button
              className="blue"
              onClick={() => navigate("/crm/faculty/live-classes")}
            >
              <Video />
              <span>
                <strong>Start Live Class</strong>
                <small>
                  Go Live Now <ArrowRight />
                </small>
              </span>
            </button>
            <button
              className="green"
              onClick={() => navigate("/crm/faculty/attendance/students")}
            >
              <Users />
              <span>
                <strong>Mark Attendance</strong>
                <small>
                  Mark Now <ArrowRight />
                </small>
              </span>
            </button>
            <button
              className="purple"
              onClick={() => navigate("/crm/faculty/materials/assignments")}
            >
              <UploadCloud />
              <span>
                <strong>Upload Assignment</strong>
                <small>
                  Upload Now <ArrowRight />
                </small>
              </span>
            </button>
            <button
              className="orange"
              onClick={() => navigate("/crm/faculty/marks")}
            >
              <ClipboardPenLine />
              <span>
                <strong>Enter Marks</strong>
                <small>
                  Enter Now <ArrowRight />
                </small>
              </span>
            </button>
          </div>
        </article>
      </section>
    </FacultyLayout>
  );
}
