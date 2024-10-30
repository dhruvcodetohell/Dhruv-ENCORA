import content from "../assets/content.json";

/**
 * Custom hook to provide localized or customizable content.
 * Loads content from a JSON file.
 */
export const useContent = () => {
  return content;
};
