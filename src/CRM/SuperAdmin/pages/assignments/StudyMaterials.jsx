import AdminSectionPage from "../../components/AdminSectionPage";
import { assignmentModule } from "../../data/adminModules";

const page = {
  title: "Study Materials",
  description: "Organize notes, videos and learning resources.",
  actionLabel: "Upload Material",
  filters: ["All Courses", "All Subjects", "Resource Type"],
  columns: ["Material", "Type", "Subject", "Teacher", "Size", "Status"],
  rows: [
    [
      "Data Structures Notes",
      "PDF",
      "Data Structures",
      "Arjun Mehta",
      "4.8 MB",
      "Published",
    ],
    [
      "ML Introduction",
      "Video",
      "Machine Learning",
      "Dr. Daniel Thomas",
      "128 MB",
      "Published",
    ],
    [
      "Statistics Formula Sheet",
      "PDF",
      "Statistics",
      "Sarah Patel",
      "2.1 MB",
      "Published",
    ],
  ],
};
export default function StudyMaterials({ profile }) {
  return (
    <AdminSectionPage module={assignmentModule} page={page} profile={profile} />
  );
}
