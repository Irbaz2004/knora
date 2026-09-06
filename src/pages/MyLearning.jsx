import { BookOpenCheck, Clock3, GraduationCap } from "lucide-react";
import CursorEffect from "@/components/CursorEffect";

const learningStats = [
  { label: "Active Courses", value: "0", Icon: GraduationCap },
  { label: "Completed Lessons", value: "0", Icon: BookOpenCheck },
  { label: "Study Hours", value: "0", Icon: Clock3 },
];

export default function MyLearning() {
  return (
    <>
      <CursorEffect />
      <main className="min-h-screen bg-background px-6 py-32 text-foreground sm:px-10 lg:px-20">
        <section className="mx-auto max-w-6xl">
          <span className="hero-badge inline-flex w-fit rounded-full px-4 py-2 text-[0.7rem] font-semibold tracking-[0.2em] text-primary uppercase">
            Student Workspace
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl leading-none font-semibold sm:text-6xl">
            My Learning
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Track your Knora courses, progress, and learning activity from one
            place.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {learningStats.map(({ label, value, Icon }) => (
              <article
                key={label}
                className="rounded-lg border border-border bg-card p-6 text-card-foreground"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {label}
                  </p>
                  <Icon className="size-5 text-primary" />
                </div>
                <strong className="mt-5 block text-4xl font-semibold">
                  {value}
                </strong>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h2 className="text-xl font-semibold">No courses yet</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Enrolled courses and saved lessons will appear here after your
              academy account is connected to course access.
            </p>
            <a
              href="/courses"
              className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Browse Courses
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
