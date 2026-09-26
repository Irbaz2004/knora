import AdminSectionPage from "../../components/AdminSectionPage";
import { feeModule } from "../../data/adminModules";

const page = {
  title: "Discounts",
  description: "Configure scholarships and student fee discounts.",
  actionLabel: "Add Discount",
  filters: ["All Discount Types", "All Courses", "Active"],
  columns: [
    "Discount",
    "Type",
    "Value",
    "Eligible Students",
    "Valid Until",
    "Status",
  ],
  rows: [
    ["Early Bird", "Percentage", "5%", "186", "31 May 2025", "Active"],
    ["Merit Scholarship", "Percentage", "20%", "42", "31 May 2026", "Active"],
    ["Sibling Discount", "Fixed", "₹5,000", "28", "31 May 2026", "Active"],
  ],
};
export default function Discounts({ profile }) {
  return <AdminSectionPage module={feeModule} page={page} profile={profile} />;
}
