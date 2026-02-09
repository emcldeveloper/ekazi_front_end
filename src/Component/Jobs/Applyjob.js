import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import MatchModalButton from "./JobMatchPercentage";
import {
  useApplicantProfile,
  useApplyJobInternal,
} from "../../hooks/useCandidates";
import { useJobDetail } from "../../hooks/useJobs";
import { useState } from "react";

const CoverLetterForm = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { notes: "" },
  });

  const {
    data: applicant,
    isLoading: loadingProfile,
    error: profileError,
  } = useApplicantProfile();

  const applicantProfile = applicant?.data || [];

  const {
    data: jobDetails,
    isLoading: loadingJob,
    error: jobError,
  } = useJobDetail();

  const { mutate: submitApplication, isPending } = useApplyJobInternal({
    onSuccess: (response) => {
      const successMessage = response?.success;
      const errorMessage = response?.error;

      if (errorMessage) {
        Swal.fire({
          title: "Already Applied",
          text: errorMessage,
          icon: "info",
          confirmButtonText: "OK",
        });
        return;
      }

      Swal.fire({
        title: "Application Sent!",
        text: successMessage,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setShowModal(false);
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.error || "Failed to send application.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const onSubmit = (data) => {
    const applicant_id = localStorage.getItem("applicantId");
    const jobId = localStorage.getItem("jobId");

    const payload = {
      applicant_id,
      jobId,
      notes: data.notes,
    };

    submitApplication(payload);
  };

  if (loadingProfile || loadingJob)
    return <div className="container text-center py-5">Loading...</div>;

  if (profileError || jobError)
    return (
      <div className="container text-center py-5 text-danger">
        {profileError?.message || jobError?.message}
      </div>
    );

  const applicantInfo = applicantProfile?.applicant_profile || [];
  const applicantAddress = applicantProfile?.address || [];

  return (
    <div className="row justify-content-center">
      <div className="col-md-12 col-lg-12">
        <div className="job-header text-center py-2 mb-3">
          <h5 className="text-primary fw-bold border-bottom border-primary pb-2 d-inline-block">
            Cover Letter Application Form
          </h5>
        </div>

        <div className="card rounded-lg">
          <div className="card-header bg-white border-bottom-0 pt-3 px-3">
            {/* Applicant address */}
            <div className="row mb-3">
              <div className="col-12 text-end">
                {applicantInfo.map((item, index) => (
                  <div key={index}>
                    <strong>
                      {item.first_name} {item.last_name}
                    </strong>
                  </div>
                ))}
                {applicantAddress.map((item, index) => (
                  <div key={index}>
                    {item.region_name}, {item.name}
                  </div>
                ))}
                <div className="text-muted small mt-2 text-end">
                  {new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Employer address */}
            <div className="row">
              <div className="col-12">
                {jobDetails?.map((jobItem, i) => (
                  <address key={i}>
                    <strong>{jobItem.client?.client_name}</strong>
                    <strong className="d-block">
                      {jobItem.job_position?.position_name}
                    </strong>
                    <span className="d-block">
                      {jobItem.client?.client_addresses?.region?.region_name}
                    </span>
                    <span className="d-block">
                      {jobItem.client?.client_addresses?.region?.country?.name}
                    </span>
                  </address>
                ))}
              </div>
            </div>

            <p className="mt-2">Dear Sir/Madam,</p>
          </div>

          {/* BODY */}
          <div className="card-body px-3 px-lg-4 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Job REF */}
              <div className="row mb-3">
                <div className="col-12">
                  <div className="job-reference text-center py-2 bg-primary bg-opacity-10 rounded">
                    <h6 className="mb-0 text-primary">
                      REF: APPLICATION FOR THE POST OF
                      {jobDetails?.map((j, i) => (
                        <span key={i} className="d-block mt-1">
                          {j.job_position?.position_name?.toUpperCase()}
                        </span>
                      ))}
                    </h6>
                  </div>
                </div>
              </div>

              {/* Notes (Cover letter body) */}
              <div className="form-group mb-3">
                <textarea
                  className="form-control p-3"
                  placeholder="Write your cover letter here..."
                  {...register("notes", {
                    required: "Cover letter is required",
                  })}
                  style={{
                    minHeight: "200px",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                  }}
                ></textarea>

                {errors.notes && (
                  <small className="text-danger">{errors.notes.message}</small>
                )}
              </div>

              <MatchModalButton
                loading={isPending}
                handleSubmit={handleSubmit(onSubmit)}
                show={showModal}
                setShow={setShowModal}
              />
            </form>
          </div>

          {/* Footer */}
          <div className="card-footer bg-white border-top-0 px-3 px-lg-4 pb-3">
            {applicantInfo.map((item, index) => (
              <div key={index}>
                <div>Thank you</div>
                <div>Regards</div>
                <strong>
                  {item.first_name} {item.last_name}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterForm;
