import moment from "moment";

export const sanitizeFileName = (name) =>
  name
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "");

export const formatMY = (d) => {
  const m = moment(d);
  return m.isValid() && m.format("MMM YYYY");
};
