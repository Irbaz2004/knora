const base = "/crm/superadmin";

const stat = (label, value, meta, tone) => ({ label, value, meta, tone });
const page = (label, path) => ({ label, path });

export const studentModule = {
  title: "Student Management",
  description: "Manage student information, registrations, courses and more.",
  stats: [
    stat("Total Students", "1,248", "All batches", "blue"),
    stat("Pending Registrations", "12", "Awaiting approval", "orange"),
    stat("Active Students", "1,086", "87% of total", "green"),
    stat("New Admissions", "24", "This month", "purple"),
  ],
  pages: [
    page("Course Registrations", `${base}/students/registrations`),
    page("Student List", `${base}/students/list`),
    page("Courses", `${base}/students/courses`),
  ],
};

export const teacherModule = {
  title: "Teacher & Staff Management",
  description: "Manage teacher information, attendance and salary details.",
  stats: [
    stat("Total Teachers", "48", "+5 this month", "blue"),
    stat("Active Teachers", "42", "87.5% of total", "green"),
    stat("Staff Members", "16", "Support staff", "purple"),
    stat("On Leave Today", "3", "Teachers", "orange"),
  ],
  pages: [
    page("Teacher Registration", `${base}/teachers/registration`),
    page("Teacher Profile", `${base}/teachers/profiles`),
    page("Teacher Attendance", `${base}/teachers/attendance`),
    page("Salary Details", `${base}/teachers/salary`),
  ],
};

export const courseModule = {
  title: "Course & Batch Management",
  description: "Manage courses, batches, syllabus, and academic structure.",
  stats: [
    stat("Total Courses", "12", "+2 this month", "blue"),
    stat("Total Subjects", "48", "+6 this month", "green"),
    stat("Total Batches", "24", "+3 this month", "purple"),
    stat("Active Batches", "18", "75% of total", "blue"),
    stat("Academic Year", "2024-2025", "Current year", "orange"),
  ],
  pages: [
    page("Courses", `${base}/courses/list`),
    page("Subjects", `${base}/courses/subjects`),
    page("Syllabus", `${base}/courses/syllabus`),
    page("Academic Year", `${base}/courses/academic-years`),
    page("Semester / Levels", `${base}/courses/semesters`),
    page("Batch Management", `${base}/courses/batches`),
    page("Timetable", `${base}/courses/timetable`),
  ],
};

export const liveClassModule = {
  title: "Live / Online Class Management",
  description:
    "Schedule, conduct and manage live classes, links, recordings and reminders.",
  stats: [
    stat("Total Live Classes", "128", "+18 this month", "blue"),
    stat("Upcoming Classes", "24", "Next 7 days", "green"),
    stat("Completed Classes", "86", "This month", "purple"),
    stat("Total Recordings", "112", "Available", "orange"),
    stat("Reminders Sent", "356", "This month", "pink"),
  ],
  pages: [
    page("Live Class Schedule", `${base}/live-classes/schedule`),
    page("Join Live Class", `${base}/live-classes/join`),
    page("Recordings", `${base}/live-classes/recordings`),
    page("Reminders", `${base}/live-classes/reminders`),
  ],
};

export const attendanceModule = {
  title: "Attendance Management",
  description:
    "View, take and manage student & teacher attendance and reports.",
  stats: [
    stat("Total Students", "1,248", "All batches", "blue"),
    stat("Present Today", "948", "76.0%", "green"),
    stat("Absent Today", "246", "19.7%", "pink"),
    stat("Late Today", "54", "4.3%", "orange"),
    stat("20 May 2025", "Tuesday", "Selected date", "purple"),
  ],
  pages: [
    page("Student Attendance", `${base}/attendance/students`),
    page("Teacher Attendance", `${base}/attendance/teachers`),
    page("Attendance Reports", `${base}/attendance/reports`),
    page("Attendance Settings", `${base}/attendance/settings`),
  ],
};

