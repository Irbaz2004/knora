import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile } from "@/firebase";
import SuperAdminDashboard from "./SuperAdmin/pages/StudentManagement";
import ContentManagement from "./SuperAdmin/pages/ContentManagement";
import FacultyDashboard from "./Faculty/pages/Dashboard";
import StudentDashboard from "./Student/pages/Dashboard";
import "./crm.css";

const roleConfig = {
  superadmin: {
    path: "/crm/superadmin",
    label: "Super Admin",
    Component: SuperAdminDashboard,
  },
  faculty: {
    path: "/crm/faculty",
    label: "Faculty",
    Component: FacultyDashboard,
  },
  student: {
    path: "/crm/student",
    label: "Student",
    Component: StudentDashboard,
  },
};

export default function CrmRouter() {
  const [access, setAccess] = useState(null);

  useEffect(() => {
    if (!auth) {
      window.location.replace("/login");
      return undefined;
    }

    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        sessionStorage.setItem(
          "knora-post-login-path",
          window.location.pathname,
        );
        window.location.replace("/login");
        return;
      }

      const data = await getUserProfile(user.uid);
      const role = String(data?.role ?? "student")
        .replace(/[\s_-]/g, "")
        .toLowerCase();
      const config = roleConfig[role];

      if (!config) {
        window.location.replace("/");
        return;
      }

      if (!window.location.pathname.startsWith(config.path)) {
        window.history.replaceState({}, "", config.path);
      }

      setAccess({
        ...config,
        profile: {
          ...data,
          email: user.email,
          photoURL: user.photoURL,
          role: config.label,
        },
      });
    });
  }, []);

  if (!access) {
    return (
      <div className="crm-loading">
        <span />
        Checking your access…
      </div>
    );
  }

  const { profile } = access;
  const Component =
    access.path === "/crm/superadmin" &&
    window.location.pathname.startsWith("/crm/superadmin/cms")
      ? ContentManagement
      : access.Component;
  return <Component profile={profile} />;
}
