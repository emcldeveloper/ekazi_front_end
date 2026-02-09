// src/pages/CvPrintPage.jsx
import { useParams } from "react-router-dom";
import { TEMPLATE_MAP } from "./data/templates";

const CvPrintPage = () => {
  const { templateId } = useParams();

  const SelectedTemplate = TEMPLATE_MAP[templateId];

  if (!SelectedTemplate) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h3>Template not found</h3>
      </div>
    );
  }

  return (
    <div
      className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none"
      id="cv-content"
    >
      {/* Page Content */}
      <div className="cv-content">
        <SelectedTemplate />
      </div>

      {/* Enhanced Print Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .break-after-avoid {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          section {
            page-break-inside: avoid;
          }
          
          section.mb-8 {
            page-break-inside: auto;
          }
          
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }
        }
        
        @media screen {
          .cv-content {
            min-height: 297mm;
          }
        }
      `,
        }}
      />
    </div>
  );
};

export default CvPrintPage;
