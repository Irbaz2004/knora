import { useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  LockKeyhole,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import FacultyLayout from "../layouts/FacultyLayout";

export default function FacultyProfile({ profile }) {
  const [editing, setEditing] = useState(false);
  const name = profile?.fullName || "Dr. Ahmed";
  const field = (label, value, wide = false) => (
    <label className={wide ? "wide" : ""}>
      <span>{label}</span>
      <input defaultValue={value} readOnly={!editing} />
    </label>
  );
  return (
    <FacultyLayout
      title="My Profile"
      description="View and update your personal and professional details."
      profile={profile}
    >
      <section className="faculty-profile-card faculty-card">
        <aside className="faculty-profile-summary">
          <div className="faculty-profile-photo">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt={name} />
            ) : (
              <span>{name.charAt(0)}</span>
            )}
            <button aria-label="Change photo">
              <Camera />
            </button>
          </div>
          <h2>{name}</h2>
          <p>Computer Science Faculty</p>
          <em>Teacher</em>
          <ul>
            <li>
              <Mail />
              {profile?.email || "ahmed@knoraacademy.com"}
            </li>
            <li>
              <Phone />
              +91 98765 43210
            </li>
            <li>
              <MapPin />
              Vellore, Tamil Nadu, India
            </li>
            <li>
              <CalendarDays />
              Joined on 15 Aug 2023
            </li>
          </ul>
        </aside>
        <div className="faculty-profile-form">
          <div className="faculty-card-head">
            <h2>Personal Information</h2>
            <button
              className="faculty-outline-button"
              onClick={() => setEditing(!editing)}
            >
              {editing ? <Save /> : <Pencil />}
              {editing ? "Save Profile" : "Edit Profile"}
            </button>
          </div>
          <div className="faculty-form-grid">
            {field("Full Name", name)}
            {field("Employee ID", "TCH-2023-015")}
            {field("Email Address", profile?.email || "ahmed@knoraacademy.com")}
            {field("Phone Number", "+91 98765 43210")}
            {field("Date of Birth", "15 March 1990")}
            {field("Gender", "Male")}
            {field("Qualification", "Ph.D. in Computer Science")}
            {field("Experience", "6 Years")}
            {field("Address", "Vellore, Tamil Nadu, India", true)}
          </div>
        </div>
      </section>
      <section className="faculty-profile-bottom">
        <article className="faculty-card">
          <h2>Professional Information</h2>
          <dl>
            <div>
              <BriefcaseBusiness />
              <dt>Designation</dt>
              <dd>Assistant Professor</dd>
            </div>
            <div>
              <UserRound />
              <dt>Subjects Teaching</dt>
              <dd>Data Structures, Python Programming, DBMS</dd>
            </div>
            <div>
              <CalendarDays />
              <dt>Joining Date</dt>
              <dd>15 August 2023</dd>
            </div>
          </dl>
        </article>
        <article className="faculty-card">
          <h2>Account Information</h2>
          <dl>
            <div>
              <UserRound />
              <dt>Username</dt>
              <dd>ahmed.teacher</dd>
            </div>
            <div>
              <LockKeyhole />
              <dt>Password</dt>
              <dd>
                •••••••••• <button>Change Password</button>
              </dd>
            </div>
            <div>
              <ShieldCheck />
              <dt>Account Status</dt>
              <dd>
                <span className="faculty-status success">Active</span>
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </FacultyLayout>
  );
}
