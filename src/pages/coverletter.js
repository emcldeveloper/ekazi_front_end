import React, { useState } from "react";
import { jsPDF } from "jspdf";

const TailwindCoverLetter = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    yourAddress: "",
    email: "",
    phone: "",
    date: "",
    hiringManagerName: "",
    position: "",
    companyName: "",
    companyAddress: "",
    letterContent: "",
  });

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  
    const marginLeft = 20;
    const marginTop = 20;
    const lineHeight = 10;
    const pageWidth = 210 - marginLeft * 2;
    const pageHeight = 297;
  
    // Position header
    const positionHeader = `RE: APPLICATION FOR ${formData.position.toUpperCase()} POSITION`;
  
    // Prepare the content before the position header
    const content = `
      ${formData.firstName} ${formData.lastName}
      ${formData.yourAddress}
      ${formData.email}
      ${formData.phone}
      ${formData.date}
  
      ${formData.hiringManagerName}
      ${formData.companyName}
      ${formData.companyAddress}
  
      Dear Mr/Mrs ${formData.hiringManagerName},
    `;
  
    const lines = doc.splitTextToSize(content, pageWidth);
  
    let cursorY = marginTop;
  
    // Set font to normal for the content before the position header
    doc.setFont("helvetica", "normal");
    lines.forEach((line) => {
      if (cursorY + lineHeight > pageHeight - marginTop) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += lineHeight;
    });
  
    // Add space after sender info before the recipient's greeting and position header
    cursorY += 2; // Adjust space between sections as needed
  
    // Add position header as bold and underlined
    doc.setFont("helvetica", "bold");
    doc.text(positionHeader, marginLeft, cursorY);
  
    // Add underline for the position header
    const positionHeaderWidth = doc.getTextWidth(positionHeader);
    doc.setDrawColor(0, 0, 0); // Black color for the line
    doc.line(marginLeft, cursorY + 1, marginLeft + positionHeaderWidth, cursorY + 1); // Underline
  
    cursorY += lineHeight + 2; // Space after position header
  
    // Set font back to normal for the letter content
    doc.setFont("helvetica", "normal");
  
    // Continue with the letter content
    const letterContent = `${formData.letterContent}\n\nSincerely,\n${formData.firstName} ${formData.lastName}`;
    const letterLines = doc.splitTextToSize(letterContent, pageWidth);
  
    letterLines.forEach((line) => {
      if (cursorY + lineHeight > pageHeight - marginTop) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += lineHeight;
    });
  
    doc.save("Cover_Letter_A4.pdf");
  };
  
  

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Cover Letter Creator</h2>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Your Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {["firstName", "lastName", "yourAddress", "email", "phone", "date"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : field === "date" ? "date" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                value={formData[field]}
                onChange={handleInputChange}
                className="p-2 text-sm border rounded-lg w-full focus:ring focus:ring-blue-300"
              />
            ))}
          </div>
        </div>

        {/* Recipient Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Recipient Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {["hiringManagerName", "position", "companyName", "companyAddress"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                value={formData[field]}
                onChange={handleInputChange}
                className="p-2 text-sm border rounded-lg w-full focus:ring focus:ring-blue-300"
              />
            ))}
          </div>
        </div>

        {/* Letter Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Letter Content</h3>
          <textarea
            name="letterContent"
            placeholder="Write your letter here..."
            value={formData.letterContent}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 h-40"
          />
        </div>

        {/* Buttons */}
        <div className="text-center space-x-4">
          <button
            onClick={togglePreview}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {isPreviewVisible ? "Hide Preview" : "Show Preview"}
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Download Cover Letter
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {isPreviewVisible && (
        <div className="w-full max-w-4xl bg-gray-50 shadow-lg rounded-lg p-8 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Cover Letter Preview</h3>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {`${formData.firstName} ${formData.lastName}
${formData.yourAddress}
${formData.email}
${formData.phone}
${formData.date}

${formData.hiringManagerName}
${formData.companyName}
${formData.companyAddress}
                          
Dear Mr/Mrs ${formData.hiringManagerName},
                                              `} 
                        <span className="font-bold underline">
                          {`RE: APPLICATION FOR ${formData.position.toUpperCase()} POSITION`}
                        </span>
                        {`
${formData.letterContent}

Sincerely,
${formData.firstName} ${formData.lastName}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default TailwindCoverLetter;
