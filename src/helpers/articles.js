import DOMPurify from "dompurify";

export function htmlPreviewByWords(html, wordLimit = 30) {
  const clean = DOMPurify.sanitize(html);

  const parser = new DOMParser();
  const doc = parser.parseFromString(clean, "text/html");

  let words = 0;
  const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parts = node.textContent.split(/\s+/);

    if (words + parts.length > wordLimit) {
      const allowed = wordLimit - words;
      node.textContent = parts.slice(0, allowed).join(" ") + "…";
      break;
    }

    words += parts.length;
  }

  return doc.body.innerHTML;
}
