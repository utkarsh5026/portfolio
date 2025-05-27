/**
 * Generates an array of unique IDs
 *
 * This function creates an array of a specified length, populating each
 * element with a unique identifier. Uses timestamp + counter for performance.
 *
 */
export const generateArrayWithUniqueIds = (length: number) => {
  const timestamp = Date.now();
  return Array.from({ length }, (_, index) => `${timestamp}-${index}`);
};
