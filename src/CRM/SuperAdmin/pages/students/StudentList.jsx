import AdminSectionPage from "../../components/AdminSectionPage";
import { studentModule } from "../../data/adminModules";

const page = {
  title: "Student List",
  description: "View and manage all registered students.",
  actionLabel: "Add New Student",
  filters: ["All Courses", "All Batches", "All Status", "All Gender"],
  columns: ["Student", "Course", "Batch", "Email", "Phone", "Status"],
  rows: [
    [
      "Ayesha Malik",
      "AI Engineer",
      "AIENG-2025-A",
      "ayesha@example.com",
      "+91 98765 43210",
      "Active",
    ],
    [
      "Rohan Mehta",
      "Data Science",
      "DS-2025-A",
      "rohan@example.com",
      "+91 87654 32109",
      "Active",
    ],
    [
      "Sana Patel",
      "Full Stack Developer",
      "FSD-2025-A",
      "sana@example.com",
      "+91 76543 21098",
      "Active",
    ],
  ],
};

export default function StudentList({ profile }) {
  return (
    <AdminSectionPage module={studentModule} page={page} profile={profile} />
  );
}
