/**
 * Fills a numeric list with zeros until it's length is equal to a given number. If it's larger than that number, trims it.
 * @param list a numeric list to adjust
 * @param fixedLength the desired list length
 * @returns a numeric list
 */
export const fixListLength = (
  list: number[],
  fixedLength: number,
): number[] => {
  if (list.length < fixedLength) {
    return list.concat(Array(fixedLength - list.length).fill(0));
  } else if (list.length > fixedLength) {
    return list.slice(0, fixedLength);
  }
  return list;
};
