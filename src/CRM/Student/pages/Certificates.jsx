import {
  Award,
  Download,
  Eye,
  GraduationCap,
  Headphones,
  Info,
  ShieldCheck,
} from "lucide-react";
import StudentLayout from "../layouts/StudentLayout";

const requests = [
  [
    "REQ-2025-0001",
    "Bonafide Certificate",
    "Higher Studies",
    "24 May 2025",
    "Approved",
    "26 May 2025",
  ],
  [
    "REQ-2025-0002",
    "Transfer Certificate",
    "Transfer to Another Institute",
    "20 May 2025",
    "Under Review",
    "—",
  ],
  [
    "REQ-2025-0003",
    "Course Completion Certificate",
    "Job Application",
    "18 May 2025",
    "Pending",
    "—",
  ],
  [
    "REQ-2025-0004",
    "Bonafide Certificate",
    "Bank Loan",
    "10 May 2025",
    "Rejected",
    "—",
  ],
  [
    "REQ-2025-0005",
    "Course Completion Certificate",
    "Job Application",
    "02 May 2025",
    "Approved",
    "05 May 2025",
  ],
];
export default function StudentCertificates({ profile, requestsOnly = false }) {
  return (
    <StudentLayout
      title={requestsOnly ? "My Certificate Requests" : "Certificate Requests"}
      description="Dashboard  ›  Certificates  ›  Request Certificate"
      profile={profile}
    >
      {!requestsOnly && (
        <>
          <p className="student-page-description">
            Request official certificates for your academic needs. Our admin
            team will review and issue upon approval.
          </p>
          <section className="student-card certificate-request">
            <header>
              <h2>Request a New Certificate</h2>
              <p>
                Choose the type of certificate you need and submit your request.
              </p>
            </header>
            <div className="certificate-options">
              {[
                [
                  ShieldCheck,
                  "Bonafide Certificate",
                  "Certificate to prove you are a bonafide student of our academy.",
                  "Request Bonafide",
                  "blue",
                ],
                [
                  Award,
                  "Transfer Certificate",
                  "Certificate required for transferring to another institution.",
                  "Request Transfer Certificate",
                  "green",
                ],
                [
                  GraduationCap,
                  "Course Completion Certificate",
                  "Certificate awarded upon successful completion of the course.",
                  "Request Course Completion",
                  "purple",
                ],
              ].map(([Icon, t, d, b, c]) => (
                <article key={t}>
                  <span className={c}>
                    <Icon />
                  </span>
                  <h2>{t}</h2>
                  <p>{d}</p>
                  <button className={`request-${c}`}>{b}</button>
                </article>
              ))}
              <aside>
                <h2>
                  <Info />
                  How it works?
                </h2>
                <ol>
                  <li>
                    Submit your certificate request with required details.
                  </li>
                  <li>Admin will review and approve your request.</li>
                  <li>
                    Certificate will be generated and made available for
                    download.
                  </li>
                </ol>
              </aside>
            </div>
          </section>
        </>
      )}
      <section className="student-card student-section-table">
        <header>
          <div>
            <h2>My Certificate Requests</h2>
            <p>Track the status of all your certificate requests.</p>
          </div>
          <select>
            <option>All Status</option>
          </select>
        </header>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Certificate Type</th>
                <th>Purpose</th>
                <th>Requested On</th>
                <th>Status</th>
                <th>Issued On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r[0]}>
                  {r.slice(0, 4).map((v) => (
                    <td key={v}>{v}</td>
                  ))}
                  <td>
                    <span
                      className={`faculty-status ${r[4] === "Approved" ? "success" : r[4] === "Rejected" ? "danger" : r[4] === "Pending" ? "warning" : "info"}`}
                    >
                      {r[4]}
                    </span>
                  </td>
                  <td>{r[5]}</td>
                  <td>
                    <button className="faculty-outline-button">
                      {r[4] === "Approved" ? (
                        <>
                          <Download />
                          Download
                        </>
                      ) : (
                        <>
                          <Eye />
                          View Details
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="faculty-text-link">View All Requests →</button>
      </section>
      <div className="student-certificate-help">
        <div>
          <strong>Need Certificates for Multiple Purposes?</strong>
          <span>
            Contact our support team for bulk certificate requests or any
            special requirements.
          </span>
        </div>
        <button className="faculty-outline-button">
          <Headphones />
          Contact Support
        </button>
      </div>
    </StudentLayout>
  );
}
