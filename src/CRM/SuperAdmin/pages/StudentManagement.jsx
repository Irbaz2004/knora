import { useMemo, useState } from "react";
import {
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const initialRegistrations = [
  [
    "Ayesha Malik",
    "AI Engineer",
    "AIENG-2025-A",
    "20 May 2025",
    "AM",
    "purple",
  ],
  ["Rohan Mehta", "Data Science", "DS-2025-A", "19 May 2025", "RM", "blue"],
  [
    "Sana Patel",
    "Full Stack Developer",
    "FSD-2025-A",
    "18 May 2025",
    "SP",
    "green",
  ],
  ["Arjun Kumar", "Cyber Security", "CS-2025-A", "17 May 2025", "AK", "orange"],
  ["Neha Sharma", "Data Science", "DS-2025-A", "16 May 2025", "NS", "pink"],
].map((row, index) => ({
  id: index + 1,
  status: "Pending",
  ...Object.fromEntries(
    ["name", "course", "batch", "date", "initials", "color"].map((key, i) => [
      key,
      row[i],
    ]),
  ),
}));

const initialStudents = initialRegistrations.map((student, index) => ({
  ...student,
  email: `${student.name.toLowerCase().replace(" ", ".")}@example.com`,
  phone: [
    "+91 98765 43210",
    "+91 87654 32109",
    "+91 76543 21098",
    "+91 65432 10987",
    "+91 54321 09876",
  ][index],
  status: "Active",
}));

function Avatar({ student }) {
  return (
    <span className={`crm-avatar ${student.color}`}>{student.initials}</span>
  );
}

function CrmTable({ registrations, onDecision }) {
  return (
    <div className="crm-table-wrap">
      <table className="crm-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" aria-label="Select all" />
            </th>
            <th>#</th>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Batch</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((student) => (
            <tr key={student.id}>
              <td>
                <input type="checkbox" aria-label={`Select ${student.name}`} />
              </td>
              <td>{student.id}</td>
              <td>
                <span className="crm-person">
                  <Avatar student={student} />
                  {student.name}
                </span>
              </td>
              <td>{student.course}</td>
              <td>{student.batch}</td>
              <td>{student.date}</td>
              <td>
                <span className={`crm-badge ${student.status.toLowerCase()}`}>
                  {student.status}
                </span>
              </td>
              <td>
                <div className="crm-actions">
                  <button
                    className="accept"
                    onClick={() => onDecision(student.id, "Approved")}
                    aria-label="Approve"
                  >
                    <Check />
                  </button>
                  <button
                    className="reject"
                    onClick={() => onDecision(student.id, "Rejected")}
                    aria-label="Reject"
                  >
                    <X />
                  </button>
                  <button aria-label="View">
                    <Eye />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StudentManagement({ profile }) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const filteredStudents = useMemo(
    () =>
      students.filter((item) =>
        `${item.name} ${item.email} ${item.phone}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query, students],
  );
  const pending = registrations.filter(
    (item) => item.status === "Pending",
  ).length;

  const decide = (id, status) =>
    setRegistrations((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  const addStudent = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    setStudents((current) => [
      ...current,
      {
        id: current.length + 1,
        name,
        initials: name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        color: "blue",
        course: data.get("course"),
        batch: data.get("batch"),
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        email: data.get("email"),
        phone: data.get("phone"),
        status: "Active",
      },
    ]);
    setShowAdd(false);
  };

  return (
    <DashboardLayout
      profile={profile}
      title="Student Management"
      description="Manage student information, registrations, courses and more."
    >
      <section className="crm-card registrations">
        <div className="crm-card-title">
          <h2>Course Registrations (Pending)</h2>
          <p>
            Students who have registered for courses and are waiting for admin
            confirmation.
          </p>
        </div>
        <div className="crm-stats">
          <div>
            <span className="stat-icon total">
              <Users />
            </span>
            <p>
              Total Registrations<strong>{registrations.length}</strong>
              <small>This Month</small>
            </p>
          </div>
          <div>
            <span className="stat-icon waiting">
              <CalendarCheck />
            </span>
            <p>
              Pending<strong>{pending}</strong>
              <small>Awaiting Approval</small>
            </p>
          </div>
          <div>
            <span className="stat-icon approved">
              <Check />
            </span>
            <p>
              Approved
              <strong>
                {registrations.filter((x) => x.status === "Approved").length}
              </strong>
              <small>Confirmed</small>
            </p>
          </div>
          <div>
            <span className="stat-icon rejected">
              <X />
            </span>
            <p>
              Rejected
              <strong>
                {registrations.filter((x) => x.status === "Rejected").length}
              </strong>
              <small>This Month</small>
            </p>
          </div>
        </div>
        <CrmTable registrations={registrations} onDecision={decide} />
        <div className="crm-table-footer">
          <span>Showing 1 to {registrations.length} of 12 registrations</span>
          <div>
            <button>
              <ChevronLeft />
            </button>
            <button className="current">1</button>
            <button>2</button>
            <button>3</button>
            <button>
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section className="crm-card student-list">
        <div className="crm-card-title title-row">
          <div>
            <h2>Student List</h2>
            <p>View and manage all registered students.</p>
          </div>
          <button className="crm-primary" onClick={() => setShowAdd(true)}>
            <Plus /> Add New Student
          </button>
        </div>
        <div className="crm-filters">
          {["All Courses", "All Batches", "All Status", "All Gender"].map(
            (label) => (
              <button key={label}>
                {label}
                <ChevronDown />
              </button>
            ),
          )}
          <label>
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email or phone..."
            />
          </label>
          <button className="filter-button">
            <Filter /> Filters
          </button>
        </div>
        <div className="crm-table-wrap">
          <table className="crm-table students">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>#</th>
                <th>Student Name</th>
                <th>Course Name</th>
                <th>Batch</th>
                <th>Admission Date</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{student.id}</td>
                  <td>
                    <span className="crm-person">
                      <Avatar student={student} />
                      {student.name}
                    </span>
                  </td>
                  <td>{student.course}</td>
                  <td>{student.batch}</td>
                  <td>{student.date}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>
                    <span className="crm-badge active">Active</span>
                  </td>
                  <td>
                    <div className="crm-actions">
                      <button>
                        <Eye />
                      </button>
                      <button>
                        <Pencil />
                      </button>
                      <button>
                        <MoreVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="crm-table-footer">
          <span>Showing 1 to {filteredStudents.length} of 1248 students</span>
          <div>
            <button>
              <ChevronLeft />
            </button>
            <button className="current">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>…</button>
            <button>157</button>
            <button>
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
      {showAdd && (
        <div
          className="crm-modal-backdrop"
          onMouseDown={() => setShowAdd(false)}
        >
          <form
            className="crm-modal"
            onSubmit={addStudent}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div>
              <h2>Add New Student</h2>
              <button type="button" onClick={() => setShowAdd(false)}>
                <X />
              </button>
            </div>
            <label>
              Full name
              <input name="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" required />
            </label>
            <label>
              Phone
              <input name="phone" required />
            </label>
            <label>
              Course
              <input name="course" required />
            </label>
            <label>
              Batch
              <input name="batch" required />
            </label>
            <button className="crm-primary" type="submit">
              Add Student
            </button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}
