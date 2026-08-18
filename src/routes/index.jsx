import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Knora Academy - Premium AI Education, Reimagined" },
      {
        name: "description",
        content:
          "Knora Academy is a futuristic AI school: expert-led courses in machine learning, deep learning, generative AI and computer vision with hands-on projects.",
      },
      {
        property: "og:title",
        content: "Knora Academy - Premium AI Education, Reimagined",
      },
      {
        property: "og:description",
        content:
          "Learn AI with expert-led courses, hands-on projects, career support and lifetime access. The future learns here.",
      },
    ],
  }),
  component: Home,
});
