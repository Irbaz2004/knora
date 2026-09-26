import AdminSectionPage from "../../components/AdminSectionPage";
import { examinationModule } from "../../data/adminModules";

const page = {
  title: "Marks Entry Oversight",
  description: "Monitor marks entry completion across examinations.",
  actionLabel: "Open Marks Entry",
  filters: ["All Exams", "All Batches", "Entry Status"],
  columns: ["Exam", "Batch", "Subject", "Students", "Marks Entered", "Status"],
  rows: [
    ["Mid Term", "AIENG-2025-A", "Python", "28", "28 (100%)", "Completed"],
    ["Mid Term", "DS-2025-A", "Statistics", "26", "20 (76.92%)", "In Progress"],
    ["Mid Term", "WD-2025-A", "HTML & CSS", "30", "30 (100%)", "Completed"],
  ],
};
export default function MarksEntry({ profile }) {
  return (
    <AdminSectionPage
      module={examinationModule}
      page={page}
      profile={profile}
    />
  );
}
