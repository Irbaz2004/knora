import AdminSectionPage from "../../components/AdminSectionPage";
import { liveClassModule } from "../../data/adminModules";

const page = {
  title: "Class Reminders",
  description: "Configure email, SMS and push class reminders.",
  actionLabel: "Create Reminder",
  filters: ["All Channels", "All Batches", "Enabled"],
  columns: [
    "Reminder",
    "Channel",
    "Audience",
    "Send Before",
    "Last Sent",
    "Status",
  ],
  rows: [
    [
      "Student Email Reminder",
      "Email",
      "Students",
      "1 Hour",
      "20 May 2025",
      "Active",
    ],
    [
      "Student SMS Reminder",
      "SMS",
      "Students",
      "30 Minutes",
      "20 May 2025",
      "Active",
    ],
    ["Teacher Reminder", "Push", "Teachers", "1 Hour", "20 May 2025", "Active"],
  ],
};
export default function ClassReminders({ profile }) {
  return (
    <AdminSectionPage module={liveClassModule} page={page} profile={profile} />
  );
}
