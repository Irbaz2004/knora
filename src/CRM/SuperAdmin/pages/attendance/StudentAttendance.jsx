import AdminSectionPage from "../../components/AdminSectionPage";
import { attendanceModule } from "../../data/adminModules";

const page = {
  title: "Student Attendance",
  description: "Mark and review daily student attendance.",
  actionLabel: "Mark Attendance",
  filters: ["All Batches", "All Courses", "20 May 2025"],
  columns: ["Student", "Roll Number", "Batch", "Course", "Status", "Remarks"],
  rows: [
    ["Ayesha Malik", "STU1001", "AIENG-2025-A", "AI Engineer", "Present", "–"],
    [
      "Rohan Mehta",
      "STU1002",
      "DS-2025-A",
      "Data Science",
      "Absent",
      "Medical Leave",
    ],
    ["Sana Patel", "STU1003", "FSD-2025-A", "Full Stack", "Present", "–"],
  ],
};
export default function StudentAttendance({ profile }) {
  return (
    <AdminSectionPage module={attendanceModule} page={page} profile={profile} />
  );
}
