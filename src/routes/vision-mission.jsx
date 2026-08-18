import { createFileRoute } from "@tanstack/react-router";
import VisionMission from "@/pages/VisionMission";

export const Route = createFileRoute("/vision-mission")({
  component: VisionMission,
});
