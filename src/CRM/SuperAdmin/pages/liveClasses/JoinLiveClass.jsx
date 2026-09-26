import AdminSectionPage from "../../components/AdminSectionPage";
import { liveClassModule } from "../../data/adminModules";

const page = {
  title: "Join Live Class",
  description: "Open active class rooms and monitor participation.",
  actionLabel: "Start Instant Class",
  filters: ["Live Now", "All Batches", "All Teachers"],
  columns: [
    "Class",
    "Batch",
    "Teacher",
    "Started At",
    "Participants",
    "Status",
  ],
  rows: [
    [
      "Python Programming",
      "AIENG-2025-A",
      "Dr. Daniel Thomas",
      "09:00 AM",
      "26 / 28",
      "Active",
    ],
    ["Statistics", "DS-2025-A", "Sarah Patel", "10:15 AM", "27 / 30", "Active"],
    [
      "HTML & CSS",
      "WD-2025-A",
      "Rohit Kumar",
      "11:30 AM",
      "24 / 29",
      "Upcoming",
    ],
  ],
};
export default function JoinLiveClass({ profile }) {
  return (
    <AdminSectionPage module={liveClassModule} page={page} profile={profile} />
  );
}
