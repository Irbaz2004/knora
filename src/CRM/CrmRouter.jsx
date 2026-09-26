import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { auth, getUserProfile } from "@/firebase";
import SuperAdminDashboard from "./SuperAdmin/pages/Dashboard";
import StudentManagement from "./SuperAdmin/pages/StudentManagement";
import TeacherManagement from "./SuperAdmin/pages/TeacherManagement";
import CourseBatchManagement from "./SuperAdmin/pages/CourseBatchManagement";
import LiveClassManagement from "./SuperAdmin/pages/LiveClassManagement";
import AttendanceManagement from "./SuperAdmin/pages/AttendanceManagement";
import ExaminationManagement from "./SuperAdmin/pages/ExaminationManagement";
import FeeManagement from "./SuperAdmin/pages/FeeManagement";
import AssignmentsStudyMaterials from "./SuperAdmin/pages/AssignmentsStudyMaterials";
import TimetableManagement from "./SuperAdmin/pages/TimetableManagement";
import Reports from "./SuperAdmin/pages/Reports";
import UserRoleManagement from "./SuperAdmin/pages/UserRoleManagement";
import ContentManagement from "./SuperAdmin/pages/ContentManagement";
import CourseRegistrations from "./SuperAdmin/pages/students/CourseRegistrations";
import StudentList from "./SuperAdmin/pages/students/StudentList";
import StudentCourses from "./SuperAdmin/pages/students/StudentCourses";
import TeacherRegistration from "./SuperAdmin/pages/teachers/TeacherRegistration";
import TeacherProfiles from "./SuperAdmin/pages/teachers/TeacherProfiles";
import TeacherAttendancePage from "./SuperAdmin/pages/teachers/TeacherAttendance";
import SalaryDetails from "./SuperAdmin/pages/teachers/SalaryDetails";
import CourseList from "./SuperAdmin/pages/courses/CourseList";
import Subjects from "./SuperAdmin/pages/courses/Subjects";
import Syllabus from "./SuperAdmin/pages/courses/Syllabus";
import AcademicYears from "./SuperAdmin/pages/courses/AcademicYears";
import SemesterLevels from "./SuperAdmin/pages/courses/SemesterLevels";
import BatchManagement from "./SuperAdmin/pages/courses/BatchManagement";
import CourseTimetable from "./SuperAdmin/pages/courses/CourseTimetable";
import LiveClassSchedule from "./SuperAdmin/pages/liveClasses/LiveClassSchedule";
import JoinLiveClass from "./SuperAdmin/pages/liveClasses/JoinLiveClass";
import ClassRecordings from "./SuperAdmin/pages/liveClasses/ClassRecordings";
import ClassReminders from "./SuperAdmin/pages/liveClasses/ClassReminders";
import StudentAttendance from "./SuperAdmin/pages/attendance/StudentAttendance";
import AttendanceTeacherPage from "./SuperAdmin/pages/attendance/TeacherAttendance";
import AttendanceReportsPage from "./SuperAdmin/pages/attendance/AttendanceReports";
import AttendanceSettings from "./SuperAdmin/pages/attendance/AttendanceSettings";
import ExamSchedule from "./SuperAdmin/pages/examinations/ExamSchedule";
import MarksEntry from "./SuperAdmin/pages/examinations/MarksEntry";
import ResultManagement from "./SuperAdmin/pages/examinations/ResultManagement";
import ReportCards from "./SuperAdmin/pages/examinations/ReportCards";
import ExamTimetable from "./SuperAdmin/pages/examinations/ExamTimetable";
import AssignmentsOverview from "./SuperAdmin/pages/assignments/AssignmentsOverview";
import AssignmentList from "./SuperAdmin/pages/assignments/AssignmentList";
import StudyMaterials from "./SuperAdmin/pages/assignments/StudyMaterials";
import UploadMonitoring from "./SuperAdmin/pages/assignments/UploadMonitoring";
import AssignmentReports from "./SuperAdmin/pages/assignments/AssignmentReports";
import FeeStructure from "./SuperAdmin/pages/fees/FeeStructure";
import FeeCollection from "./SuperAdmin/pages/fees/FeeCollection";
import Installments from "./SuperAdmin/pages/fees/Installments";
import Discounts from "./SuperAdmin/pages/fees/Discounts";
import PendingFees from "./SuperAdmin/pages/fees/PendingFees";
import PaymentHistory from "./SuperAdmin/pages/fees/PaymentHistory";
import ReceiptGeneration from "./SuperAdmin/pages/fees/ReceiptGeneration";
import ClassTimetable from "./SuperAdmin/pages/timetable/ClassTimetable";
import FacultyTimetable from "./SuperAdmin/pages/timetable/FacultyTimetable";
import StudentReports from "./SuperAdmin/pages/reports/StudentReports";
import ReportAttendancePage from "./SuperAdmin/pages/reports/AttendanceReports";
import FeeReports from "./SuperAdmin/pages/reports/FeeReports";
import ExamReports from "./SuperAdmin/pages/reports/ExamReports";
import TeacherReports from "./SuperAdmin/pages/reports/TeacherReports";
import AdminUsers from "./SuperAdmin/pages/users/AdminUsers";
import Roles from "./SuperAdmin/pages/users/Roles";
import Permissions from "./SuperAdmin/pages/users/Permissions";
import FacultyDashboard from "./Faculty/pages/Dashboard";
import FacultyProfile from "./Faculty/pages/Profile";
import FacultyBatches from "./Faculty/pages/MyBatches";
import FacultyStudents from "./Faculty/pages/Students";
import FacultyLiveClasses from "./Faculty/pages/LiveClasses";
import FacultyAttendance from "./Faculty/pages/Attendance";
import FacultyMaterials from "./Faculty/pages/Materials";
import FacultyMarksEntry from "./Faculty/pages/MarksEntry";
import FacultyTimetablePage from "./Faculty/pages/Timetable";
import FacultyNotices from "./Faculty/pages/Notices";
import StudentDashboard from "./Student/pages/Dashboard";
import StudentProfile from "./Student/pages/Profile";
import StudentLiveClasses from "./Student/pages/LiveClasses";
import StudentAttendancePage from "./Student/pages/Attendance";
import StudentTimetablePage from "./Student/pages/Timetable";
import StudentMaterialsPage from "./Student/pages/Materials";
import StudentExaminations from "./Student/pages/Examinations";
import StudentFee from "./Student/pages/Fee";
import StudentCertificates from "./Student/pages/Certificates";
import StudentLibrary from "./Student/pages/Library";
import StudentNotices from "./Student/pages/Notices";
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

