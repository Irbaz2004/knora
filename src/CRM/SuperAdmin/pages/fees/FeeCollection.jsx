import AdminSectionPage from "../../components/AdminSectionPage";
import { feeModule } from "../../data/adminModules";

const page = {
  title: "Fee Collection",
  description: "Record and track student fee payments.",
  actionLabel: "Collect Fee",
  filters: ["All Batches", "Payment Mode", "Today"],
  columns: ["Student", "Batch", "Amount", "Payment Mode", "Receipt", "Status"],
  rows: [
    [
      "Ayesha Malik",
      "AIENG-2025-A",
      "₹25,000",
      "UPI",
      "#RCPT12548",
      "Completed",
    ],
    ["Rohan Mehta", "DS-2025-A", "₹23,333", "Card", "#RCPT12547", "Completed"],
    [
      "Sana Patel",
      "WD-2025-A",
      "₹30,000",
      "Net Banking",
      "#RCPT12546",
      "Completed",
    ],
  ],
};
export default function FeeCollection({ profile }) {
  return <AdminSectionPage module={feeModule} page={page} profile={profile} />;
}
