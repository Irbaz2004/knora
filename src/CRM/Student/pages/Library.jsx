import { BookOpen, CalendarDays, Search } from "lucide-react";
import StudentLayout from "../layouts/StudentLayout";

const books = [
  [
    "Introduction to Algorithms",
    "Thomas H. Cormen",
    "BK-1021",
    "12 May 2025",
    "02 Jun 2025",
  ],
  [
    "Database System Concepts",
    "Abraham Silberschatz",
    "BK-1412",
    "14 May 2025",
    "04 Jun 2025",
  ],
  [
    "Operating System Concepts",
    "Abraham Silberschatz",
    "BK-1544",
    "18 May 2025",
    "08 Jun 2025",
  ],
];
export default function StudentLibrary({ profile }) {
  return (
    <StudentLayout
      title="My Issued Books"
      description="Dashboard  ›  Library"
      profile={profile}
    >
      <section className="student-card student-section-table">
        <header>
          <div>
            <h2>
              <BookOpen />
              Issued Books
            </h2>
            <p>Track your borrowed books and due dates.</p>
          </div>
          <div className="faculty-search">
            <Search />
            <input placeholder="Search books..." />
          </div>
        </header>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Book ID</th>
                <th>Issued On</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b[2]}>
                  <td>
                    <BookOpen className="table-icon" />
                    <strong>{b[0]}</strong>
                  </td>
                  <td>{b[1]}</td>
                  <td>{b[2]}</td>
                  <td>{b[3]}</td>
                  <td>
                    <CalendarDays className="table-icon" />
                    {b[4]}
                  </td>
                  <td>
                    <span className="faculty-status success">Issued</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </StudentLayout>
  );
}
