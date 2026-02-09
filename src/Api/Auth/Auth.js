// Define the base URL
const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function loginUser(email, password) {
  const url = `${API_BASE_URL}auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle structured errors from Laravel
      const message =
        typeof data?.email === "string"
          ? data.email
          : Array.isArray(data?.email)
          ? data.email[0]
          : data?.error || "Login failed";

      throw new Error(message);
    }

    // ✅ This means login was successful, return token
    return data;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
}

export async function registerUser(formData) {
  const url = `${API_BASE_URL}auth/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle validation errors (status code 422)
      if (response.status === 422 && data.errors) {
        // Display each validation error
        for (const [field, messages] of Object.entries(data.errors)) {
          messages.forEach((message) => alert(`Error in ${field}: ${message}`));
        }
      } else {
        // Handle other types of errors
        alert(`Error: ${data.message || "Registration failed"}`);
      }
      return;
    }

    alert("Candidate registered successfully!");
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    alert("Something went wrong while registering. Please try again.");
  }
}
