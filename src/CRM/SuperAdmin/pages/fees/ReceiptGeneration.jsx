import AdminSectionPage from "../../components/AdminSectionPage";
import { feeModule } from "../../data/adminModules";

const page = {
  title: "Receipt Generation",
  description: "Generate, download and resend payment receipts.",
  actionLabel: "Generate Receipt",
  filters: ["All Batches", "Payment Mode", "This Month"],
  columns: [
    "Receipt",
    "Student",
    "Amount",
    "Payment Date",
    "Generated On",
    "Status",
  ],
  rows: [
    [
      "#RCPT12548",
      "Ayesha Malik",
      "₹25,000",
      "20 May 2025",
      "20 May 2025",
      "Completed",
    ],
    [
      "#RCPT12547",
      "Rohan Mehta",
      "₹23,333",
      "20 May 2025",
      "20 May 2025",
      "Completed",
    ],
    [
      "#RCPT12546",
      "Sana Patel",
      "₹30,000",
      "19 May 2025",
      "19 May 2025",
      "Completed",
    ],
  ],
};
export default function ReceiptGeneration({ profile }) {
  return <AdminSectionPage module={feeModule} page={page} profile={profile} />;
}
