import AdminSectionPage from "../components/AdminSectionPage";
import { examinationModule } from "../data/adminModules";

const page = {
  title: "Upcoming Exam Schedule",
  description: "Plan and monitor upcoming institute examinations.",
  actionLabel: "Create Exam",
  filters: ["All Batches", "All Subjects", "This Month"],
  columns: [
    "Date & Time",
    "Exam Name",
    "Batch",
    "Subject",
    "Duration",
    "Type",
    "Venue",
  ],
  rows: [
    [
      "22 May · 09:00 AM",
      "Mid Term Exam",
      "AIENG-2025-A",
      "Python Programming",
      "3 Hrs",
      "Theory",
      "Hall 1",
    ],
    [
      "23 May · 09:00 AM",
      "Mid Term Exam",
      "DS-2025-A",
      "Statistics",
      "3 Hrs",
      "Theory",
      "Hall 2",
    ],
    [
      "24 May · 02:00 PM",
      "Mid Term Exam",
      "WD-2025-A",
      "HTML & CSS",
      "2 Hrs",
      "Theory",
      "Lab 1",
    ],
    [
      "26 May · 09:00 AM",
      "Mid Term Exam",
      "CS-2025-A",
      "Network Security",
      "3 Hrs",
      "Theory",
      "Hall 3",
    ],
  ],
  cards: ["Marks Entry", "Result Summary", "Recent Results", "Exam Analytics"],
};

export default function ExaminationManagement({ profile }) {
  return (
    <AdminSectionPage
      module={examinationModule}
      page={page}
      profile={profile}
    />
  );
}
