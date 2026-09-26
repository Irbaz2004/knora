import AdminSectionPage from "../../components/AdminSectionPage";
import { liveClassModule } from "../../data/adminModules";

const page = {
  title: "Class Recordings",
  description: "View, download and manage recorded classes.",
  actionLabel: "Upload Recording",
  filters: ["All Courses", "All Subjects", "This Month"],
  columns: ["Recording", "Batch", "Teacher", "Duration", "Size", "Recorded On"],
  rows: [
    [
      "Python Functions",
      "AIENG-2025-A",
      "Dr. Daniel Thomas",
      "01:02:15",
      "512 MB",
      "19 May 2025",
    ],
    [
      "Statistics Basics",
      "DS-2025-A",
      "Sarah Patel",
      "00:56:40",
      "420 MB",
      "19 May 2025",
    ],
    [
      "HTML & CSS",
      "WD-2025-A",
      "Rohit Kumar",
      "00:48:30",
      "310 MB",
      "18 May 2025",
    ],
  ],
};
export default function ClassRecordings({ profile }) {
  return (
    <AdminSectionPage module={liveClassModule} page={page} profile={profile} />
  );
}
