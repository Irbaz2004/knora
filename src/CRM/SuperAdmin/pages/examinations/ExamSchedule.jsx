import AdminSectionPage from "../../components/AdminSectionPage";
import { examinationModule } from "../../data/adminModules";

const page = {
  title: "Exam Schedule",
  description: "Create and manage upcoming examination schedules.",
  actionLabel: "Create Exam",
  filters: ["All Batches", "All Subjects", "This Month"],
  columns: ["Date & Time", "Exam", "Batch", "Subject", "Duration", "Venue"],
  rows: [
    [
      "22 May · 09:00 AM",
      "Mid Term",
      "AIENG-2025-A",
      "Python",
      "3 Hrs",
      "Hall 1",
    ],
    [
      "23 May · 09:00 AM",
      "Mid Term",
      "DS-2025-A",
      "Statistics",
      "3 Hrs",
      "Hall 2",
    ],
    [
      "24 May · 02:00 PM",
      "Mid Term",
      "WD-2025-A",
      "HTML & CSS",
      "2 Hrs",
      "Lab 1",
    ],
  ],
};
export default function ExamSchedule({ profile }) {
  return (
    <AdminSectionPage
      module={examinationModule}
      page={page}
      profile={profile}
    />
  );
}
