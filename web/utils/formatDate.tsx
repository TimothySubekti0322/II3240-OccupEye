import { toZonedTime } from "date-fns-tz";

const getNumberOfDaysInMonthFromString = (
  dateString: string | undefined
): number => {
  if (dateString === undefined) return 0;

  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Extract the year and month from the Date object
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0 for January, 11 for December

  // Get the number of days in the month
  return new Date(year, month, 0).getDate();
};

const hourFormatter = (hour: number): string => {
  if (hour < 10) {
    return `0${hour}:00`;
  }
  return `${hour}:00`;
};

const convertTZ = (p0: Date, p1: string): Date => {
  const date = new Date();
  const local = toZonedTime(date, "Asia/Jakarta");
  console.log(local);
  return local;
};

export { getNumberOfDaysInMonthFromString, hourFormatter, convertTZ };
