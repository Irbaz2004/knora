import AdminSectionPage from "../../components/AdminSectionPage";
import { courseModule } from "../../data/adminModules";

const page = {
  title: "Courses",
  description: "Create and manage all institute courses.",
  actionLabel: "Add Course",
  filters: ["All Levels", "All Status", "Academic Year"],
  columns: ["Course", "Code", "Duration", "Levels", "Students", "Status"],
  rows: [
    ["AI Engineer", "AIENG", "24 Months", "4", "112", "Active"],
    ["Data Science", "DS", "24 Months", "4", "98", "Active"],
    ["Web Development", "WD", "18 Months", "6", "86", "Active"],
  ],
};
export default function CourseList({ profile }) {
  return (
    <AdminSectionPage module={courseModule} page={page} profile={profile} />
  );
}
