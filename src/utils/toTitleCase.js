// Utility function to convert a string to Title Case
const toTitleCase = (str) => {
  return str
    .split(' ')           // Split the string into an array of words
    .map(word =>           // Iterate over each word
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize first letter and make the rest lowercase
    )
    .join(' ');           // Join the words back into a string
};

export default toTitleCase;
