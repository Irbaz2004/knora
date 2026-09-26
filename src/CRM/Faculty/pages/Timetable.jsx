import { CalendarDays, Info, Printer } from "lucide-react";
import FacultyLayout from "../layouts/FacultyLayout";

const slots = [
  "08:00 AM – 09:00 AM",
  "09:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:15 AM – 12:15 PM",
  "12:15 PM – 01:15 PM",
  "02:00 PM – 03:00 PM",
  "03:00 PM – 04:00 PM",
];
const subjects = [
  [
    "Data Structures",
    "Database Management Systems",
    "Data Structures",
    "Database Management Systems",
    "Data Structures",
    "—",
    "—",
  ],
  [
    "Python Programming",
    "Data Structures",
    "Python Programming",
    "Data Structures",
    "Python Programming",
    "—",
    "—",
  ],
  [
    "Database Management Systems",
    "Python Programming",
    "Database Management Systems",
    "Python Programming",
    "Database Management Systems",
    "—",
    "—",
  ],
  ["UI/UX Design", "—", "UI/UX Design", "—", "UI/UX Design", "—", "—"],
  ["—", "—", "—", "—", "—", "—", "—"],
  ["Web Development", "—", "Web Development", "—", "Web Development", "—", "—"],
  [
    "Machine Learning",
    "Office Hours",
    "AI Fundamentals",
    "Office Hours",
    "Deep Learning",
    "—",
    "—",
  ],
];
const tone = {
  "Data Structures": "blue",
  "Database Management Systems": "green",
  "Python Programming": "purple",
  "UI/UX Design": "yellow",
  "Web Development": "teal",
  "Machine Learning": "orange",
  "Deep Learning": "purple",
  "AI Fundamentals": "blue",
  "Office Hours": "pink",
};

export default function FacultyTimetable({ profile }) {
  const days = [
    ["Mon", "19 May"],
    ["Tue", "20 May"],
    ["Wed", "21 May"],
    ["Thu", "22 May"],
    ["Fri", "23 May"],
    ["Sat", "24 May"],
    ["Sun", "25 May"],
  ];
  return (
    <FacultyLayout
      title="Timetable"
      description="View your class timetable (read-only)."
      profile={profile}
    >
      <div className="timetable-controls">
        <div>
          <button>‹</button>
          <strong>19 May – 25 May 2025</strong>
          <CalendarDays />
          <button>›</button>
        </div>
        <button
          className="faculty-outline-button"
          onClick={() => window.print()}
        >
          <Printer />
          Print Timetable
        </button>
      </div>
      <div className="faculty-info-banner">
        <Info />
        <span>This is your class timetable for the selected week.</span>
      </div>
      <section className="faculty-card faculty-timetable-card">
        <div className="faculty-timetable">
          <div className="time-heading">Time</div>
          {days.map((d) => (
            <div className="day-heading" key={d[0]}>
              <strong>{d[0]}</strong>
              <small>{d[1]}</small>
            </div>
          ))}
          {slots.map((slot, row) => (
            <div className="timetable-row" key={slot}>
              <div className="time-cell">{slot}</div>
              {subjects[row].map((subject, col) => (
                <div className="subject-cell" key={col}>
                  {subject !== "—" ? (
                    <span className={tone[subject]}>{subject}</span>
                  ) : (
                    "—"
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="timetable-legend">
          {Object.entries(tone).map(([name, color]) => (
            <span key={name}>
              <i className={color} />
              {name}
            </span>
          ))}
        </div>
      </section>
      <div className="faculty-info-banner">
        <Info />
        <span>
          <strong>Note:</strong> Timetable is subject to change. Please check
          regularly for updates.
        </span>
      </div>
    </FacultyLayout>
  );
}
