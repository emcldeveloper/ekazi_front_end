// src/utils/dateUtils.js
import { formatDistanceToNow, format } from "date-fns";

/**
 * Converts a date string or object to a "time ago" human-readable format.
 * Example: "3 days ago", "in 2 months"
 */
export function timeAgo(date) {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (e) {
    return "Invalid date";
  }
}

/**
 * Formats a date to something readable like: "May 23, 2025"
 */
export function formatDate(date) {
  try {
    return format(new Date(date), "MMMM d, yyyy");
  } catch (e) {
    return "Invalid date";
  }
}

/**
 * Formats date and time: "May 23, 2025 at 3:45 PM"
 */
export function formatDateTime(date) {
  try {
    return format(new Date(date), "MMMM d, yyyy 'at' h:mm a");
  } catch (e) {
    return "Invalid date";
  }
}
