import AdminSectionPage from "../../components/AdminSectionPage";
import { liveClassModule } from "../../data/adminModules";

const page = {
  title: "Live Class Schedule",
  description: "Schedule and manage upcoming online classes.",
  actionLabel: "Schedule Class",
  filters: ["All Batches", "All Platforms", "Upcoming"],
  columns: ["Date & Time", "Batch", "Subject", "Teacher", "Platform", "Status"],
  rows: [
    [
      "20 May · 09:00 AM",
      "AIENG-2025-A",
      "Python",
      "Dr. Daniel Thomas",
      "Zoom",
      "Upcoming",
    ],
    [
      "20 May · 10:15 AM",
      "DS-2025-A",
      "Statistics",
      "Sarah Patel",
      "Google Meet",
      "Upcoming",
    ],
    [
      "21 May · 11:30 AM",
      "WD-2025-A",
      "HTML & CSS",
      "Rohit Kumar",
      "Zoom",
      "Upcoming",
    ],
  ],
};
export default function LiveClassSchedule({ profile }) {
  return (
    <AdminSectionPage module={liveClassModule} page={page} profile={profile} />
  );
}