function SuperAdminRoutes({ profile }) {
  return (
    <Routes>
      <Route index element={<SuperAdminDashboard profile={profile} />} />
      <Route
        path="students"
        element={<StudentManagement profile={profile} />}
      />
      <Route
        path="students/registrations"
        element={<CourseRegistrations profile={profile} />}
      />
      <Route path="students/list" element={<StudentList profile={profile} />} />
      <Route
        path="students/courses"
        element={<StudentCourses profile={profile} />}
      />
      <Route
        path="teachers"
        element={<TeacherManagement profile={profile} />}
      />
      <Route
        path="teachers/registration"
        element={<TeacherRegistration profile={profile} />}
      />
      <Route
        path="teachers/profiles"
        element={<TeacherProfiles profile={profile} />}
      />
      <Route
        path="teachers/attendance"
        element={<TeacherAttendancePage profile={profile} />}
      />
      <Route
        path="teachers/salary"
        element={<SalaryDetails profile={profile} />}
      />
      <Route
        path="courses"
        element={<CourseBatchManagement profile={profile} />}
      />
      <Route path="courses/list" element={<CourseList profile={profile} />} />
      <Route path="courses/subjects" element={<Subjects profile={profile} />} />
      <Route path="courses/syllabus" element={<Syllabus profile={profile} />} />
      <Route
        path="courses/academic-years"
        element={<AcademicYears profile={profile} />}
      />
      <Route
        path="courses/semesters"
        element={<SemesterLevels profile={profile} />}
      />
      <Route
        path="courses/batches"
        element={<BatchManagement profile={profile} />}
      />
      <Route
        path="courses/timetable"
        element={<CourseTimetable profile={profile} />}
      />
      <Route
        path="live-classes"
        element={<LiveClassManagement profile={profile} />}
      />
      <Route
        path="live-classes/schedule"
        element={<LiveClassSchedule profile={profile} />}
      />
      <Route
        path="live-classes/join"
        element={<JoinLiveClass profile={profile} />}
      />
      <Route
        path="live-classes/recordings"
        element={<ClassRecordings profile={profile} />}
      />
      <Route
        path="live-classes/reminders"
        element={<ClassReminders profile={profile} />}
      />
      <Route
        path="attendance"
        element={<AttendanceManagement profile={profile} />}
      />
      <Route
        path="attendance/students"
        element={<StudentAttendance profile={profile} />}
      />
      <Route
        path="attendance/teachers"
        element={<AttendanceTeacherPage profile={profile} />}
      />
      <Route
        path="attendance/reports"
        element={<AttendanceReportsPage profile={profile} />}
      />
      <Route
        path="attendance/settings"
        element={<AttendanceSettings profile={profile} />}
      />
      <Route
        path="examinations"
        element={<ExaminationManagement profile={profile} />}
      />
      <Route
        path="examinations/schedule"
        element={<ExamSchedule profile={profile} />}
      />
      <Route
        path="examinations/marks"
        element={<MarksEntry profile={profile} />}
      />
      <Route
        path="examinations/results"
        element={<ResultManagement profile={profile} />}
      />
      <Route
        path="examinations/report-cards"
        element={<ReportCards profile={profile} />}
      />
      <Route
        path="examinations/timetable"
        element={<ExamTimetable profile={profile} />}
      />
      <Route path="fees" element={<FeeManagement profile={profile} />} />
      <Route
        path="fees/structure"
        element={<FeeStructure profile={profile} />}
      />
      <Route
        path="fees/collection"
        element={<FeeCollection profile={profile} />}
      />
      <Route
        path="fees/installments"
        element={<Installments profile={profile} />}
      />
      <Route path="fees/discounts" element={<Discounts profile={profile} />} />
      <Route path="fees/pending" element={<PendingFees profile={profile} />} />
      <Route
        path="fees/history"
        element={<PaymentHistory profile={profile} />}
      />
      <Route
        path="fees/receipts"
        element={<ReceiptGeneration profile={profile} />}
      />
      <Route
        path="assignments"
        element={<AssignmentsStudyMaterials profile={profile} />}
      />
      <Route
        path="assignments/overview"
        element={<AssignmentsOverview profile={profile} />}
      />
      <Route
        path="assignments/list"
        element={<AssignmentList profile={profile} />}
      />
      <Route
        path="assignments/materials"
        element={<StudyMaterials profile={profile} />}
      />
      <Route
        path="assignments/monitoring"
        element={<UploadMonitoring profile={profile} />}
      />
      <Route
        path="assignments/reports"
        element={<AssignmentReports profile={profile} />}
      />
      <Route
        path="timetable"
        element={<TimetableManagement profile={profile} />}
      />
      <Route
        path="timetable/classes"
        element={<ClassTimetable profile={profile} />}
      />
      <Route
        path="timetable/faculty"
        element={<FacultyTimetable profile={profile} />}
      />
      <Route path="reports" element={<Reports profile={profile} />} />
      <Route
        path="reports/students"
        element={<StudentReports profile={profile} />}
      />
      <Route
        path="reports/attendance"
        element={<ReportAttendancePage profile={profile} />}
      />
      <Route path="reports/fees" element={<FeeReports profile={profile} />} />
      <Route path="reports/exams" element={<ExamReports profile={profile} />} />
      <Route
        path="reports/teachers"
        element={<TeacherReports profile={profile} />}
      />
      <Route path="users" element={<UserRoleManagement profile={profile} />} />
      <Route path="users/admins" element={<AdminUsers profile={profile} />} />
      <Route path="users/roles" element={<Roles profile={profile} />} />
      <Route
        path="users/permissions"
        element={<Permissions profile={profile} />}
      />
      <Route path="cms/*" element={<ContentManagement profile={profile} />} />
      <Route path="*" element={<Navigate to="/crm/superadmin" replace />} />
    </Routes>
  );
}

