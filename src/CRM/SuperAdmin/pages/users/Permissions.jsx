import AdminSectionPage from "../../components/AdminSectionPage";
import { userModule } from "../../data/adminModules";

const page = {
  title: "Permissions",
  description: "Manage module-level permissions assigned to roles.",
  actionLabel: "Add Permission",
  filters: ["All Modules", "All Roles", "Permission Type"],
  columns: ["Permission", "Module", "Roles", "Type", "Updated On", "Status"],
  rows: [
    [
      "students.manage",
      "Student Management",
      "3",
      "Write",
      "20 May 2025",
      "Active",
    ],
    ["attendance.view", "Attendance", "5", "Read", "18 May 2025", "Active"],
    ["fees.manage", "Fee Management", "2", "Write", "16 May 2025", "Active"],
  ],
};
export default function Permissions({ profile }) {
  return <AdminSectionPage module={userModule} page={page} profile={profile} />;
}
