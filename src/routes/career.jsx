import { createFileRoute } from "@tanstack/react-router";
import Career from "@/pages/Career";

export const Route = createFileRoute("/career")({
  component: Career,
});