function FacultyRoutes({ profile }) {
  return (
    <Routes>
      <Route index element={<FacultyDashboard profile={profile} />} />
      <Route path="profile" element={<FacultyProfile profile={profile} />} />
      <Route path="batches" element={<FacultyBatches profile={profile} />} />
      <Route path="students" element={<FacultyStudents profile={profile} />} />
      <Route
        path="live-classes"
        element={<FacultyLiveClasses profile={profile} />}
      />
      <Route
        path="live-classes/recordings"
        element={<FacultyLiveClasses profile={profile} recordingsOnly />}
      />
      <Route
        path="attendance"
        element={<FacultyAttendance profile={profile} />}
      />
      <Route
        path="attendance/students"
        element={<FacultyAttendance profile={profile} mode="students" />}
      />
      <Route
        path="attendance/reports"
        element={<FacultyAttendance profile={profile} mode="reports" />}
      />
      <Route
        path="materials"
        element={<FacultyMaterials profile={profile} />}
      />
      <Route
        path="materials/assignments"
        element={<FacultyMaterials profile={profile} mode="assignments" />}
      />
      <Route
        path="materials/question-bank"
        element={<FacultyMaterials profile={profile} mode="questions" />}
      />
      <Route path="marks" element={<FacultyMarksEntry profile={profile} />} />
      <Route
        path="timetable"
        element={<FacultyTimetablePage profile={profile} />}
      />
      <Route path="notices" element={<FacultyNotices profile={profile} />} />
      <Route path="*" element={<Navigate to="/crm/faculty" replace />} />
    </Routes>
  );
}

