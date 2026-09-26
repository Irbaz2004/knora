import AdminSectionPage from "../components/AdminSectionPage";
import { userModule } from "../data/adminModules";

const page = {
  title: "Admin Users",
  description: "Create, edit and manage administrative users.",
  actionLabel: "Add New User",
  filters: ["All Roles", "All Status", "All Departments"],
  columns: ["User", "Email", "Role", "Status", "Last Login"],
  rows: [
    [
      "Arjun Mehta",
      "arjun.mehta@knoraacademy.com",
      "Super Admin",
      "Active",
      "20 May 2025 10:30 AM",
    ],
    [
      "Dr. Daniel Thomas",
      "daniel.thomas@knoraacademy.com",
      "Admin",
      "Active",
      "20 May 2025 09:15 AM",
    ],
    [
      "Neha Sharma",
      "neha.sharma@knoraacademy.com",
      "Academic Head",
      "Active",
      "19 May 2025 04:45 PM",
    ],
    [
      "Sarah Patel",
      "sarah.patel@knoraacademy.com",
      "Teacher",
      "Active",
      "19 May 2025 02:20 PM",
    ],
  ],
  cards: [
    "Permission Overview",
    "Roles Overview",
    "Manage Permissions",
    "Bulk Import",
  ],
};

export default function UserRoleManagement({ profile }) {
  return <AdminSectionPage module={userModule} page={page} profile={profile} />;
}
