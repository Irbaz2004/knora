import AdminSectionPage from "../../components/AdminSectionPage";
import { studentModule } from "../../data/adminModules";

const page = {
  title: "Course Registrations",
  description: "Review students waiting for course registration approval.",
  actionLabel: "Add Registration",
  filters: ["All Courses", "All Batches", "Pending"],
  columns: ["Student", "Course", "Batch", "Registration Date", "Status"],
  rows: [
    ["Ayesha Malik", "AI Engineer", "AIENG-2025-A", "20 May 2025", "Pending"],
    ["Rohan Mehta", "Data Science", "DS-2025-A", "19 May 2025", "Pending"],
    [
      "Sana Patel",
      "Full Stack Developer",
      "FSD-2025-A",
      "18 May 2025",
      "Pending",
    ],
  ],
};

export default function CourseRegistrations({ profile }) {
  return (
    <AdminSectionPage module={studentModule} page={page} profile={profile} />
  );
}
