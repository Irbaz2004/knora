import AdminSectionPage from "../components/AdminSectionPage";
import { assignmentModule } from "../data/adminModules";

const page = {
  title: "Recent Uploads",
  description: "Latest assignments and study materials uploaded by teachers.",
  actionLabel: "Review Uploads",
  filters: ["All Subjects", "All Batches", "All Types"],
  columns: [
    "Type",
    "Title",
    "Subject",
    "Teacher",
    "Batch",
    "Uploaded On",
    "Status",
  ],
  rows: [
    [
      "Assignment",
      "Python Functions - Practice Questions",
      "Python",
      "Dr. Daniel Thomas",
      "AIENG-2025-A",
      "20 May 2025",
      "Published",
    ],
    [
      "Study Material",
      "Data Structures Notes",
      "Data Structures",
      "Arjun Mehta",
      "CS-2025-A",
      "20 May 2025",
      "Published",
    ],
    [
      "Assignment",
      "Statistics Chapter 2",
      "Statistics",
      "Sarah Patel",
      "DS-2025-A",
      "19 May 2025",
      "Pending Review",
    ],
    [
      "Study Material",
      "DBMS Normalization",
      "Database",
      "Rohit Kumar",
      "WD-2025-A",
      "19 May 2025",
      "Published",
    ],
  ],
  cards: ["Upload Monitoring", "Top Teachers", "Upload Report", "Guidelines"],
};

export default function AssignmentsStudyMaterials({ profile }) {
  return (
    <AdminSectionPage module={assignmentModule} page={page} profile={profile} />
  );
}
