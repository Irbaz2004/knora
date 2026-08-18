import { createFileRoute } from "@tanstack/react-router";
import Faculty from "@/pages/Faculty";

export const Route = createFileRoute("/faculty")({
  component: Faculty,
});
