import { useForm } from "react-hook-form";
import { useState } from "react";

const PasswordChangeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Replace with real API call
      // await changePasswordAPI(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Password changed successfully!");
      reset();
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to change password. Please try again."
      );
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.currentPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message:
                  "Password must contain uppercase, lowercase, number and special character",
              },
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === newPassword || "Passwords must match",
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
