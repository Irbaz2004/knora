import {
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Megaphone,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const stats = [
  [Users, "Total Students", "1,248", "+24 this month", "blue"],
  [GraduationCap, "Total Teachers", "86", "+3 this month", "green"],
  [
    CalendarCheck,
    "Today's Attendance",
    "89.6%",
    "↑ 5.3% vs yesterday",
    "purple",
  ],
  [
    WalletCards,
    "Fee Collected Today",
    "₹ 2,45,800",
    "+12.5% vs yesterday",
    "orange",
  ],
  [WalletCards, "Pending Fees", "₹ 18,76,500", "↑ 8.4% vs last month", "pink"],
  [BookOpen, "Active Courses", "32", "+2 this month", "blue"],
];

const students = [
  [
    "AM",
    "Ayesha Malik",
    "B.Sc. Computer Science",
    "CS-2025-A",
    "20 May 2025",
    "purple",
  ],
  ["RM", "Rohan Mehta", "B.Com", "BCOM-2025-A", "19 May 2025", "blue"],
  ["SP", "Sana Patel", "BBA", "BBA-2025-A", "18 May 2025", "green"],
  ["AK", "Arjun Kumar", "BA English", "BAENG-2025-A", "17 May 2025", "orange"],
  [
    "NS",
    "Neha Sharma",
    "B.Sc. Mathematics",
    "MATH-2025-A",
    "16 May 2025",
    "pink",
  ],
];

const events = [
  [
    "MAY",
    "23",
    "Unit Test - 1 (Computer Science)",
    "10:00 AM - 12:00 PM",
    "Exam",
  ],
  ["MAY", "28", "Mid Term Exams Begin", "All Departments", "Exam"],
  ["JUN", "05", "Parent-Teacher Meeting", "02:00 PM - 04:00 PM", "Event"],
  ["JUN", "10", "Last Date for Fee Submission", "All Courses", "Reminder"],
];

const notices = [
  [
    Megaphone,
    "Summer Break Announcement",
    "The institute will remain closed for summer break from 25 May 2025 to 05 June 2025.",
    "20 May 2025",
    "09:30 AM",
    "blue",
  ],
  [
    CalendarCheck,
    "Library Timing Update",
    "From 01 June 2025, library timing will be extended till 6:00 PM on all weekdays.",
    "15 May 2025",
    "11:20 AM",
    "green",
  ],
  [
    Users,
    "Parent-Teacher Meeting",
    "PTM will be held on 31 May 2025 (Saturday). More details will be shared soon.",
    "14 May 2025",
    "02:45 PM",
    "purple",
  ],
];

export default function Dashboard({ profile }) {
  return (
    <DashboardLayout
      profile={profile}
      title="Dashboard"
      description="Welcome back, Admin! Here’s what’s happening in your institute today."
    >
      <section className="suite-stats suite-stats-six">
        {stats.map(([Icon, label, value, meta, tone]) => (
          <article key={label}>
            <span className={`suite-icon ${tone}`}>
              <Icon />
            </span>
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
              <em>{meta}</em>
            </div>
          </article>
        ))}
      </section>

      <section className="crm-card dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div>
          <button type="button">
            <UserPlus /> Add Student
          </button>
          <button type="button">
            <UserPlus /> Add Teacher
          </button>
          <button type="button">
            <Megaphone /> Create Notice
          </button>
          <button type="button">
            <CalendarCheck /> Mark Attendance
          </button>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="crm-card suite-panel">
          <div className="suite-panel-heading">
            <h2>Recent Admissions</h2>
            <button type="button">View All</button>
          </div>
          <div className="crm-table-wrap suite-table-wrap">
            <table className="crm-table suite-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Admission Date</th>
                </tr>
              </thead>
              <tbody>
                {students.map(([initials, name, course, batch, date, tone]) => (
                  <tr key={name}>
                    <td>
                      <span className="crm-person">
                        <span className={`crm-avatar ${tone}`}>{initials}</span>
                        {name}
                      </span>
                    </td>
                    <td>{course}</td>
                    <td>{batch}</td>
                    <td>{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="crm-card suite-panel">
          <div className="suite-panel-heading">
            <h2>Upcoming Exams / Events</h2>
            <button type="button">View Calendar</button>
          </div>
          <div className="dashboard-events">
            {events.map(([month, day, title, meta, type]) => (
              <article key={title}>
                <time>
                  <b>{month}</b>
                  <strong>{day}</strong>
                </time>
                <div>
                  <h3>{title}</h3>
                  <p>{meta}</p>
                </div>
                <span>{type}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="crm-card suite-panel">
          <div className="suite-panel-heading">
            <h2>Recent Notices & Announcements</h2>
            <button type="button">View All</button>
          </div>
          <div className="dashboard-notices">
            {notices.map(([Icon, title, copy, date, time, tone]) => (
              <article key={title}>
                <span className={`suite-icon ${tone}`}>
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <time>
                  {date}
                  <small>{time}</small>
                </time>
              </article>
            ))}
          </div>
        </section>

        <section className="crm-card suite-panel fee-trend">
          <div className="suite-panel-heading">
            <h2>Fee Collection Trend</h2>
            <button type="button">This Month⌄</button>
          </div>
          <div className="trend-legend">
            <span /> Collected (₹)
          </div>
          <svg
            viewBox="0 0 620 230"
            role="img"
            aria-label="Fee collection line chart"
          >
            {[35, 75, 115, 155, 195].map((y) => (
              <line key={y} x1="42" x2="602" y1={y} y2={y} />
            ))}
            <polyline points="48,196 84,178 120,158 156,147 205,126 260,116 302,108 330,70 366,58 410,50 446,44 482,20 518,21 554,15 596,4" />
            {[
              48, 84, 120, 156, 205, 260, 302, 330, 366, 410, 446, 482, 518,
              554, 596,
            ].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={
                  [
                    196, 178, 158, 147, 126, 116, 108, 70, 58, 50, 44, 20, 21,
                    15, 4,
                  ][i]
                }
                r="3.5"
              />
            ))}
          </svg>
          <div className="trend-labels">
            <span>01 May</span>
            <span>05 May</span>
            <span>10 May</span>
            <span>15 May</span>
            <span>20 May</span>
            <span>25 May</span>
            <span>30 May</span>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
