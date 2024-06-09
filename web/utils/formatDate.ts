const convertTZ = (date: Date, tzString: string) => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
};

export const isDateLessThan = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() <= date2.getFullYear() &&
    date1.getMonth() <= date2.getMonth() &&
    date1.getDate() <= date2.getDate()
  );
};

export default convertTZ;
