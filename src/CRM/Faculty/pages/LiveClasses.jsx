import {
  CalendarDays,
  Clock3,
  Copy,
  ExternalLink,
  Info,
  Search,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FacultyLayout from "../layouts/FacultyLayout";

const upcoming = [
  [
    "21 May 2025",
    "10:00 AM - 11:00 AM",
    "Data Structures",
    "Batch 2025",
    "Google Meet",
    "meet.google.com/xyz-abcd-efg",
  ],
  [
    "22 May 2025",
    "02:00 PM - 03:00 PM",
    "Python Programming",
    "Batch 2025",
    "Zoom",
    "zoom.us/j/1234567890",
  ],
  [
    "23 May 2025",
    "10:00 AM - 11:00 AM",
    "Database Management Systems",
    "Batch 2025",
    "Google Meet",
    "meet.google.com/xyz-abcd-efg",
  ],
];
const recordings = [
  [
    "19 May 2025",
    "10:00 AM - 11:00 AM",
    "Data Structures",
    "58 mins",
    "Google Meet",
  ],
  [
    "18 May 2025",
    "02:00 PM - 03:00 PM",
    "Python Programming",
    "61 mins",
    "Zoom",
  ],
  [
    "17 May 2025",
    "10:00 AM - 11:00 AM",
    "Database Management Systems",
    "55 mins",
    "Google Meet",
  ],
  [
    "16 May 2025",
    "02:00 PM - 03:00 PM",
    "Python Programming",
    "62 mins",
    "Zoom",
  ],
];

export default function FacultyLiveClasses({
  profile,
  recordingsOnly = false,
}) {
  const navigate = useNavigate();
  return (
    <FacultyLayout
      title={recordingsOnly ? "My Recordings" : "Live Classes"}
      description="Manage your live classes, schedules and recordings."
      profile={profile}
    >
      <div className="faculty-tabs">
        <button
          className={!recordingsOnly ? "active" : ""}
          onClick={() => navigate("/crm/faculty/live-classes")}
        >
          <Video />
          Live / Online Class
        </button>
        <button onClick={() => navigate("/crm/faculty/timetable")}>
          <CalendarDays />
          My Schedule
        </button>
        <button
          className={recordingsOnly ? "active" : ""}
          onClick={() => navigate("/crm/faculty/live-classes/recordings")}
        >
          <Video />
          Recordings
        </button>
      </div>
      {!recordingsOnly && (
        <section className="faculty-live-grid">
          <article className="faculty-card faculty-table-card">
            <div className="faculty-card-head">
              <h2>
                <CalendarDays />
                Upcoming Live Classes
              </h2>
            </div>
            <div className="faculty-table-wrap">
              <table className="faculty-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Subject</th>
                    <th>Batch</th>
                    <th>Platform</th>
                    <th>Link</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcoming.map((r) => (
                    <tr key={r[0] + r[2]}>
                      <td>
                        <CalendarDays className="table-icon" />
                        <strong>{r[0]}</strong>
                        <small className="cell-subtitle">{r[1]}</small>
                      </td>
                      <td>{r[2]}</td>
                      <td>{r[3]}</td>
                      <td>
                        <span className="platform-dot">●</span>
                        {r[4]}
                      </td>
                      <td>
                        <a
                          href={`https://${r[5]}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {r[5]} <ExternalLink />
                        </a>
                        <Copy className="table-icon" />
                      </td>
                      <td>
                        <button className="faculty-outline-button">
                          Start Class
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="faculty-text-link">View Full Schedule →</button>
          </article>
          <aside className="faculty-card faculty-host-card">
            <h2>Host a Live Class</h2>
            <p>Start a live class for your assigned batch.</p>
            <button>
              <span className="meet-icon">M</span>
              <div>
                <strong>Start with Google Meet</strong>
                <small>Generate and start a Google Meet session</small>
              </div>
            </button>
            <button>
              <Video />
              <div>
                <strong>Start with Zoom</strong>
                <small>Generate and start a Zoom meeting</small>
              </div>
            </button>
            <div className="faculty-info-banner">
              <Info />
              <span>
                <strong>Note:</strong> Only assigned batches are shown. You can
                start class only for your assigned subjects.
              </span>
            </div>
          </aside>
        </section>
      )}
      <section className="faculty-card faculty-table-card">
        <div className="faculty-card-head">
          <h2>
            <Video />
            Past Class Recordings
          </h2>
          <div className="faculty-search">
            <Search />
            <input placeholder="Search recordings..." />
            <select>
              <option>All Subjects</option>
            </select>
          </div>
        </div>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Batch</th>
                <th>Duration</th>
                <th>Platform</th>
                <th>Recording</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recordings.map((r) => (
                <tr key={r[0] + r[2]}>
                  <td>
                    <strong>{r[0]}</strong>
                    <small className="cell-subtitle">{r[1]}</small>
                  </td>
                  <td>{r[2]}</td>
                  <td>Batch 2025</td>
                  <td>
                    <Clock3 className="table-icon" />
                    {r[3]}
                  </td>
                  <td>{r[4]}</td>
                  <td>
                    <span className="faculty-status success">Uploaded</span>
                    <small className="cell-subtitle">{r[0]}, 11:15 AM</small>
                  </td>
                  <td>
                    <button className="faculty-outline-button">
                      View Recording
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="faculty-text-link">View All Recordings →</button>
      </section>
    </FacultyLayout>
  );
}
