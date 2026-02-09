import api from "../../lib/axios";

export const jobEmailApplicationApi = async ({
  job_id,
  name,
  phone,
  from,
  notes,
  attachments,
}) => {
  if (!job_id) throw new Error("job_id is required");

  const formData = new FormData();

  // Append all fields
  formData.append("job_id", job_id);
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("from", from);
  formData.append("notes", notes);

  // Append multiple attachments
  if (attachments) {
    const files =
      attachments instanceof FileList
        ? Array.from(attachments)
        : attachments;

    files.forEach((file) => {
      if (file instanceof File) {
        formData.append("attachments[]", file);
      }
    });
  }

  // Axios will set proper multipart headers automatically
  const res = await api.post("/applicant/emailjobApply", formData);

  return res.data;
};
