type YearMonthMapping = {
  [year: string]: {
    [month: string]: boolean;
  };
};

// January should return "01", etc
const getFullMonth = (date: Date): string => {
  const month = date.getMonth();
  if (month < 9) {
    return `0${month + 1}`;
  }
  return `${month + 1}`;
};

// returns a list of dates which will be shown in the grid
// list will contain the days in the current week, plus days of the last 52 weeks
// in ascending order
const getDatesForGrid = (): Date[] => {
  const cur = new Date();
  const res: Date[] = [new Date(cur)];
  cur.setDate(cur.getDate() - 1);

  while (cur.getDay() !== 6) {
    res.unshift(new Date(cur));
    cur.setDate(cur.getDate() - 1);
  }

  let i = 52 * 7;
  while (i > 0) {
    res.unshift(new Date(cur));
    cur.setDate(cur.getDate() - 1);
    i--;
  }

  return res.sort((a, b) => {
    return a < b ? -1 : 1;
  });
};

// given a list of dates, return a list of strings
// that represent all of the year/month identifies
// of the dates in the input
const getYearMonthStrings = (dates: Date[]): string[] => {
  const yearMonthMapping: YearMonthMapping = {};
  for (const date of dates) {
    const fullYear = String(date.getFullYear());
    const fullMonth = getFullMonth(date);
    if (!(fullYear in yearMonthMapping)) {
      yearMonthMapping[fullYear] = {};
    }
    yearMonthMapping[fullYear][fullMonth] = true;
  }

  const res = [];
  for (const year in yearMonthMapping) {
    for (const month in yearMonthMapping[year]) {
      res.push(`${year}/${month}`);
    }
  }

  return res;
};

export { getDatesForGrid, getYearMonthStrings };
