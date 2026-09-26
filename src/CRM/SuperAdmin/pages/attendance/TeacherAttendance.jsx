import AdminSectionPage from "../../components/AdminSectionPage";
import { attendanceModule } from "../../data/adminModules";

const page = {
  title: "Teacher Attendance",
  description: "Track faculty attendance, work hours and leave.",
  actionLabel: "Mark Teacher Attendance",
  filters: ["All Departments", "20 May 2025", "All Status"],
  columns: [
    "Teacher",
    "Department",
    "Check In",
    "Check Out",
    "Work Hours",
    "Status",
  ],
  rows: [
    [
      "Dr. Daniel Thomas",
      "Computer Science",
      "08:55 AM",
      "05:10 PM",
      "8h 15m",
      "Present",
    ],
    [
      "Sarah Patel",
      "Data Science",
      "09:04 AM",
      "05:00 PM",
      "7h 56m",
      "Present",
    ],
    ["Neha Sharma", "Mathematics", "–", "–", "–", "On Leave"],
  ],
};
export default function TeacherAttendance({ profile }) {
  return (
    <AdminSectionPage module={attendanceModule} page={page} profile={profile} />
  );
}
