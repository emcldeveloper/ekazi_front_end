import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadCV = async (element, filename = "My_CV.pdf") => {
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true, // ensures images load
    allowTaint: true,
    scrollX: 0,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
};
