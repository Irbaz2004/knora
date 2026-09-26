import AdminSectionPage from "../../components/AdminSectionPage";
import { courseModule } from "../../data/adminModules";

const page = {
  title: "Academic Years",
  description: "Configure academic year dates and current period.",
  actionLabel: "Add Academic Year",
  filters: ["All Years", "All Status", "Current First"],
  columns: [
    "Academic Year",
    "Start Date",
    "End Date",
    "Courses",
    "Batches",
    "Status",
  ],
  rows: [
    ["2025-2026", "01 Jun 2025", "31 May 2026", "12", "24", "Active"],
    ["2024-2025", "01 Jun 2024", "31 May 2025", "10", "21", "Completed"],
    ["2023-2024", "01 Jun 2023", "31 May 2024", "9", "18", "Completed"],
  ],
};
export default function AcademicYears({ profile }) {
  return (
    <AdminSectionPage module={courseModule} page={page} profile={profile} />
  );
}
