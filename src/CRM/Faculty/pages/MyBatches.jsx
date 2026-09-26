import { BookOpen, CalendarDays, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FacultyLayout from "../layouts/FacultyLayout";

const batches = [
  ["BCA 2nd Year - Section A", "Data Structures", "28", "Mon, Wed, Fri"],
  ["BCA 2nd Year - Section B", "Database Management Systems", "26", "Tue, Thu"],
  ["BCA 1st Year - Section A", "Python Programming", "32", "Mon, Wed, Fri"],
  ["BCA 3rd Year - Section A", "Machine Learning", "24", "Tue, Sat"],
];
export default function FacultyBatches({ profile }) {
  const navigate = useNavigate();
  return (
    <FacultyLayout
      title="My Batches"
      description="View batches and subjects assigned to you."
      profile={profile}
    >
      <section className="faculty-batch-grid">
        {batches.map((b, i) => (
          <article className="faculty-card" key={b[0]}>
            <span className={`batch-icon tone-${i}`}>
              <Users />
            </span>
            <h2>{b[0]}</h2>
            <p>
              <BookOpen />
              {b[1]}
            </p>
            <p>
              <Users />
              {b[2]} Students
            </p>
            <p>
              <CalendarDays />
              {b[3]}
            </p>
            <button
              className="faculty-outline-button"
              onClick={() => navigate("/crm/faculty/students")}
            >
              View Students
            </button>
          </article>
        ))}
      </section>
    </FacultyLayout>
  );
}
