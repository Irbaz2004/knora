import AdminSectionPage from "../components/AdminSectionPage";
import { liveClassModule } from "../data/adminModules";

const page = {
  title: "Live Class Schedule",
  description: "Schedule and manage live classes across the institute.",
  actionLabel: "Schedule Class",
  filters: ["All Batches", "All Platforms", "Upcoming"],
  columns: [
    "Date & Time",
    "Batch",
    "Subject",
    "Teacher",
    "Platform",
    "Link",
    "Status",
  ],
  rows: [
    [
      "20 May · 09:00 AM",
      "AIENG-2025-A",
      "Python Programming",
      "Dr. Daniel Thomas",
      "Zoom",
      "Join ↗",
      "Upcoming",
    ],
    [
      "20 May · 10:15 AM",
      "DS-2025-A",
      "Statistics",
      "Sarah Patel",
      "Google Meet",
      "Join ↗",
      "Upcoming",
    ],
    [
      "21 May · 11:30 AM",
      "WD-2025-A",
      "HTML & CSS",
      "Arjun Mehta",
      "Zoom",
      "Join ↗",
      "Upcoming",
    ],
    [
      "21 May · 01:30 PM",
      "AIENG-2025-B",
      "Machine Learning",
      "Rohit Kumar",
      "Google Meet",
      "Join ↗",
      "Upcoming",
    ],
  ],
  cards: ["Class Recordings", "Upcoming Classes", "Manage Reminders"],
};

export default function LiveClassManagement({ profile }) {
  return (
    <AdminSectionPage module={liveClassModule} page={page} profile={profile} />
  );
}
