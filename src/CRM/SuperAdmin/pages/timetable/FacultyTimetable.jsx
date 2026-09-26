import AdminSectionPage from "../../components/AdminSectionPage";
import { timetableModule } from "../../data/adminModules";

const page = {
  title: "Faculty Timetable",
  description: "View and manage faculty-wise weekly schedules.",
  actionLabel: "Create Faculty Schedule",
  filters: ["All Faculty", "This Week", "All Subjects"],
  columns: ["Day", "Time", "Faculty", "Batch", "Subject", "Room"],
  rows: [
    [
      "Monday",
      "09:00 - 10:00",
      "Dr. Daniel Thomas",
      "AIENG-2025-A",
      "Python",
      "Lab 1",
    ],
    [
      "Tuesday",
      "10:00 - 11:00",
      "Sarah Patel",
      "DS-2025-A",
      "Statistics",
      "Hall 2",
    ],
    [
      "Wednesday",
      "11:15 - 12:15",
      "Rohit Kumar",
      "WD-2025-A",
      "HTML & CSS",
      "Lab 2",
    ],
  ],
};
export default function FacultyTimetable({ profile }) {
  return (
    <AdminSectionPage module={timetableModule} page={page} profile={profile} />
  );
}
