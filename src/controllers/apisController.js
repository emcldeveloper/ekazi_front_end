import axios from "axios";

export const checkIfExists = async ({ uuid }) => {
  try {
    // Replace the URL with your Laravel API endpoint
    const response = await axios.get(
      `https://api.ekazi.co.tz/api/cv/cv_builder/${uuid}`
    );

    // Assuming the Laravel API returns a JSON response with a boolean `exists` field
    if (response.data.exists) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
