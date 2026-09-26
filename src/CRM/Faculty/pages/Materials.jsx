import {
  Download,
  Eye,
  File,
  FileText,
  FolderOpen,
  Link2,
  MoreVertical,
  Pencil,
  Search,
  Upload,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FacultyLayout from "../layouts/FacultyLayout";

const materials = [
  [
    FileText,
    "Array and Linked List Notes",
    "PDF",
    "20 May 2025, 10:30 AM",
    "Published",
  ],
  [
    File,
    "Stacks and Queues Presentation",
    "PPT",
    "18 May 2025, 02:15 PM",
    "Published",
  ],
  [
    Video,
    "Tree Data Structure Explained",
    "Video",
    "15 May 2025, 11:45 AM",
    "Published",
  ],
  [
    FileText,
    "Hashing Techniques Notes",
    "PDF",
    "12 May 2025, 09:20 AM",
    "Published",
  ],
  [
    Link2,
    "Data Structures Reference Links",
    "Link",
    "10 May 2025, 04:00 PM",
    "Draft",
  ],
];

export default function FacultyMaterials({ profile, mode = "materials" }) {
  const navigate = useNavigate();
  const pageTitle =
    mode === "assignments"
      ? "My Assignments"
      : mode === "questions"
        ? "Question Bank"
        : "Assignments & Study Materials";
  return (
    <FacultyLayout
      title={pageTitle}
      description="Upload and manage assignments, notes, and files for your subjects."
      profile={profile}
    >
      <div className="faculty-tabs">
        <button
          className={mode === "assignments" ? "active" : ""}
          onClick={() => navigate("/crm/faculty/materials/assignments")}
        >
          <FileText />
          My Assignments
        </button>
        <button
          className={mode === "materials" ? "active" : ""}
          onClick={() => navigate("/crm/faculty/materials")}
        >
          <FolderOpen />
          Study Materials
        </button>
        <button
          className={mode === "questions" ? "active" : ""}
          onClick={() => navigate("/crm/faculty/materials/question-bank")}
        >
          <File />
          Question Bank
        </button>
      </div>
      <section className="faculty-material-stats faculty-card">
        <label>
          <span>Select Subject</span>
          <select>
            <option>Data Structures</option>
          </select>
        </label>
        {[
          [FolderOpen, "Total Materials", "12"],
          [FileText, "Files", "9"],
          [Video, "Videos", "2"],
          [Link2, "Links", "1"],
        ].map(([Icon, l, v]) => (
          <div key={l}>
            <Icon />
            <span>
              <small>{l}</small>
              <strong>{v}</strong>
            </span>
          </div>
        ))}
        <button className="faculty-primary-button">
          <Upload />
          Upload Material
        </button>
      </section>
      <section className="faculty-card faculty-table-card">
        <div className="faculty-card-head">
          <div>
            <h2>{mode === "materials" ? "Study Materials" : pageTitle}</h2>
            <p>Manage and share resources with your students.</p>
          </div>
          <div className="faculty-search">
            <Search />
            <input placeholder="Search materials..." />
            <select>
              <option>All Types</option>
            </select>
          </div>
        </div>
        <div className="faculty-table-wrap">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Uploaded On</th>
                <th>Visibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(([Icon, title, type, date, status]) => (
                <tr key={title}>
                  <td>
                    <Icon className="material-icon" />
                    {title}
                  </td>
                  <td>
                    <span className="faculty-status info">{type}</span>
                  </td>
                  <td>Data Structures</td>
                  <td>{date}</td>
                  <td>
                    <span
                      className={`faculty-status ${status === "Published" ? "success" : "warning"}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="table-actions">
                    <Eye />
                    <Download />
                    <Pencil />
                    <MoreVertical />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="faculty-table-footer">
          <span>Showing 1 to 5 of 12 materials</span>
          <div className="faculty-pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </section>
      <section className="faculty-upload-strip faculty-card">
        <div>
          <h2>Upload New Material</h2>
          <p>
            Share notes, assignments, videos or useful resources with your
            students.
          </p>
        </div>
        <button>
          <FileText />
          <span>
            <strong>Upload File</strong>
            <small>PDF, PPT, DOC, etc.</small>
          </span>
        </button>
        <button>
          <Video />
          <span>
            <strong>Upload Video</strong>
            <small>MP4, WebM, etc.</small>
          </span>
        </button>
        <button>
          <Link2 />
          <span>
            <strong>Add Link</strong>
            <small>YouTube, Drive, etc.</small>
          </span>
        </button>
      </section>
    </FacultyLayout>
  );
}
