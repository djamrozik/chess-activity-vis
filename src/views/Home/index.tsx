import { useEffect, useState } from "react";

import { getArchivedGamesMultipleMonths, Game } from "@/lib/chess-com-api";
import { getDatesForGrid, getYearMonthStrings } from "@/lib/date";
import ActivityGrid from "@/views/Home/ActivityGrid";
import Navbar from "@/views/Home/Navbar";

type ArchivedGames = {
  [yearMonth: string]: Game[];
};

type DateToGameCount = {
  [year: string]: {
    [month: string]: {
      [day: number]: number;
    };
  };
};

const convertGamesToGameCount = (
  archivedGames: ArchivedGames
): DateToGameCount => {
  const res: DateToGameCount = {};

  for (const yearMonth in archivedGames) {
    const [fullYear, fullMonth] = yearMonth.split("/");
    if (!res[fullYear]) {
      res[fullYear] = {};
    }
    if (!res[fullYear][fullMonth]) {
      res[fullYear][fullMonth] = {};
    }
    for (const game of archivedGames[yearMonth]) {
      const datePlayed = new Date(game.end_time * 1000).getDate(); // need to check if utc or not
      if (!res[fullYear][fullMonth][datePlayed]) {
        res[fullYear][fullMonth][datePlayed] = 0;
      }
      res[fullYear][fullMonth][datePlayed]++;
    }
  }

  return res;
};

const Home = () => {
  const [dateToGameCount, setDateToGameCount] =
    useState<DateToGameCount | null>(null);

  const allGridDates = getDatesForGrid();
  const yearMonthStrings = getYearMonthStrings(allGridDates);

  useEffect(() => {
    if (dateToGameCount) {
      return;
    }

    (async () => {
      const res = await getArchivedGamesMultipleMonths(
        "merkhueli",
        yearMonthStrings
      );
      setDateToGameCount(convertGamesToGameCount(res));
    })();
  }, []);

  console.log(dateToGameCount);

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center dark:bg-[#0d1117]`}
    >
      <Navbar />
      <div className="pt-8">
        {!dateToGameCount && <div>Loading...</div>}
        {dateToGameCount && (
          <ActivityGrid
            dateToGameCount={dateToGameCount}
            gridDates={allGridDates}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
