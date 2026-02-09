// src/utils/delay.js

/**
 * Simple delay helper
 * @param {number} ms - Time to wait in milliseconds
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
