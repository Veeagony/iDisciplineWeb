import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { FaBell, FaCommentDots } from "react-icons/fa";

const Handbook = () => {
  const pdfUrl = "/docs/studenthandbook.pdf"; // Replace with your PDF path

  return (
    <div className="reports-page px-4 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <h4 className="studentsv">Handbook</h4>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className="icon-btn">
            <FaCommentDots size={20} />
          </button>
          <button className="icon-btn">
            <FaBell size={20} />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="pdf-viewer-container" style={{ height: "600px" }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    </div>
  );
};

export default Handbook;
