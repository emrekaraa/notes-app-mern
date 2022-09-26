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

export const validateEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
};
