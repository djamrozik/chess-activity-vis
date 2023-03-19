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
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allGridDates = getDatesForGrid();
  const yearMonthStrings = getYearMonthStrings(allGridDates);

  const onClickViewActivity = async () => {
    setIsLoading(true);
    setDateToGameCount(null);
    const res = await getArchivedGamesMultipleMonths(
      username,
      yearMonthStrings
    );
    setDateToGameCount(convertGamesToGameCount(res));
    setIsLoading(false);
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center dark:text-neutral-100 dark:bg-[#0d1117]`}
    >
      <Navbar />
      <div className="pt-12">
        <div className="flex justify-center items-center">
          <input
            placeholder="Username"
            className="rounded px-2 py-1 border border-neutral-700 dark:border-none text-neutral-800"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onClickViewActivity()}
            data-lpignore="true"
            data-1p-ignore
          />
          <div
            onClick={() => onClickViewActivity()}
            className="ml-4 rounded bg-blue-500 py-1 px-4 font-semibold hover:cursor-pointer"
          >
            View
          </div>
        </div>
      </div>
      <div className="pt-12 px-6 max-w-full pb-4">
        {Boolean(!dateToGameCount && isLoading) && (
          <div className="pt-8">Loading...</div>
        )}
        {Boolean(dateToGameCount && !isLoading) && (
          <div className="">
            <ActivityGrid
              dateToGameCount={dateToGameCount as DateToGameCount}
              gridDates={allGridDates}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
