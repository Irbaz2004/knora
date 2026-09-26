import AdminSectionPage from "../../components/AdminSectionPage";
import { reportModule } from "../../data/adminModules";

const page = {
  title: "Exam Reports",
  description: "Analyze exam performance, pass percentage and results.",
  actionLabel: "Generate Exam Report",
  filters: ["All Exams", "All Batches", "Academic Year"],
  columns: ["Report", "Exam", "Students", "Pass %", "Generated On", "Status"],
  rows: [
    [
      "Exam Result Summary",
      "Mid Term",
      "1,248",
      "86.45%",
      "20 May 2025",
      "Completed",
    ],
    [
      "Subject Performance",
      "Mid Term",
      "1,248",
      "82.30%",
      "19 May 2025",
      "Completed",
    ],
    [
      "Batch Performance",
      "Mid Term",
      "1,248",
      "84.72%",
      "18 May 2025",
      "Completed",
    ],
  ],
};
export default function ExamReports({ profile }) {
  return (
    <AdminSectionPage module={reportModule} page={page} profile={profile} />
  );
}
