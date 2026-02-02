// Function to get the current time (hours, minutes, seconds)
export function currentTime() {
  const currentClock = new Date(); // Get the current date and time
  const currentHrs = currentClock.getHours(); // Extract current hours
  const currentMins = currentClock.getMinutes(); // Extract current minutes
  const currentSecs = currentClock.getSeconds(); // Extract current seconds

  // Return an object containing hours, minutes, and seconds
  return {
    hrs: currentHrs,
    mins: currentMins,
    secs: currentSecs,
  };
}

// Function to get the current date (day, month, year, and full day name)
export function currentDate() {
  const currentClock = new Date(); // Get the current date and time
  const currentDate = currentClock.getDate(); // Extract current date
  const currentYear = currentClock.getFullYear(); // Extract current year
  const currentMonth = currentClock.toDateString().slice(4, 7); // Extract the abbreviated month name
  const currentDay = currentClock.toDateString().slice(0, 3); // Extract the abbreviated day name
  let currentFullDay;

  // Switch case to determine the full name of the day (Monday to Sunday)
  switch (currentClock.getDay()) {
    case 1:
      currentFullDay = "Monday";
      break;
    case 2:
      currentFullDay = "Tuesday";
      break;
    case 3:
      currentFullDay = "Wednesday";
      break;
    case 4:
      currentFullDay = "Thursday";
      break;
    case 5:
      currentFullDay = "Friday";
      break;
    case 6:
      currentFullDay = "Saturday";
      break;
    default:
      currentFullDay = "Sunday"; // Default case for Sunday
  }

  // Return an object containing date, month, year, abbreviated day, and full day name
  return {
    date: currentDate,
    month: currentMonth,
    year: currentYear,
    day: currentDay,
    fullDay: currentFullDay,
  };
}

export function getMonthNumber(month: string) {
  const mm = month.slice(0, 3).toLowerCase();
  let monthCode = 0;
  let message = "";
  switch (mm) {
    case "jan":
      monthCode = 1;
      break;
    case "feb":
      monthCode = 2;
      break;
    case "mar":
      monthCode = 3;
      break;
    case "apr":
      monthCode = 4;
      break;
    case "may":
      monthCode = 5;
      break;
    case "jun":
      monthCode = 6;
      break;
    case "jul":
      monthCode = 7;
      break;
    case "aug":
      monthCode = 8;
      break;
    case "sep":
      monthCode = 9;
      break;
    case "oct":
      monthCode = 10;
      break;
    case "nov":
      monthCode = 11;
      break;
    case "dec":
      monthCode = 12;
      break;
    default:
      message = "Out of range!!!";
      break;
  }

  if (message !== "Out of range!!!") {
    return { month, monthCode, monthCodeFormat: monthCode < 10 ? `0${monthCode}` : monthCode };
  } else {
    return null;
  }
}

export function getMonth(num: number) {
  let month = "";
  switch (num) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
    default:
      month = "Out of range!!!";
      break;
  }

  if (month !== "Out of range!!!") {
    return { month: `${month.slice(0, 3)}`, fullMonth: month };
  } else {
    return null;
  }
}

export function detoxDate(inputDate: string) {
  if (
    inputDate.indexOf("+") === -1 &&
    inputDate.indexOf("-") === -1 &&
    inputDate.indexOf(".") === -1 &&
    inputDate.indexOf(" ") === -1 &&
    inputDate.indexOf("e") === -1 &&
    Number(inputDate)
  ) {
    return true;
  } else {
    return false;
  }
}

export function verifyDate(yyyymmdd = "2025-01-01") {
  if (yyyymmdd.length === 10) {
    if (
      detoxDate(yyyymmdd.slice(8)) &&
      detoxDate(yyyymmdd.slice(5, 7)) &&
      detoxDate(yyyymmdd.slice(0, 4))
    ) {
      if (
        Number(yyyymmdd.slice(0, 4)) > 1900 &&
        Number(yyyymmdd.slice(5, 7)) > 0 &&
        Number(yyyymmdd.slice(5, 7)) < 13 &&
        Number(yyyymmdd.slice(8)) > 0 &&
        Number(yyyymmdd.slice(8)) < 32
      ) {
        return true;
      }
    }
  } else {
    return false;
  }
}

export type FormatDateOption = "MONTH" | "FULLMONTH" | "MONTHFIRST" | "MONTHFIRSTFULL";

export function formatDate(yyyymmdd = "2025-01-01", formatOption?: FormatDateOption) {
  if (verifyDate(yyyymmdd)) {
    const mm = getMonth(Number(yyyymmdd.slice(5, 7)));
    if (!mm) {
      return null;
    }
    switch (formatOption) {
      case "MONTH":
        return `${yyyymmdd.slice(8)}-${mm.month}-${yyyymmdd.slice(0, 4)}`;
      case "FULLMONTH":
        return `${yyyymmdd.slice(8)}-${mm.fullMonth}-${yyyymmdd.slice(0, 4)}`;
      case "MONTHFIRST":
        return `${mm.month} ${yyyymmdd.slice(8)}, ${yyyymmdd.slice(0, 4)}`;
      case "MONTHFIRSTFULL":
        return `${mm.fullMonth} ${yyyymmdd.slice(8)}, ${yyyymmdd.slice(0, 4)}`;
      default:
        return `${yyyymmdd.slice(8)}-${yyyymmdd.slice(5, 7)}-${yyyymmdd.slice(0, 4)}`;
    }
  } else {
    return null;
  }
}
