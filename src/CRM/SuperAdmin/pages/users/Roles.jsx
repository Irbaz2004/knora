import AdminSectionPage from "../../components/AdminSectionPage";
import { userModule } from "../../data/adminModules";

const page = {
  title: "Roles",
  description: "Create roles and configure their system access.",
  actionLabel: "Add Role",
  filters: ["All Roles", "System / Custom", "Active"],
  columns: ["Role", "Type", "Users", "Permissions", "Updated On", "Status"],
  rows: [
    ["Super Admin", "System", "1", "78", "20 May 2025", "Active"],
    ["Admin", "System", "4", "62", "18 May 2025", "Active"],
    ["Academic Head", "Custom", "2", "48", "16 May 2025", "Active"],
  ],
};
export default function Roles({ profile }) {
  return <AdminSectionPage module={userModule} page={page} profile={profile} />;
}
