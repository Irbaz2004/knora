import { Bell, CalendarDays, Megaphone, Search } from "lucide-react";
import StudentLayout from "../layouts/StudentLayout";

const notices = [
  [
    "University Annual Day Holiday",
    "The university will remain closed on 16th May on account of Annual Day celebration.",
    "General",
    "12 May 2025",
  ],
  [
    "Internal Assessment Results Published",
    "Your internal assessment marks are now available in Exams & Results.",
    "Academic",
    "10 May 2025",
  ],
  [
    "AI & Future of Tech Webinar",
    "Join the expert webinar on 18th May at 4:00 PM.",
    "Event",
    "08 May 2025",
  ],
  [
    "Project Submission Deadline",
    "Last date to submit projects for 2nd year students is 30th May.",
    "Reminder",
    "06 May 2025",
  ],
];
export default function StudentNotices({ profile }) {
  return (
    <StudentLayout
      title="Notices"
      description="Dashboard  ›  Notices"
      profile={profile}
    >
      <section className="student-card faculty-notices-page">
        <div className="faculty-card-head">
          <h2>
            <Bell />
            Notices & Announcements
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
    </StudentLayout>
  );
}
