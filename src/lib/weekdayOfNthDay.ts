import jalaali from "jalaali-js";

export type WeekdayResult = {
  weekdayNumber: number;
  weekdayName: string;
  jalaliMonth: number;
  jalaliDay: number;
  gregorianDate: string;
};

export function getWeekdayOfNthJalaaliDay(
  jy: number,
  dayOfYear: number
): WeekdayResult {
  // کبیسه
  const lastDayOfEsfand = jalaali.isValidJalaaliDate(jy, 12, 30) ? 30 : 29;

  const months = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, lastDayOfEsfand];

  let remaining = dayOfYear;
  let monthIndex = 0;
  while (remaining > months[monthIndex]) {
    remaining -= months[monthIndex];
    monthIndex++;
  }

  const jm = monthIndex + 1;
  const jd = remaining;

  const g = jalaali.toGregorian(jy, jm, jd);
  const date = new Date(g.gy, g.gm - 1, g.gd);
  const weekdayNumber = date.getDay();
  const weekdayNames = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
  ];

  return {
    weekdayNumber,
    weekdayName: weekdayNames[weekdayNumber],
    jalaliMonth: jm,
    jalaliDay: jd,
    gregorianDate: `${g.gy}-${String(g.gm)}-${String(
      g.gd
    )}`,
  };
}
