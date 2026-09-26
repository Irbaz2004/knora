import AdminSectionPage from "../../components/AdminSectionPage";
import { attendanceModule } from "../../data/adminModules";

const page = {
  title: "Attendance Reports",
  description: "Generate institute-wide attendance reports.",
  actionLabel: "Generate Report",
  filters: ["Student / Teacher", "All Batches", "Date Range"],
  columns: ["Report", "Type", "Scope", "Period", "Generated On", "Status"],
  rows: [
    [
      "Daily Attendance Report",
      "Daily",
      "Institute Wide",
      "20 May 2025",
      "20 May 09:30 AM",
      "Completed",
    ],
    [
      "Batch Attendance Report",
      "Daily",
      "All Batches",
      "20 May 2025",
      "20 May 09:30 AM",
      "Completed",
    ],
    [
      "Monthly Summary",
      "Monthly",
      "Institute Wide",
      "May 2025",
      "01 Jun 10:15 AM",
      "Completed",
    ],
  ],
};
export default function AttendanceReports({ profile }) {
  return (
    <AdminSectionPage module={attendanceModule} page={page} profile={profile} />
  );
}
