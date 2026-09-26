import AdminSectionPage from "../components/AdminSectionPage";
import { courseModule } from "../data/adminModules";

const page = {
  title: "Courses",
  description: "Create and manage institute courses and their active batches.",
  actionLabel: "Add New Course",
  filters: ["All Courses", "All Batches", "All Years"],
  columns: ["Course Name", "Levels / Semesters", "Batch", "Students", "Status"],
  rows: [
    ["AI Engineer", "4 Levels", "AIENG-2025-A", "28", "Active"],
    ["Data Science", "4 Semesters", "DS-2025-A", "30", "Active"],
    ["Web Development", "6 Levels", "WD-2025-A", "29", "Active"],
    ["Cyber Security", "4 Levels", "CS-2025-A", "27", "Active"],
    ["UI/UX Design", "4 Levels", "UIUX-2025-A", "24", "Upcoming"],
  ],
  cards: ["Subjects", "Recent Syllabus", "Today's Timetable", "Academic Years"],
};

export default function CourseBatchManagement({ profile }) {
  return (
    <AdminSectionPage module={courseModule} page={page} profile={profile} />
  );
}
