import AdminSectionPage from "../components/AdminSectionPage";
import { feeModule } from "../data/adminModules";

const page = {
  title: "Fee Structure",
  description: "Manage class and batch-wise fee structures.",
  actionLabel: "Add Fee Structure",
  filters: ["All Batches", "All Courses", "2025-2026"],
  columns: [
    "Batch",
    "Course",
    "Academic Year",
    "Total Fee",
    "Installments",
    "Discount",
  ],
  rows: [
    [
      "AIENG-2025-A",
      "AI Engineer",
      "2025-2026",
      "₹75,000",
      "3",
      "5% Early Bird",
    ],
    ["DS-2025-A", "Data Science", "2025-2026", "₹70,000", "3", "0%"],
    [
      "WD-2025-A",
      "Web Development",
      "2025-2026",
      "₹60,000",
      "2",
      "10% Scholarship",
    ],
    ["CS-2025-A", "Cyber Security", "2025-2026", "₹80,000", "4", "0%"],
  ],
  cards: [
    "Recent Collections",
    "Installment Summary",
    "Generate Receipt",
    "Payment Reminders",
  ],
};

export default function FeeManagement({ profile }) {
  return <AdminSectionPage module={feeModule} page={page} profile={profile} />;
}
