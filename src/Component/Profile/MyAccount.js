import React, { useState } from "react";

const AccountSettings = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    region: "",
    nationality: "",
    subLocation: "",
    country: "",
    postalCode: "",
  });

  // Options for dropdowns
  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  const maritalStatusOptions = [
    { value: "", label: "Select Marital Status" },
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
    { value: "separated", label: "Separated" },
  ];

  const countryOptions = [
    { value: "", label: "Select Country" },
    { value: "Tz", label: "Tanzania" },
    { value: "Ky", label: "Kenya" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "in", label: "India" },
    { value: "jp", label: "Japan" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
  ];

  const regionOptions = [
    { value: "", label: "Select Region" },
    { value: "Dodoma", label: "Dodoma" },
    { value: "arusha", label: "Arusha" },
    { value: "Mwanza", label: "Mwanza" },
    { value: "Mbeya", label: "Mbeya" },
    { value: "Tanga", label: "Tanga" },
    { value: "Iringa", label: "Iringa" },
  ];

  const nationalityOptions = [
    { value: "", label: "Select Nationality" },
    { value: "american", label: "American" },
    { value: "Tanzanian", label: "Tanzanian" },
    { value: "canadian", label: "Canadian" },
    { value: "australian", label: "Australian" },
    { value: "indian", label: "Indian" },
    { value: "japanese", label: "Japanese" },
    { value: "german", label: "German" },
    { value: "french", label: "French" },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Account settings updated successfully!");
  };

  // Styles
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
    },
    header: {
      fontSize: "1.8rem",
      marginBottom: "0.5rem",
      color: "#2c3e50",
    },
    subtitle: {
      color: "#7f8c8d",
      marginBottom: "1.5rem",
      fontSize: "0.9rem",
    },
    form: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    formColumns: {
      display: "flex",
      gap: "1.5rem",
      marginBottom: "1.5rem",
    },
    column: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.8rem",
    },
    formGroup: {
      marginBottom: "0",
    },
    label: {
      display: "block",
      marginBottom: "0.3rem",
      fontWeight: "600",
      color: "#2c3e50",
      fontSize: "0.9rem",
    },
    input: {
      width: "100%",
      padding: "0.3rem 0.5rem",
      border: "1px solid #ccc",
      borderRadius: "2px",
      fontSize: "0.75rem",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#3498db",
      boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)",
    },
    select: {
      width: "100%",
      padding: "0.3rem 0.5rem",
      border: "1px solid #ccc",
      borderRadius: "2px",
      fontSize: "0.75rem",
      transition: "border-color 0.3s",
      backgroundColor: "white",
    },
    formActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.8rem",
      marginTop: "1rem",
    },
    saveButton: {
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "0.3rem 0.8rem",
      borderRadius: "3px",
      fontSize: "0.75rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },

    cancelButton: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      padding: "0.3rem 0.8rem",
      borderRadius: "3px",
      fontSize: "0.75rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },

    "@media (max-width: 768px)": {
      formColumns: {
        flexDirection: "column",
        gap: "0.8rem",
      },
      formActions: {
        justifyContent: "center",
      },
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Account Settings</h2>

        <div style={styles.formColumns}>
          {/* Left Column */}
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label htmlFor="firstName" style={styles.label}>
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First name"
                style={styles.input}
                onFocus={(e) =>
                  (e.target.style = { ...styles.input, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.input)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="middleName" style={styles.label}>
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle name"
                style={styles.input}
                onFocus={(e) =>
                  (e.target.style = { ...styles.input, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.input)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="lastName" style={styles.label}>
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last name"
                style={styles.input}
                onFocus={(e) =>
                  (e.target.style = { ...styles.input, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.input)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="gender" style={styles.label}>
                Gender*
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={styles.select}
                onFocus={(e) =>
                  (e.target.style = { ...styles.select, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.select)}
              >
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="maritalStatus" style={styles.label}>
                Marital Status
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) =>
                  (e.target.style = { ...styles.select, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.select)}
              >
                {maritalStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label htmlFor="dateOfBirth" style={styles.label}>
                Date of Birth*
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) =>
                  (e.target.style = { ...styles.input, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.input)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="country" style={styles.label}>
                Country*
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                style={styles.select}
                onFocus={(e) =>
                  (e.target.style = { ...styles.select, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.select)}
              >
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="nationality" style={styles.label}>
                Nationality*
              </label>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                style={styles.select}
                onFocus={(e) =>
                  (e.target.style = { ...styles.select, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.select)}
              >
                {nationalityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="region" style={styles.label}>
                Region*
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
                style={styles.select}
                onFocus={(e) =>
                  (e.target.style = { ...styles.select, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.select)}
              >
                {regionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="subLocation" style={styles.label}>
                Sub Location
              </label>
              <input
                type="text"
                id="subLocation"
                name="subLocation"
                value={formData.subLocation}
                onChange={handleChange}
                placeholder="Sub location"
                style={styles.input}
                onFocus={(e) =>
                  (e.target.style = { ...styles.input, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.input)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="postalCode" style={styles.label}>
                Postal Code*
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                placeholder="Postal code"
                style={styles.input}
                onFocus={(e) =>
                  (e.target.style = { ...styles.input, ...styles.inputFocus })
                }
                onBlur={(e) => (e.target.style = styles.input)}
              />
            </div>
          </div>
        </div>

        <div style={styles.formActions}>
          <button type="submit" style={styles.saveButton}>
            Save Changes
          </button>
          <button type="button" style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
