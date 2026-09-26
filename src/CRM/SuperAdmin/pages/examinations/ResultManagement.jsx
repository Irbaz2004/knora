import AdminSectionPage from "../../components/AdminSectionPage";
import { examinationModule } from "../../data/adminModules";

const page = {
  title: "Result Management",
  description: "Review, approve and publish examination results.",
  actionLabel: "Publish Results",
  filters: ["All Exams", "All Batches", "Result Status"],
  columns: ["Exam", "Batch", "Appeared", "Passed", "Pass %", "Status"],
  rows: [
    ["Mid Term", "AIENG-2025-A", "28", "25", "89.28%", "Published"],
    ["Mid Term", "DS-2025-A", "26", "22", "84.61%", "Pending"],
    ["Mid Term", "WD-2025-A", "30", "27", "90.00%", "Published"],
  ],
};
export default function ResultManagement({ profile }) {
  return (
    <AdminSectionPage
      module={examinationModule}
      page={page}
      profile={profile}
    />
  );
}
