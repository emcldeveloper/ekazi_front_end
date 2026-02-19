import { useForm } from "react-hook-form";
import { useBenefits, useCounterOffer } from "../../hooks/useJobs";
import Swal from "sweetalert2";

const CounterOffer = ({
  selectedOffer,
  respondOffer,
  setIsOpenModal,
  setShowRejectOffer,
}) => {
  const { mutateAsync: counterOffer, isPending } = useCounterOffer();
  const { data: benefitsList = [] } = useBenefits();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!selectedOffer) return;

    const result = await Swal.fire({
      title: "Counter Offer?",
      text: "Are you sure you want to counter this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0dcaf0",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Counter",
    });

    if (!result.isConfirmed) return;

    try {
      // Save negotiation terms
      await counterOffer({
        applicant_job_offer_id: selectedOffer?.id,
        benefits: data.benefits ? data.benefits.map((id) => Number(id)) : [],
        working_hour: data.working_hour,
        working_day: data.working_days,
        description: selectedOffer?.description,
        probabition: data.probation_period,
        salary: data.salary,
        creator_id: selectedOffer?.creator_id,
        updator_id: selectedOffer?.updator_id,
        duration: data.duration,
        starting_date: data.starting_date,
      });

      // Update offer status
      await respondOffer({
        id: selectedOffer.id,
        status: "Negotiable",
        reason: "Counter offer",
      });

      await Swal.fire({
        icon: "success",
        title: "Offer Countered",
        text: "Your counter offer has been submitted.",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      setIsOpenModal(false);
      setShowRejectOffer(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 border rounded-3 bg-light"
    >
      <h6 className="fw-semibold text-info mb-3">Propose Counter Offer</h6>

      {/* Salary */}
      <div className="mb-3">
        <label className="form-label">Proposed Salary (TZS) *</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter proposed salary"
          {...register("salary", { required: "Salary is required" })}
        />
        {errors.salary && (
          <small className="text-danger">{errors.salary.message}</small>
        )}
      </div>

      {/* Benefits */}
      <div className="mb-3">
        <label className="form-label">Benefits</label>

        <select multiple className="form-select" {...register("benefits")}>
          {benefitsList.map((benefit) => (
            <option key={benefit.id} value={benefit.id}>
              {benefit.name}
            </option>
          ))}
        </select>

        <small className="text-muted">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple
        </small>
      </div>

      {/* Starting Date */}
      <div className="mb-3">
        <label className="form-label">Starting Date</label>
        <input
          type="date"
          className="form-control"
          {...register("starting_date")}
        />
      </div>

      {/* Duration */}
      <div className="mb-3">
        <label className="form-label">Duration (Months)</label>
        <input
          type="number"
          className="form-control"
          {...register("duration")}
        />
      </div>

      {/* Working Days */}
      <div className="mb-3">
        <label className="form-label">Working Days (Per Week)</label>
        <input
          type="number"
          className="form-control"
          {...register("working_days")}
        />
      </div>

      {/* Working Hours */}
      <div className="mb-3">
        <label className="form-label">Working Hours (Per Day)</label>
        <input
          type="number"
          className="form-control"
          {...register("working_hours")}
        />
      </div>

      {/* Probation */}
      <div className="mb-3">
        <label className="form-label">Probation Period (Months)</label>
        <input
          type="number"
          className="form-control"
          {...register("probation_period")}
        />
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-info text-white"
        >
          {isPending ? "Submitting..." : "Submit Counter Offer"}
        </button>
      </div>
    </form>
  );
};

export default CounterOffer;
