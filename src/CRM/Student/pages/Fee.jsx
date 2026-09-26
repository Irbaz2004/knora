import {
  CreditCard,
  Download,
  IndianRupee,
  LockKeyhole,
  QrCode,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";

const history = [
  [
    "05 May 2025",
    "TXN1234567890",
    "Tuition Fee – Apr 2025",
    "5,000",
    "UPI (PhonePe)",
  ],
  [
    "05 Apr 2025",
    "TXN1234567889",
    "Course Fee – Apr 2025",
    "3,000",
    "Credit Card",
  ],
  [
    "05 Mar 2025",
    "TXN1234567888",
    "Tuition Fee – Mar 2025",
    "5,000",
    "Net Banking (HDFC)",
  ],
  [
    "05 Feb 2025",
    "TXN1234567887",
    "Course Fee – Mar 2025",
    "3,000",
    "UPI (Google Pay)",
  ],
];
export default function StudentFee({ profile, mode = "pay" }) {
  const navigate = useNavigate();
  return (
    <StudentLayout
      title="Fee"
      description="Dashboard  ›  Fee"
      profile={profile}
    >
      <section className="student-fee-overview">
        <article className="student-card">
          <h2>Fee Overview</h2>
          <p>Stay on top of your payments and dues.</p>
          <div>
            <span>
              Total Fee<strong>₹ 24,000</strong>
            </span>
            <span>
              Paid Amount<strong className="green-text">₹ 16,000</strong>
            </span>
            <span>
              Pending Amount<strong className="red-text">₹ 8,000</strong>
            </span>
          </div>
          <footer>
            Next Due Date <strong>10 June 2025</strong>
            <button className="faculty-primary-button">Pay Now ›</button>
          </footer>
        </article>
        <article className="student-card outstanding">
          <h2>Outstanding Balance</h2>
          <p>You have 2 pending payment(s)</p>
          <strong>₹ 8,000</strong>
          <div>
            <span>
              Tuition Fee – May 2025 <b>₹ 5,000</b>
              <em>Overdue</em>
            </span>
            <span>
              Course Fee – May 2025 <b>₹ 3,000</b>
              <em>Due Soon</em>
            </span>
          </div>
          <button className="faculty-primary-button">
            Pay Outstanding Fees
          </button>
        </article>
      </section>
      <div className="student-tabs">
        <button
          className={mode === "pay" ? "active" : ""}
          onClick={() => navigate("/crm/student/fee")}
        >
          Pay Fee
        </button>
        <button
          className={mode === "history" ? "active" : ""}
          onClick={() => navigate("/crm/student/fee/history")}
        >
          Payment History
        </button>
        <button
          className={mode === "receipts" ? "active" : ""}
          onClick={() => navigate("/crm/student/fee/receipts")}
        >
          Receipts
        </button>
      </div>
      {mode === "pay" && (
        <section className="student-payment-grid">
          <article className="student-card payment-box">
            <h2>Pay Fee Online</h2>
            <p>Choose a payment method and pay your fee securely.</p>
            <h3>Select Fee Type</h3>
            <div className="fee-options">
              <button className="active">
                ◉ Tuition Fee – May 2025<small>₹ 5,000</small>
              </button>
              <button>
                ○ Course Fee – May 2025<small>₹ 3,000</small>
              </button>
              <button>
                ○ Other / Custom Amount<small>Enter amount</small>
              </button>
            </div>
            <h3>Payment Methods</h3>
            <div className="payment-options">
              <button className="active">
                <QrCode />
                UPI / QR Code
              </button>
              <button>
                <CreditCard />
                Debit / Credit Card
              </button>
              <button>
                <IndianRupee />
                Net Banking
              </button>
              <button>
                <Wallet />
                Wallets
              </button>
            </div>
            <footer>
              <span>
                Amount to Pay<strong>₹ 5,000</strong>
              </span>
              <button className="faculty-primary-button">
                Proceed to Pay <LockKeyhole />
              </button>
            </footer>
          </article>
          <article className="student-card fee-structure">
            <header>
              <div>
                <h2>Fee Structure</h2>
                <p>Academic Year 2024 – 25</p>
              </div>
              <button className="faculty-outline-button">
                <Download />
                Download Structure
              </button>
            </header>
            {[
              ["Tuition Fee (Annual)", "20,000"],
              ["Course Fee", "10,000"],
              ["Study Material Fee", "2,000"],
              ["Total Fee", "32,000"],
              ["Total Paid", "16,000"],
              ["Pending Amount", "8,000"],
            ].map((x, i) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <strong
                  className={i === 4 ? "green-text" : i === 5 ? "red-text" : ""}
                >
                  {x[1]}
                </strong>
              </div>
            ))}
          </article>
        </section>
      )}
      <section className="student-card student-section-table">
        <header>
          <div>
            <h2>Payment History</h2>
            <p>View all your payment transactions.</p>
          </div>
        </header>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Payment For</th>
                <th>Amount (₹)</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {history.map((r) => (
                <tr key={r[1]}>
                  {r.map((v) => (
                    <td key={v}>{v}</td>
                  ))}
                  <td>
                    <span className="faculty-status success">Success</span>
                  </td>
                  <td>
                    <button className="faculty-outline-button">
                      <Download />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="faculty-text-link">View All Transactions →</button>
      </section>
    </StudentLayout>
  );
}
