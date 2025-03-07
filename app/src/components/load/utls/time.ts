/**
 * Distributes a total time duration across multiple segments based on provided weights.
 *
 * This function takes a total time duration and an array of weights, then returns
 * an array of time durations where each duration corresponds proportionally to its weight.
 * The function ensures that all returned durations sum exactly to the total time,
 * handling floating point precision issues and edge cases.
 *
 * @param totalTime - The total time duration to distribute (in ms or any unit)
 * @param weights - Array of weight values (relative proportions)
 * @returns An array of time durations corresponding to the weights
 *
 * @example
 * // Returns [1000, 1000]
 * distributeTime(2000, [0.5, 0.5]);
 *
 * @example
 * // Returns [500, 1000, 1500]
 * distributeTime(3000, [1, 2, 3]);
 */
export function distributeTime(totalTime: number, weights: number[]): number[] {
  // Handle edge cases
  if (totalTime <= 0) return new Array(weights.length).fill(0);

  if (weights.length === 0) return [];

  // Filter out negative or zero weights
  const validWeights = weights.map((w) => Math.max(0, w));

  // If all weights are zero or negative, distribute time equally
  const sumOfWeights = validWeights.reduce((sum, weight) => sum + weight, 0);

  if (sumOfWeights <= 0) {
    const equalShare = Math.floor(totalTime / weights.length);
    const remainder = totalTime - equalShare * weights.length;

    return validWeights.map((_, index) =>
      index < remainder ? equalShare + 1 : equalShare
    );
  }

  // Calculate raw durations based on weights
  const rawDurations = validWeights.map(
    (weight) => (weight / sumOfWeights) * totalTime
  );

  // Initial rounding - we'll use Math.floor to avoid exceeding totalTime
  const roundedDurations = rawDurations.map((duration) => Math.floor(duration));

  // Calculate how much time we have left to distribute due to rounding
  const roundedSum = roundedDurations.reduce(
    (sum, duration) => sum + duration,
    0
  );

  const remaining = totalTime - roundedSum;

  // Initialize the final durations with the rounded values
  const finalDurations = [...roundedDurations];

  // If we have remaining time, distribute it fairly based on original proportions
  if (remaining > 0) {
    // Sort indices by descending fractional part to determine which durations
    // should get the extra milliseconds
    const indices = Array.from({ length: rawDurations.length }, (_, i) => i);

    // Sort by the fractional part to prioritize who gets the extra milliseconds
    indices.sort(
      (a, b) =>
        rawDurations[b] -
        Math.floor(rawDurations[b]) -
        (rawDurations[a] - Math.floor(rawDurations[a]))
    );

    // Distribute the remaining time to the durations with the largest fractional parts
    for (let i = 0; i < remaining; i++) {
      // Use modulo to handle case where remaining > weights.length
      const index = indices[i % indices.length];
      finalDurations[index]++;
    }
  }

  // Verify the sum is exactly the totalTime
  const finalSum = finalDurations.reduce((sum, duration) => sum + duration, 0);

  // This should never happen but is a safety check
  if (finalSum !== totalTime) {
    console.warn("Time distribution calculation error. Adjusting final value.");
    // Adjust the largest duration to ensure exact total
    const maxIndex = finalDurations.findIndex(
      (d) => d === Math.max(...finalDurations)
    );
    finalDurations[maxIndex] += totalTime - finalSum;
  }

  return finalDurations;
}
