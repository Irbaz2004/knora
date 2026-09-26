import AdminSectionPage from "../components/AdminSectionPage";
import { timetableModule } from "../data/adminModules";

const page = {
  title: "Class Timetable",
  description: "Create and manage timetables for all batches.",
  actionLabel: "Create Timetable",
  filters: ["AIENG-2025-A", "Semester 1", "All Sections"],
  columns: [
    "Time / Day",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  rows: [
    [
      "09:00 - 10:00",
      "Python",
      "Statistics",
      "Python",
      "Web Development",
      "Statistics",
      "N/A",
    ],
    [
      "10:00 - 11:00",
      "Statistics",
      "Python",
      "HTML & CSS",
      "Database",
      "Web Development",
      "N/A",
    ],
    [
      "11:15 - 12:15",
      "HTML & CSS",
      "Database",
      "Statistics",
      "Python",
      "HTML & CSS",
      "N/A",
    ],
    [
      "01:15 - 02:15",
      "Machine Learning",
      "Web Development",
      "Database",
      "HTML & CSS",
      "Machine Learning",
      "N/A",
    ],
  ],
  cards: ["Create Timetable", "Bulk Upload", "Manage Rooms", "Manage Subjects"],
};

export default function TimetableManagement({ profile }) {
  return (
    <AdminSectionPage module={timetableModule} page={page} profile={profile} />
  );
}
