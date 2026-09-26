import AdminSectionPage from "../../components/AdminSectionPage";
import { studentModule } from "../../data/adminModules";

const page = {
  title: "Student Courses",
  description: "Manage student enrollments and course progress.",
  actionLabel: "Enroll Student",
  filters: ["All Courses", "All Batches", "Enrollment Status"],
  columns: ["Student", "Course", "Batch", "Progress", "Enrolled On", "Status"],
  rows: [
    [
      "Ayesha Malik",
      "AI Engineer",
      "AIENG-2025-A",
      "68%",
      "04 Jan 2025",
      "Active",
    ],
    [
      "Rohan Mehta",
      "Data Science",
      "DS-2025-A",
      "74%",
      "08 Jan 2025",
      "Active",
    ],
    [
      "Sana Patel",
      "Full Stack Developer",
      "FSD-2025-A",
      "59%",
      "12 Jan 2025",
      "Active",
    ],
  ],
};

export default function StudentCourses({ profile }) {
  return (
    <AdminSectionPage module={studentModule} page={page} profile={profile} />
  );
}
