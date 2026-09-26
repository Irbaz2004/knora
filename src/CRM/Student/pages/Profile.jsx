import {
  Award,
  Camera,
  ChevronRight,
  Clock3,
  CloudDownload,
  LockKeyhole,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Trophy,
  UserRound,
} from "lucide-react";
import StudentLayout from "../layouts/StudentLayout";

export default function StudentProfile({ profile }) {
  const name = profile?.fullName || "Irbaz Ahmed";
  const info = [
    [
      Mail,
      "Email Address",
      profile?.email || "irbazahmed@email.com",
      "Verified",
    ],
    [Phone, "Phone Number", "+91 98765 43210", "Verified"],
    [MapPin, "Location", "India", null],
    [Award, "Joined On", "10 Jan 2025", null],
    [Clock3, "Time Zone", "Asia/Kolkata (GMT +05:30)", null],
  ];
  return (
    <StudentLayout
      title="My Profile"
      description="Dashboard  ›  My Profile"
      profile={profile}
    >
      <section className="student-profile-top student-card">
        <aside>
          <div className="student-profile-photo">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt={name} />
            ) : (
              <span>{name.charAt(0)}</span>
            )}
            <button>
              <Camera />
            </button>
          </div>
          <h2>{name}</h2>
          <em>Student</em>
          <p>
            Passionate learner focused on building AI & Data Science skills.
          </p>
        </aside>
        <div className="student-profile-info">
          <h2>Profile Information</h2>
          {info.map(([Icon, l, v, b]) => (
            <div key={l}>
              <Icon />
              <span>{l}</span>
              <strong>{v}</strong>
              {b && <em>{b}</em>}
            </div>
          ))}
        </div>
        <aside className="student-quick-actions">
          <h2>Quick Actions</h2>
          {[
            [LockKeyhole, "Change Password", "Update your account password"],
            [Camera, "Update Profile Photo", "Change your profile picture"],
            [CloudDownload, "Download My Data", "Get a copy of your data"],
            [ShieldCheck, "Delete Account", "Permanently delete your account"],
          ].map(([Icon, l, s]) => (
            <button key={l}>
              <Icon />
              <span>
                <strong>{l}</strong>
                <small>{s}</small>
              </span>
              <ChevronRight />
            </button>
          ))}
        </aside>
      </section>
      <section className="student-profile-bottom">
        <article className="student-card">
          <h2>↗ Learning Overview</h2>
          {[
            ["Courses Enrolled", "4"],
            ["Completed Courses", "1"],
            ["Certificates Earned", "2"],
            ["Total Study Time", "28h 15m"],
            ["Average Course Progress", "68%"],
          ].map((x) => (
            <div key={x[0]}>
              <span>{x[0]}</span>
              <strong>{x[1]}</strong>
            </div>
          ))}
          <progress value="68" max="100" />
        </article>
        <article className="student-card">
          <h2>
            <UserRound />
            About Me
          </h2>
          <p>
            I enjoy exploring new technologies and applying them to solve
            real-world problems. Currently, I’m focused on enhancing my
            knowledge in Data Science, Machine Learning, and Generative AI.
          </p>
          <hr />
          <strong>Areas of Interest</strong>
          <div className="student-tags">
            {[
              "Data Science",
              "Machine Learning",
              "Deep Learning",
              "Python",
              "AI Tools",
              "Prompt Engineering",
            ].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <button className="faculty-outline-button">
            <Pencil />
            Edit About Me
          </button>
        </article>
        <article className="student-card">
          <h2>
            <Trophy />
            Recent Achievements
          </h2>
          {[
            ["Python for Data Science", "Certificate Earned", "20 May 2025"],
            ["Machine Learning Basics", "Certificate Earned", "10 May 2025"],
            [
              "7 Days Learning Streak",
              "Keep up the great work!",
              "08 May 2025",
            ],
            ["Course Completion", "Data Analysis with Python", "02 May 2025"],
          ].map((x) => (
            <div className="achievement" key={x[0]}>
              <Award />
              <span>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </span>
              <time>{x[2]}</time>
            </div>
          ))}
          <button className="faculty-outline-button">
            <Award />
            View All Certificates
          </button>
        </article>
      </section>
    </StudentLayout>
  );
}
