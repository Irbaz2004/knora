import AdminSectionPage from "../../components/AdminSectionPage";
import { timetableModule } from "../../data/adminModules";

const page = {
  title: "Class Timetable",
  description: "Create and manage class schedules for all batches.",
  actionLabel: "Create Timetable",
  filters: ["AIENG-2025-A", "Semester 1", "All Sections"],
  columns: ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  rows: [
    [
      "09:00 - 10:00",
      "Python",
      "Statistics",
      "Python",
      "Web Development",
      "Statistics",
    ],
    [
      "10:00 - 11:00",
      "Statistics",
      "Python",
      "HTML & CSS",
      "Database",
      "Web Development",
    ],
    [
      "11:15 - 12:15",
      "HTML & CSS",
      "Database",
      "Statistics",
      "Python",
      "HTML & CSS",
    ],
  ],
};
export default function ClassTimetable({ profile }) {
  return (
    <AdminSectionPage module={timetableModule} page={page} profile={profile} />
  );
}
