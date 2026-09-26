import AdminSectionPage from "../../components/AdminSectionPage";
import { feeModule } from "../../data/adminModules";

const page = {
  title: "Pending Fees",
  description: "Track pending and overdue student payments.",
  actionLabel: "Send Reminder",
  filters: ["All Batches", "Pending / Overdue", "Due Date"],
  columns: ["Student", "Batch", "Total Due", "Overdue", "Due Date", "Status"],
  rows: [
    ["Ayesha Malik", "AIENG-2025-A", "₹25,000", "₹0", "10 Jun 2025", "Pending"],
    ["Rohan Mehta", "DS-2025-A", "₹23,334", "₹8,000", "10 May 2025", "Pending"],
    ["Sana Patel", "WD-2025-A", "₹30,000", "₹0", "10 Jun 2025", "Pending"],
  ],
};
export default function PendingFees({ profile }) {
  return <AdminSectionPage module={feeModule} page={page} profile={profile} />;
}
