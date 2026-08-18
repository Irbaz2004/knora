import { createFileRoute } from "@tanstack/react-router";
import Placements from "@/pages/Placements";

export const Route = createFileRoute("/placements")({
  component: Placements,
});
