import AdminSectionPage from "../../components/AdminSectionPage";
import { feeModule } from "../../data/adminModules";

const page = {
  title: "Fee Structure",
  description: "Manage course and batch-wise fee structures.",
  actionLabel: "Add Fee Structure",
  filters: ["All Courses", "All Batches", "Academic Year"],
  columns: [
    "Batch",
    "Course",
    "Academic Year",
    "Total Fee",
    "Installments",
    "Discount",
  ],
  rows: [
    ["AIENG-2025-A", "AI Engineer", "2025-2026", "₹75,000", "3", "5%"],
    ["DS-2025-A", "Data Science", "2025-2026", "₹70,000", "3", "0%"],
    ["WD-2025-A", "Web Development", "2025-2026", "₹60,000", "2", "10%"],
  ],
};
export default function FeeStructure({ profile }) {
  return <AdminSectionPage module={feeModule} page={page} profile={profile} />;
}
