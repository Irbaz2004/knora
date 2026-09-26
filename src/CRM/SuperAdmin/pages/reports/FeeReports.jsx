import AdminSectionPage from "../../components/AdminSectionPage";
import { reportModule } from "../../data/adminModules";

const page = {
  title: "Fee Reports",
  description: "Review collection, pending and overdue fee reports.",
  actionLabel: "Generate Fee Report",
  filters: ["Academic Year", "All Courses", "This Month"],
  columns: ["Report", "Collected", "Pending", "Overdue", "Period", "Status"],
  rows: [
    [
      "Fee Collection Summary",
      "₹12,45,300",
      "₹6,27,200",
      "₹1,45,600",
      "May 2025",
      "Completed",
    ],
    [
      "Course-wise Collection",
      "₹8,22,000",
      "₹3,18,000",
      "₹72,000",
      "May 2025",
      "Completed",
    ],
    [
      "Pending Fee Report",
      "–",
      "₹6,27,200",
      "₹1,45,600",
      "Current",
      "Completed",
    ],
  ],
};
export default function FeeReports({ profile }) {
  return (
    <AdminSectionPage module={reportModule} page={page} profile={profile} />
  );
}
