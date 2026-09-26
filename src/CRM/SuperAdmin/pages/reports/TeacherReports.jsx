import AdminSectionPage from "../../components/AdminSectionPage";
import { reportModule } from "../../data/adminModules";

const page = {
  title: "Teacher Reports",
  description: "Review faculty workload, attendance and performance.",
  actionLabel: "Generate Teacher Report",
  filters: ["All Departments", "All Teachers", "This Month"],
  columns: [
    "Report",
    "Department",
    "Teachers",
    "Period",
    "Generated On",
    "Status",
  ],
  rows: [
    [
      "Teacher Performance",
      "All Departments",
      "68",
      "May 2025",
      "20 May 2025",
      "Completed",
    ],
    [
      "Faculty Workload",
      "All Departments",
      "68",
      "May 2025",
      "19 May 2025",
      "Completed",
    ],
    [
      "Teacher Attendance",
      "All Departments",
      "68",
      "May 2025",
      "18 May 2025",
      "Completed",
    ],
  ],
};
export default function TeacherReports({ profile }) {
  return (
    <AdminSectionPage module={reportModule} page={page} profile={profile} />
  );
}
