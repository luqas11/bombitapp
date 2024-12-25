/**
 * Parses a time given in seconds to readable mm:ss format.
 * @param time time value in seconds
 * @returns time string in mm:ss format
 */
export const parseTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
};
