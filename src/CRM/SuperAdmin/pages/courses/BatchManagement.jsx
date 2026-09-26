import AdminSectionPage from "../../components/AdminSectionPage";
import { courseModule } from "../../data/adminModules";

const page = {
  title: "Batch Management",
  description: "Create batches and assign students and faculty.",
  actionLabel: "Create Batch",
  filters: ["All Courses", "Academic Year", "All Status"],
  columns: [
    "Batch",
    "Course",
    "Academic Year",
    "Students",
    "Coordinator",
    "Status",
  ],
  rows: [
    [
      "AIENG-2025-A",
      "AI Engineer",
      "2025-2026",
      "28",
      "Dr. Daniel Thomas",
      "Active",
    ],
    ["DS-2025-A", "Data Science", "2025-2026", "30", "Sarah Patel", "Active"],
    [
      "WD-2025-A",
      "Web Development",
      "2025-2026",
      "29",
      "Rohit Kumar",
      "Active",
    ],
  ],
};
export default function BatchManagement({ profile }) {
  return (
    <AdminSectionPage module={courseModule} page={page} profile={profile} />
  );
}
