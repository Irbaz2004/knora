import AdminSectionPage from "../../components/AdminSectionPage";
import { assignmentModule } from "../../data/adminModules";

const page = {
  title: "Uploads Overview",
  description: "Monitor the latest assignments and study resources.",
  actionLabel: "Review Uploads",
  filters: ["All Types", "All Subjects", "This Month"],
  columns: ["Type", "Title", "Subject", "Teacher", "Uploaded On", "Status"],
  rows: [
    [
      "Assignment",
      "Python Functions",
      "Python",
      "Dr. Daniel Thomas",
      "20 May 2025",
      "Published",
    ],
    [
      "Study Material",
      "Data Structures Notes",
      "Data Structures",
      "Arjun Mehta",
      "20 May 2025",
      "Published",
    ],
    [
      "Assignment",
      "Statistics Problems",
      "Statistics",
      "Sarah Patel",
      "19 May 2025",
      "Pending Review",
    ],
  ],
};
export default function AssignmentsOverview({ profile }) {
  return (
    <AdminSectionPage module={assignmentModule} page={page} profile={profile} />
  );
}
