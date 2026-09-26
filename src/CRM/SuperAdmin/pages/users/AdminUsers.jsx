import AdminSectionPage from "../../components/AdminSectionPage";
import { userModule } from "../../data/adminModules";

const page = {
  title: "Admin Users",
  description: "Create, edit and manage administrative users.",
  actionLabel: "Add New User",
  filters: ["All Roles", "All Status", "All Departments"],
  columns: ["User", "Email", "Role", "Status", "Last Login"],
  rows: [
    [
      "Arjun Mehta",
      "arjun@knoraacademy.com",
      "Super Admin",
      "Active",
      "20 May 10:30 AM",
    ],
    [
      "Dr. Daniel Thomas",
      "daniel@knoraacademy.com",
      "Admin",
      "Active",
      "20 May 09:15 AM",
    ],
    [
      "Neha Sharma",
      "neha@knoraacademy.com",
      "Academic Head",
      "Active",
      "19 May 04:45 PM",
    ],
  ],
};
export default function AdminUsers({ profile }) {
  return <AdminSectionPage module={userModule} page={page} profile={profile} />;
}
