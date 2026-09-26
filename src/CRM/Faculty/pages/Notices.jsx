import { Bell, CalendarDays, Megaphone, Search } from "lucide-react";
import FacultyLayout from "../layouts/FacultyLayout";

const notices = [
  [
    "Holiday Notice",
    "The institute will remain closed on 27th May 2025 on account of Local Holiday.",
    "General",
    "24 May 2025",
  ],
  [
    "Internal Exam Schedule Released",
    "Internal exam schedule is now available. Please check the timetable section.",
    "Academic",
    "22 May 2025",
  ],
  [
    "Faculty Development Program",
    "All faculty members are requested to attend the FDP on AI in Education.",
    "Event",
    "20 May 2025",
  ],
  [
    "Library Timing Update",
    "Library timings will be extended until 7:00 PM during examination week.",
    "General",
    "18 May 2025",
  ],
];
export default function FacultyNotices({ profile }) {
  return (
    <FacultyLayout
      title="Notices"
      description="Stay updated with institute notices and announcements."
      profile={profile}
    >
      <section className="faculty-card faculty-notices-page">
        <div className="faculty-card-head">
          <h2>
            <Bell />
            All Notices
          </h2>
          <div className="faculty-search">
            <Search />
            <input placeholder="Search notices..." />
            <select>
              <option>All Categories</option>
            </select>
          </div>
        </div>
        {notices.map((n, i) => (
          <article key={n[0]}>
            <span className={`notice-icon tone-${i}`}>
              <Megaphone />
            </span>
            <div>
              <div>
                <span className="faculty-status info">{n[2]}</span>
                <time>
                  <CalendarDays />
                  {n[3]}
                </time>
              </div>
              <h2>{n[0]}</h2>
              <p>{n[1]}</p>
            </div>
          </article>
        ))}
      </section>
    </FacultyLayout>
  );
}