export const examinationModule = {
  title: "Examination Management",
  description:
    "Manage exams, marks, results and report cards across the institute.",
  stats: [
    stat("Total Exams", "28", "This academic year", "blue"),
    stat("Upcoming Exams", "8", "Next 7 days", "green"),
    stat("Completed Exams", "20", "This academic year", "purple"),
    stat("Marks Entered", "18", "Exams", "orange"),
    stat("Published Results", "16", "Exams", "pink"),
  ],
  pages: [
    page("Exam Schedule", `${base}/examinations/schedule`),
    page("Marks Entry Oversight", `${base}/examinations/marks`),
    page("Result Management", `${base}/examinations/results`),
    page("Report Card Generation", `${base}/examinations/report-cards`),
    page("Timetable", `${base}/examinations/timetable`),
  ],
};

export const assignmentModule = {
  title: "Assignments & Study Materials",
  description:
    "Monitor assignments and study materials uploaded across all subjects.",
  stats: [
    stat("Total Assignments", "186", "This month", "blue"),
    stat("Study Materials", "342", "This month", "green"),
    stat("Total Uploads", "528", "This month", "purple"),
    stat("Active Teachers", "68", "Uploaded this month", "orange"),
    stat("Pending Review", "24", "Needs attention", "pink"),
  ],
  pages: [
    page("Overview", `${base}/assignments/overview`),
    page("Assignments", `${base}/assignments/list`),
    page("Study Materials", `${base}/assignments/materials`),
    page("Upload Monitoring", `${base}/assignments/monitoring`),
    page("Reports", `${base}/assignments/reports`),
  ],
};

export const feeModule = {
  title: "Fee Management",
  description:
    "Manage fee structure, collection, installments, discounts and payment history.",
  stats: [
    stat("Total Students", "1,248", "All batches", "blue"),
    stat("Total Fee", "₹18,72,500", "This month", "green"),
    stat("Collected", "₹12,45,300", "66.46% of total", "purple"),
    stat("Pending Amount", "₹6,27,200", "33.54% of total", "orange"),
    stat("Overdue Amount", "₹1,45,600", "12.12% pending", "pink"),
  ],
  pages: [
    page("Fee Structure", `${base}/fees/structure`),
    page("Fee Collection", `${base}/fees/collection`),
    page("Installments", `${base}/fees/installments`),
    page("Discounts", `${base}/fees/discounts`),
    page("Pending Fees", `${base}/fees/pending`),
    page("Payment History", `${base}/fees/history`),
    page("Receipt Generation", `${base}/fees/receipts`),
  ],
};

export const timetableModule = {
  title: "Timetable Management",
  description:
    "Create and manage class and faculty timetables for the whole institute.",
  stats: [
    stat("Total Timetables", "48", "Across all batches", "blue"),
    stat("Classes / Week", "568", "All batches", "green"),
    stat("Total Faculty", "68", "Active faculty", "purple"),
    stat("Total Rooms", "32", "Available rooms", "orange"),
    stat("Hours / Week", "1,248", "Scheduled hours", "pink"),
  ],
  pages: [
    page("Class Timetable", `${base}/timetable/classes`),
    page("Faculty Timetable", `${base}/timetable/faculty`),
  ],
};

export const reportModule = {
  title: "Reports",
  description: "Generate and view detailed reports across the institute.",
  stats: [
    stat("Total Students", "1,248", "All batches", "blue"),
    stat("Total Teachers", "68", "All departments", "green"),
    stat("Collections", "₹18,72,500", "This month", "purple"),
    stat("Attendance", "89.6%", "Average present", "orange"),
    stat("Exams Completed", "28", "This year", "pink"),
  ],
  pages: [
    page("Student Reports", `${base}/reports/students`),
    page("Attendance Reports", `${base}/reports/attendance`),
    page("Fee Reports", `${base}/reports/fees`),
    page("Exam Reports", `${base}/reports/exams`),
    page("Teacher Reports", `${base}/reports/teachers`),
  ],
};

export const userModule = {
  title: "User & Role Management",
  description:
    "Manage admin users, roles and permissions across the institute.",
  stats: [
    stat("Total Users", "32", "All admin users", "blue"),
    stat("Active Users", "28", "87.5% of users", "green"),
    stat("Total Roles", "6", "System roles", "purple"),
    stat("Permissions", "78", "System permissions", "orange"),
    stat("Locked Users", "2", "Unable to login", "pink"),
  ],
  pages: [
    page("Admin Users", `${base}/users/admins`),
    page("Roles", `${base}/users/roles`),
    page("Permissions", `${base}/users/permissions`),
  ],
};
