import { createFileRoute } from "@tanstack/react-router";
import EventsNews from "@/pages/EventsNews";

export const Route = createFileRoute("/events-news")({
  component: EventsNews,
});