function StudentRoutes({ profile }) {
  return (
    <Routes>
      <Route index element={<StudentDashboard profile={profile} />} />
      <Route path="profile" element={<StudentProfile profile={profile} />} />
      <Route
        path="live-classes"
        element={<StudentLiveClasses profile={profile} />}
      />
      <Route
        path="live-classes/recordings"
        element={<StudentLiveClasses profile={profile} recordingsOnly />}
      />
      <Route
        path="attendance"
        element={<StudentAttendancePage profile={profile} />}
      />
      <Route
        path="timetable"
        element={<StudentTimetablePage profile={profile} />}
      />
      <Route
        path="materials"
        element={<StudentMaterialsPage profile={profile} />}
      />
      <Route
        path="materials/assignments"
        element={<StudentMaterialsPage profile={profile} assignmentsOnly />}
      />
      <Route
        path="examinations"
        element={<StudentExaminations profile={profile} />}
      />
      <Route
        path="examinations/report-card"
        element={<StudentExaminations profile={profile} reportOnly />}
      />
      <Route path="fee" element={<StudentFee profile={profile} />} />
      <Route
        path="fee/history"
        element={<StudentFee profile={profile} mode="history" />}
      />
      <Route
        path="fee/receipts"
        element={<StudentFee profile={profile} mode="receipts" />}
      />
      <Route
        path="certificates"
        element={<StudentCertificates profile={profile} />}
      />
      <Route
        path="certificates/requests"
        element={<StudentCertificates profile={profile} requestsOnly />}
      />
      <Route path="library" element={<StudentLibrary profile={profile} />} />
      <Route path="notices" element={<StudentNotices profile={profile} />} />
      <Route path="*" element={<Navigate to="/crm/student" replace />} />
    </Routes>
  );
}

export default function CrmRouter() {
  const [access, setAccess] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const requestedPathRef = useRef(location.pathname);

  useEffect(() => {
    if (!auth) {
      navigate("/login", { replace: true });
      return undefined;
    }

    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        sessionStorage.setItem(
          "knora-post-login-path",
          requestedPathRef.current,
        );
        navigate("/login", { replace: true });
        return;
      }

      const data = await getUserProfile(user.uid);
      const role = String(data?.role ?? "student")
        .replace(/[\s_-]/g, "")
        .toLowerCase();
      const config = roleConfig[role];

      if (!config) {
        navigate("/", { replace: true });
        return;
      }

      if (!requestedPathRef.current.startsWith(config.path)) {
        navigate(config.path, { replace: true });
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
  }, [navigate]);

  if (!access) {
    return (
      <div className="crm-loading">
        <span />
        Checking your access…
      </div>
    );
  }

  const { profile } = access;

  if (access.path === "/crm/superadmin") {
    return (
      <Routes>
        <Route
          path="superadmin/*"
          element={<SuperAdminRoutes profile={profile} />}
        />
        <Route path="*" element={<Navigate to="/crm/superadmin" replace />} />
      </Routes>
    );
  }

  if (access.path === "/crm/faculty") {
    return (
      <Routes>
        <Route path="faculty/*" element={<FacultyRoutes profile={profile} />} />
        <Route path="*" element={<Navigate to="/crm/faculty" replace />} />
      </Routes>
    );
  }

  if (access.path === "/crm/student") {
    return (
      <Routes>
        <Route path="student/*" element={<StudentRoutes profile={profile} />} />
        <Route path="*" element={<Navigate to="/crm/student" replace />} />
      </Routes>
    );
  }

  const Component = access.Component;
  return <Component profile={profile} />;
}
