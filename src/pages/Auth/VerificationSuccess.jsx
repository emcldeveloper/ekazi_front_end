import { useLocation } from "react-router-dom";
import MainLayout1 from "../../layouts/MainLayout1.js";
import { useVerifyAccount } from "../../hooks/useAuth.js";
import { useResendVerification } from "../../hooks/useAuth.js";

export default function VerificationSuccess() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const verifyKey = query.get("key");

  // Query: verify account
  const { data, isLoading, isError, error } = useVerifyAccount(verifyKey);

  // Mutation: resend verification email
  const resendMutation = useResendVerification();

  const handleResend = () => {
    if (!data?.email) return alert("Email missing");
    resendMutation.mutate(data.email, {
      onSuccess: (res) => alert(res.message),
      onError: (err) =>
        alert(err.response?.data?.message || "Failed to resend email"),
    });
  };

  return (
    <MainLayout1>
      <div style={styles.container}>
        {/* Loading */}
        {isLoading && <p>⏳ Verifying your account...</p>}

        {/* Success */}
        {!isLoading && !isError && (
          <>
            <h1 style={styles.title}> Account Verified Successfully!</h1>
            <p style={styles.text}>{data?.message}</p>
            <a href="/" style={styles.button}>
              Go to Login
            </a>
          </>
        )}

        {/* Error */}
        {isError && (
          <>
            <h1 style={{ ...styles.title, color: "#d32f2f" }}>
              ❌ Verification Failed
            </h1>
            <p style={styles.text}>
              {error?.response?.data?.message || "Verification failed."}
            </p>

            <button
              onClick={handleResend}
              style={{ ...styles.button, backgroundColor: "#d32f2f" }}
              disabled={resendMutation.isPending}
            >
              {resendMutation.isPending
                ? "Sending..."
                : "Resend Verification Email"}
            </button>

            <a href="/" style={{ ...styles.button, backgroundColor: "#555" }}>
              Back to Login
            </a>
          </>
        )}
      </div>
    </MainLayout1>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "80px", padding: "20px" },
  title: { fontSize: "28px", fontWeight: "bold", color: "#2e7d32" },
  text: { fontSize: "18px", marginTop: "10px" },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 30px",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2e7d32",
  },
};
