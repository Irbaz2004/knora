import AdminSectionPage from "../../components/AdminSectionPage";
import { courseModule } from "../../data/adminModules";

const page = {
  title: "Semester / Levels",
  description: "Manage semester and level progression structures.",
  actionLabel: "Add Semester / Level",
  filters: ["All Courses", "Level Type", "Active"],
  columns: ["Name", "Type", "Course", "Order", "Subjects", "Status"],
  rows: [
    ["Level 1", "Level", "AI Engineer", "1", "6", "Active"],
    ["Level 2", "Level", "AI Engineer", "2", "7", "Active"],
    ["Semester 1", "Semester", "Data Science", "1", "6", "Active"],
  ],
};
export default function SemesterLevels({ profile }) {
  return (
    <AdminSectionPage module={courseModule} page={page} profile={profile} />
  );
}
