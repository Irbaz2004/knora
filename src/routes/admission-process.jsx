import { createFileRoute } from "@tanstack/react-router";
import AdmissionProcess from "@/pages/AdmissionProcess";

export const Route = createFileRoute("/admission-process")({
  component: AdmissionProcess,
});
