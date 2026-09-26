import AdminSectionPage from "../../components/AdminSectionPage";
import { attendanceModule } from "../../data/adminModules";

const page = {
  title: "Attendance Settings",
  description: "Configure attendance rules, timings and notifications.",
  actionLabel: "Add Rule",
  filters: ["All Rules", "Student / Teacher", "Active"],
  columns: [
    "Setting",
    "Applies To",
    "Value",
    "Updated By",
    "Updated On",
    "Status",
  ],
  rows: [
    [
      "Late Arrival Grace",
      "Students",
      "15 Minutes",
      "Admin",
      "18 May 2025",
      "Active",
    ],
    ["Minimum Attendance", "Students", "75%", "Admin", "15 May 2025", "Active"],
    [
      "Teacher Work Hours",
      "Teachers",
      "8 Hours",
      "Admin",
      "10 May 2025",
      "Active",
    ],
  ],
};
export default function AttendanceSettings({ profile }) {
  return (
    <AdminSectionPage module={attendanceModule} page={page} profile={profile} />
  );
}
