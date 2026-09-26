import AdminSectionPage from "../../components/AdminSectionPage";
import { examinationModule } from "../../data/adminModules";

const page = {
  title: "Examination Timetable",
  description: "Arrange exam dates, rooms and invigilators.",
  actionLabel: "Create Timetable",
  filters: ["All Exams", "All Batches", "Date Range"],
  columns: ["Date", "Time", "Subject", "Batch", "Room", "Invigilator"],
  rows: [
    [
      "22 May 2025",
      "09:00 AM",
      "Python",
      "AIENG-2025-A",
      "Hall 1",
      "Sarah Patel",
    ],
    [
      "23 May 2025",
      "09:00 AM",
      "Statistics",
      "DS-2025-A",
      "Hall 2",
      "Rohit Kumar",
    ],
    [
      "24 May 2025",
      "02:00 PM",
      "HTML & CSS",
      "WD-2025-A",
      "Lab 1",
      "Neha Sharma",
    ],
  ],
};
export default function ExamTimetable({ profile }) {
  return (
    <AdminSectionPage
      module={examinationModule}
      page={page}
      profile={profile}
    />
  );
}
