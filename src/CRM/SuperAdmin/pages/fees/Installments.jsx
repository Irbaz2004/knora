import AdminSectionPage from "../../components/AdminSectionPage";
import { feeModule } from "../../data/adminModules";

const page = {
  title: "Installments",
  description: "Manage installment schedules and collection progress.",
  actionLabel: "Create Installment",
  filters: ["All Courses", "Due Month", "All Status"],
  columns: [
    "Installment",
    "Due Date",
    "Students",
    "Collected",
    "Pending",
    "Status",
  ],
  rows: [
    [
      "1st Installment",
      "10 May 2025",
      "1,248",
      "₹7,85,000",
      "₹2,35,000",
      "Completed",
    ],
    [
      "2nd Installment",
      "10 Jun 2025",
      "1,102",
      "₹3,75,000",
      "₹2,45,000",
      "In Progress",
    ],
    [
      "3rd Installment",
      "10 Jul 2025",
      "896",
      "₹95,300",
      "₹3,20,700",
      "Upcoming",
    ],
  ],
};
export default function Installments({ profile }) {
  return <AdminSectionPage module={feeModule} page={page} profile={profile} />;
}
