import AdminSectionPage from "../../components/AdminSectionPage";
import { reportModule } from "../../data/adminModules";

const page = {
  title: "Attendance Reports",
  description: "Analyze attendance across students, teachers and batches.",
  actionLabel: "Generate Attendance Report",
  filters: ["Student / Teacher", "All Batches", "Date Range"],
  columns: ["Report", "Type", "Scope", "Period", "Attendance", "Status"],
  rows: [
    [
      "Monthly Attendance",
      "Student",
      "Institute Wide",
      "May 2025",
      "89.6%",
      "Completed",
    ],
    [
      "Teacher Attendance",
      "Teacher",
      "All Departments",
      "May 2025",
      "94.2%",
      "Completed",
    ],
    [
      "Batch Attendance",
      "Student",
      "AIENG-2025-A",
      "May 2025",
      "92.4%",
      "Completed",
    ],
  ],
};
export default function AttendanceReports({ profile }) {
  return (
    <AdminSectionPage module={reportModule} page={page} profile={profile} />
  );
}
