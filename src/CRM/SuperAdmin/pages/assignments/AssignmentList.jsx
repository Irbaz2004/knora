import AdminSectionPage from "../../components/AdminSectionPage";
import { assignmentModule } from "../../data/adminModules";

const page = {
  title: "Assignments",
  description: "View and manage assignments across courses.",
  actionLabel: "Create Assignment",
  filters: ["All Courses", "All Subjects", "All Status"],
  columns: ["Assignment", "Subject", "Teacher", "Batch", "Due Date", "Status"],
  rows: [
    [
      "Python Functions",
      "Python",
      "Dr. Daniel Thomas",
      "AIENG-2025-A",
      "28 May 2025",
      "Published",
    ],
    [
      "Statistics Chapter 2",
      "Statistics",
      "Sarah Patel",
      "DS-2025-A",
      "30 May 2025",
      "Published",
    ],
    [
      "HTML & CSS Project",
      "Web Development",
      "Rohit Kumar",
      "WD-2025-A",
      "02 Jun 2025",
      "Draft",
    ],
  ],
};
export default function AssignmentList({ profile }) {
  return (
    <AdminSectionPage module={assignmentModule} page={page} profile={profile} />
  );
}
