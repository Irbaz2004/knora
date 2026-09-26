import AdminSectionPage from "../../components/AdminSectionPage";
import { teacherModule } from "../../data/adminModules";

const page = {
  title: "Salary Details",
  description: "Manage teacher salary structure and payment records.",
  actionLabel: "Add Salary Record",
  filters: ["All Departments", "May 2025", "Payment Status"],
  columns: [
    "Teacher",
    "Department",
    "Gross Salary",
    "Deductions",
    "Net Salary",
    "Status",
  ],
  rows: [
    [
      "Dr. Daniel Thomas",
      "Computer Science",
      "₹85,000",
      "₹5,200",
      "₹79,800",
      "Completed",
    ],
    [
      "Sarah Patel",
      "Data Science",
      "₹72,000",
      "₹4,600",
      "₹67,400",
      "Completed",
    ],
    [
      "Rohit Kumar",
      "Information Technology",
      "₹68,000",
      "₹4,200",
      "₹63,800",
      "Pending",
    ],
  ],
};

export default function SalaryDetails({ profile }) {
  return (
    <AdminSectionPage module={teacherModule} page={page} profile={profile} />
  );
}
