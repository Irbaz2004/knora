import AdminSectionPage from "../../components/AdminSectionPage";
import { feeModule } from "../../data/adminModules";

const page = {
  title: "Payment History",
  description: "View complete student payment transactions.",
  actionLabel: "Import Payments",
  filters: ["All Payment Modes", "All Batches", "Date Range"],
  columns: ["Transaction", "Student", "Amount", "Mode", "Paid On", "Status"],
  rows: [
    ["TXN982145", "Ayesha Malik", "₹25,000", "UPI", "20 May 2025", "Completed"],
    ["TXN982144", "Rohan Mehta", "₹23,333", "Card", "20 May 2025", "Completed"],
    [
      "TXN982143",
      "Sana Patel",
      "₹30,000",
      "Net Banking",
      "19 May 2025",
      "Completed",
    ],
  ],
};
export default function PaymentHistory({ profile }) {
  return <AdminSectionPage module={feeModule} page={page} profile={profile} />;
}
