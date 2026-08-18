import { createFileRoute } from "@tanstack/react-router";
import ApplyOnline from "@/pages/ApplyOnline";

export const Route = createFileRoute("/apply-online")({
  component: ApplyOnline,
});
