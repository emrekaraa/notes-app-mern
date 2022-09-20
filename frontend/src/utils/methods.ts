export const isEmpty = (value: any) => {
  return (
    value === null || // Check for null or undefined
    value === undefined || // Check for null or undefined
    value.length === 0 || // Check for empty String (Bonus check for empty Array)
    (typeof value === "object" && Object.keys(value).length === 0) // Check for empty Object or Array
  );
};

export const convertDateTimeFormat = (date: any) => {
  if (isEmpty(date)) return "";
  let yyyyMMdd = date.split("T")[0];
  let ddMMyyy = yyyyMMdd.split("-").reverse().join("/");
  let time = date.split("T")[1].slice(0, 8);
  return `${ddMMyyy} ${time}`;
};
