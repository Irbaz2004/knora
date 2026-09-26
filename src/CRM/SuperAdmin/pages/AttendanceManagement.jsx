import AdminSectionPage from "../components/AdminSectionPage";
import { attendanceModule } from "../data/adminModules";

const page = {
  title: "Student Attendance",
  description: "Review and mark daily attendance across courses and batches.",
  actionLabel: "Mark Attendance",
  filters: ["All Batches", "All Courses", "All Subjects"],
  columns: [
    "Student Name",
    "Roll Number",
    "Batch",
    "Course",
    "Status",
    "Remarks",
  ],
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
    [
      "Sana Patel",
      "STU1003",
      "FSD-2025-A",
      "Full Stack Developer",
      "Present",
      "–",
    ],
    [
      "Arjun Kumar",
      "STU1004",
      "CS-2025-A",
      "Cyber Security",
      "Late",
      "Reached at 09:30 AM",
    ],
    ["Neha Sharma", "STU1005", "DS-2025-A", "Data Science", "Present", "–"],
  ],
  cards: ["Attendance Reports", "Top Batches", "Attendance Settings"],
};

export default function AttendanceManagement({ profile }) {
  return (
    <AdminSectionPage module={attendanceModule} page={page} profile={profile} />
  );
}
