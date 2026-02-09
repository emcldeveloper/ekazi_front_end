import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import html2pdf from "html2pdf.js";
import Template7 from "../../../templates/template7";
import Template2 from "../../../templates/template2";

const DownloadCv = () => {
  const componentRef = useRef();

  const handleDownload = () => {
    const element = componentRef.current;
    const options = {
      margin:       0,
      filename:     "My_CV.pdf",
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: "in", format: "a4", orientation: "portrait" }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="p-3">
      <Button variant="success" onClick={handleDownload} className="mb-3">
        Download CV
      </Button>

      <div ref={componentRef}>
        
        <Template2 />
      </div>
    </div>
  );
};

export default DownloadCv;
