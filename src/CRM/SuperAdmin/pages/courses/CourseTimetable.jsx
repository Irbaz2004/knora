import AdminSectionPage from "../../components/AdminSectionPage";
import { courseModule } from "../../data/adminModules";

const page = {
  title: "Course Timetable",
  description: "Review course and batch-wise class schedules.",
  actionLabel: "Create Schedule",
  filters: ["All Courses", "All Batches", "This Week"],
  columns: ["Time", "Batch", "Subject", "Teacher", "Room", "Day"],
  rows: [
    [
      "09:00 - 10:00",
      "AIENG-2025-A",
      "Python Programming",
      "Dr. Daniel Thomas",
      "Lab 1",
      "Monday",
    ],
    [
      "10:15 - 11:15",
      "DS-2025-A",
      "Statistics",
      "Sarah Patel",
      "Room 3",
      "Monday",
    ],
    [
      "11:30 - 12:30",
      "WD-2025-A",
      "HTML & CSS",
      "Rohit Kumar",
      "Lab 2",
      "Monday",
    ],
  ],
};
export default function CourseTimetable({ profile }) {
  return (
    <AdminSectionPage module={courseModule} page={page} profile={profile} />
  );
}
