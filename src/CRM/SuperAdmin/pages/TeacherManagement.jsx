import AdminSectionPage from "../components/AdminSectionPage";
import { teacherModule } from "../data/adminModules";

const page = {
  title: "Teacher Registration",
  description: "Add new teachers and manage registration requests.",
  actionLabel: "Add New Teacher",
  filters: ["All Departments", "All Subjects", "All Status"],
  columns: [
    "Teacher Name",
    "Department",
    "Subject",
    "Email",
    "Phone",
    "Status",
  ],
  rows: [
    [
      "Dr. Daniel Thomas",
      "Computer Science",
      "AI & Machine Learning",
      "daniel.thomas@example.com",
      "+91 98765 43210",
      "Active",
    ],
    [
      "Sarah Patel",
      "Data Science",
      "Data Science",
      "sarah.patel@example.com",
      "+91 87654 32109",
      "Active",
    ],
    [
      "Rohit Kumar",
      "Information Technology",
      "Web Development",
      "rohit.kumar@example.com",
      "+91 76543 21098",
      "Active",
    ],
    [
      "Neha Sharma",
      "Mathematics",
      "Applied Mathematics",
      "neha.sharma@example.com",
      "+91 65432 10987",
      "On Leave",
    ],
    [
      "Arjun Mehta",
      "English",
      "English Literature",
      "arjun.mehta@example.com",
      "+91 54321 09876",
      "Active",
    ],
  ],
  cards: ["Teacher Attendance", "Salary Processing", "Department Summary"],
};

export default function TeacherManagement({ profile }) {
  return (
    <AdminSectionPage module={teacherModule} page={page} profile={profile} />
  );
}
