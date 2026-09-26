import AdminSectionPage from "../../components/AdminSectionPage";
import { teacherModule } from "../../data/adminModules";

const page = {
  title: "Teacher Profiles",
  description: "View and update faculty profile information.",
  actionLabel: "Add Profile",
  filters: ["All Departments", "All Subjects", "Active"],
  columns: [
    "Teacher",
    "Department",
    "Subject",
    "Experience",
    "Email",
    "Status",
  ],
  rows: [
    [
      "Dr. Daniel Thomas",
      "Computer Science",
      "AI & ML",
      "9 Years",
      "daniel@example.com",
      "Active",
    ],
    [
      "Sarah Patel",
      "Data Science",
      "Statistics",
      "6 Years",
      "sarah@example.com",
      "Active",
    ],
    [
      "Rohit Kumar",
      "Information Technology",
      "Web Development",
      "7 Years",
      "rohit@example.com",
      "Active",
    ],
  ],
};

export default function TeacherProfiles({ profile }) {
  return (
    <AdminSectionPage module={teacherModule} page={page} profile={profile} />
  );
}
