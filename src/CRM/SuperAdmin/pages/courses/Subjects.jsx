import AdminSectionPage from "../../components/AdminSectionPage";
import { courseModule } from "../../data/adminModules";

const page = {
  title: "Subjects",
  description: "Manage subjects under each course and semester.",
  actionLabel: "Add Subject",
  filters: ["All Courses", "All Levels", "Active"],
  columns: ["Subject", "Code", "Course", "Level", "Credits", "Status"],
  rows: [
    ["Python Programming", "PY101", "AI Engineer", "Level 1", "4", "Active"],
    ["Machine Learning", "ML201", "AI Engineer", "Level 2", "5", "Active"],
    ["Statistics", "ST101", "Data Science", "Semester 1", "4", "Active"],
  ],
};
export default function Subjects({ profile }) {
  return (
    <AdminSectionPage module={courseModule} page={page} profile={profile} />
  );
}
