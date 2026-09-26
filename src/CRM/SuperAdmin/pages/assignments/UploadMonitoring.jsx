import AdminSectionPage from "../../components/AdminSectionPage";
import { assignmentModule } from "../../data/adminModules";

const page = {
  title: "Upload Monitoring",
  description: "Review upload quality, compliance and pending items.",
  actionLabel: "Review Pending",
  filters: ["All Teachers", "All Types", "Needs Review"],
  columns: ["Upload", "Teacher", "Type", "Submitted On", "Issue", "Status"],
  rows: [
    [
      "Statistics Problems",
      "Sarah Patel",
      "Assignment",
      "19 May 2025",
      "Awaiting review",
      "Pending Review",
    ],
    [
      "Network Security Notes",
      "Rohit Kumar",
      "Study Material",
      "18 May 2025",
      "Missing metadata",
      "Pending Review",
    ],
    [
      "Python Quiz",
      "Dr. Daniel Thomas",
      "Assignment",
      "18 May 2025",
      "–",
      "Published",
    ],
  ],
};
export default function UploadMonitoring({ profile }) {
  return (
    <AdminSectionPage module={assignmentModule} page={page} profile={profile} />
  );
}
