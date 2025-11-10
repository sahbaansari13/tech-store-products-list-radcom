import jalaali from "jalaali-js";

export function countFridaysUntilEndOfJalaaliYear(
  jy: number,
  jm: number,
  jd: number
): number {
  const start = jalaali.toGregorian(jy, jm, jd);
  const startDate = new Date(start.gy, start.gm - 1, start.gd);

  const end = jalaali.toGregorian(
    jy,
    12,
    jalaali.isValidJalaaliDate(jy, 12, 30) ? 30 : 29
  );
  const endDate = new Date(end.gy, end.gm - 1, end.gd);

  let count = 0;
  const current = new Date(startDate);

  current.setDate(current.getDate() + 1);

  while (current <= endDate) {
    if (current.getDay() === 5) count++;
    current.setDate(current.getDate() + 1);
  }

  return count;
}
