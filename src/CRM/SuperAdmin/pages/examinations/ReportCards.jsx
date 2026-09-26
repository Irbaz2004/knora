import AdminSectionPage from "../../components/AdminSectionPage";
import { examinationModule } from "../../data/adminModules";

const page = {
  title: "Report Card Generation",
  description: "Generate and distribute student report cards.",
  actionLabel: "Generate Report Cards",
  filters: ["All Exams", "All Batches", "Generation Status"],
  columns: ["Batch", "Exam", "Students", "Generated", "Distributed", "Status"],
  rows: [
    ["AIENG-2025-A", "Mid Term", "28", "28", "28", "Completed"],
    ["DS-2025-A", "Mid Term", "26", "26", "0", "Pending"],
    ["WD-2025-A", "Mid Term", "30", "30", "30", "Completed"],
  ],
};
export default function ReportCards({ profile }) {
  return (
    <AdminSectionPage
      module={examinationModule}
      page={page}
      profile={profile}
    />
  );
}
