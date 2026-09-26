import {
  CalendarDays,
  Clock3,
  Filter,
  PlayCircle,
  Search,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";

const classes = [
  [
    "26 May 2025",
    "10:00 AM - 11:00 AM",
    "Data Structures & Algorithms",
    "Arrays and Linked Lists",
    "Arjun Kumar",
    "Google Meet",
    "Live Now",
  ],
  [
    "27 May 2025",
    "03:00 PM - 04:00 PM",
    "Database Management Systems",
    "SQL Basics and Queries",
    "Neha Sharma",
    "Zoom",
    "Upcoming",
  ],
  [
    "28 May 2025",
    "11:00 AM - 12:00 PM",
    "Python Programming",
    "Functions and Modules",
    "Rohit Verma",
    "Google Meet",
    "Upcoming",
  ],
  [
    "29 May 2025",
    "03:00 PM - 04:00 PM",
    "Operating Systems",
    "Process and Threads",
    "Neha Sharma",
    "Zoom",
    "Upcoming",
  ],
];
const videos = [
  [
    "Data Structures & Algorithms",
    "Arrays and Linked Lists",
    "59:41",
    "Arjun Kumar",
    "blue",
  ],
  [
    "Database Management Systems",
    "SQL Basics and Queries",
    "1:02:13",
    "Neha Sharma",
    "green",
  ],
  [
    "Python Programming",
    "Functions and Modules",
    "55:18",
    "Rohit Verma",
    "purple",
  ],
  [
    "Operating Systems",
    "Process and Threads",
    "1:01:07",
    "Neha Sharma",
    "orange",
  ],
  [
    "Data Structures & Algorithms",
    "Stacks and Queues",
    "1:03:22",
    "Arjun Kumar",
    "navy",
  ],
];

export default function StudentLiveClasses({
  profile,
  recordingsOnly = false,
}) {
  const navigate = useNavigate();
  return (
    <StudentLayout
      title={recordingsOnly ? "Recorded Video Library" : "Live Classes"}
      description="Dashboard  ›  Live Classes"
      profile={profile}
    >
      <div className="student-tabs">
        <button
          className={!recordingsOnly ? "active" : ""}
          onClick={() => navigate("/crm/student/live-classes")}
        >
          Live Class Schedule
        </button>
        <button
          className={recordingsOnly ? "active" : ""}
          onClick={() => navigate("/crm/student/live-classes/recordings")}
        >
          Recorded Video Library
        </button>
      </div>
      {!recordingsOnly && (
        <>
          <div className="student-live-banner">
            <div className="live-banner-art">
              <CalendarDays />
              <Video />
            </div>
            <p>
              Attend live classes, interact with instructors
              <br />
              and get your doubts cleared in real time.
            </p>
            <button className="faculty-outline-button">
              <PlayCircle />
              How Live Classes Work?
            </button>
          </div>
          <section className="student-card student-live-table">
            <header>
              <h2>
                <CalendarDays />
                Upcoming Live Classes
              </h2>
              <span>🌐 Time Zone: Asia/Kolkata (GMT +05:30)</span>
              <div>
                <button>‹</button>
                <button>Today</button>
                <button>›</button>
              </div>
            </header>
            <div className="faculty-table-wrap">
              <table className="faculty-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Class Details</th>
                    <th>Instructor</th>
                    <th>Duration</th>
                    <th>Join</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((c, i) => (
                    <tr className={i === 0 ? "live-row" : ""} key={c[0]}>
                      <td>
                        {i === 0 && <em className="live-label">LIVE NOW</em>}
                        <strong>{c[0]}</strong>
                        <small className="cell-subtitle">{c[1]}</small>
                      </td>
                      <td>
                        <span className={`class-symbol tone-${i}`}>
                          <Video />
                        </span>
                        <strong>{c[2]}</strong>
                        <small className="cell-subtitle">{c[3]}</small>
                        <em className="student-pill">{c[6]}</em>
                      </td>
                      <td>
                        <span className="student-avatar">{c[4][0]}</span>
                        {c[4]}
                      </td>
                      <td>
                        <Clock3 className="table-icon" />
                        60 mins
                      </td>
                      <td>
                        <button
                          className={
                            i === 0 ? "join-live" : "faculty-outline-button"
                          }
                        >
                          <Video />
                          Join Class
                        </button>
                        <small className="cell-subtitle">{c[5]}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="faculty-text-link">View Full Schedule →</button>
          </section>
        </>
      )}
      <section className="student-card student-video-library">
        <header>
          <div>
            <h2>
              <Video />
              Recorded Video Library
            </h2>
            <p>Watch your past live classes anytime, anywhere.</p>
          </div>
          <div className="faculty-search">
            <Search />
            <input placeholder="Search by class or topic..." />
            <button className="faculty-outline-button">
              <Filter />
              Filter
            </button>
          </div>
        </header>
        <div className="student-video-grid">
          {videos.map((v) => (
            <article key={v[0] + v[2]}>
              <div className={`video-cover ${v[4]}`}>
                <PlayCircle />
                <strong>{v[0]}</strong>
                <small>{v[1]}</small>
                <em>{v[2]}</em>
              </div>
              <h3>{v[0]}</h3>
              <p>26 May 2025 ・ {v[3]}</p>
            </article>
          ))}
        </div>
        <button className="faculty-text-link">View All Recordings →</button>
      </section>
    </StudentLayout>
  );
}
