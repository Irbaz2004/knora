import AdminSectionPage from "../../components/AdminSectionPage";
import { courseModule } from "../../data/adminModules";

const page = {
  title: "Syllabus",
  description: "Define and maintain course learning content.",
  actionLabel: "Add Syllabus",
  filters: ["All Courses", "All Subjects", "Recently Updated"],
  columns: ["Title", "Course", "Subject", "Version", "Updated On", "Status"],
  rows: [
    [
      "Python Basics",
      "AI Engineer",
      "Python Programming",
      "v2.1",
      "15 May 2025",
      "Published",
    ],
    [
      "Supervised ML",
      "AI Engineer",
      "Machine Learning",
      "v1.4",
      "12 May 2025",
      "Published",
    ],
    [
      "Statistics Basics",
      "Data Science",
      "Statistics",
      "v3.0",
      "10 May 2025",
      "Published",
    ],
  ],
};
export default function Syllabus({ profile }) {
  return (
    <AdminSectionPage module={courseModule} page={page} profile={profile} />
  );
}
