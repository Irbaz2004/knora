import AdminSectionPage from "../../components/AdminSectionPage";
import { teacherModule } from "../../data/adminModules";

const page = {
  title: "Teacher Registration",
  description: "Add and approve new teaching staff registrations.",
  actionLabel: "Register Teacher",
  filters: ["All Departments", "Registration Status", "This Month"],
  columns: ["Teacher", "Department", "Qualification", "Applied On", "Status"],
  rows: [
    ["Dr. Daniel Thomas", "Computer Science", "Ph.D.", "20 May 2025", "Active"],
    ["Sarah Patel", "Data Science", "M.Tech", "19 May 2025", "Pending"],
    ["Rohit Kumar", "Information Technology", "MCA", "18 May 2025", "Active"],
  ],
};

export default function TeacherRegistration({ profile }) {
  return (
    <AdminSectionPage module={teacherModule} page={page} profile={profile} />
  );
}
