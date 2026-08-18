import { createFileRoute } from "@tanstack/react-router";
import TeacherLogin from "@/pages/TeacherLogin";

export const Route = createFileRoute("/teacher-login")({
  component: TeacherLogin,
});
