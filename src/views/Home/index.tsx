import { useEffect, useState } from "react";

import { getArchivedGamesMultipleMonths, Game } from "@/lib/chess-com-api";
import { getDatesForGrid, getYearMonthStrings } from "@/lib/date";
import ActivityGrid from "@/views/Home/ActivityGrid";
import { ActivityGridState } from "@/views/Home/ActivityGrid";
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
  const [activityGridState, setActivityGridState] =
    useState<ActivityGridState>("toSearch");

  const allGridDates = getDatesForGrid();
  const yearMonthStrings = getYearMonthStrings(allGridDates);

  const onClickViewActivity = async () => {
    setActivityGridState("loading");
    setDateToGameCount(null);
    const res = await getArchivedGamesMultipleMonths(
      username,
      yearMonthStrings
    );
    setDateToGameCount(convertGamesToGameCount(res));
    setActivityGridState("loaded");
  };

  return (
    <div
      className={`flex h-screen w-screen flex-col items-center bg-gray-50 dark:bg-[#0d1117] dark:text-neutral-100`}
    >
      <Navbar />
      <div className="flex w-full justify-center  pt-20">
        <div className="flex h-10 w-[909px] items-stretch justify-center px-6">
          <input
            placeholder="Chess.com username"
            className="mr-6 flex-grow border-b border-gray-300 bg-gray-50/0 pl-1 text-gray-900 focus:border-b-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700/0 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onClickViewActivity()}
            data-lpignore="true"
            data-1p-ignore
          />
          <div
            onClick={() => onClickViewActivity()}
            className="flex items-center rounded-sm bg-blue-900 px-4 font-semibold text-neutral-100 hover:cursor-pointer"
          >
            View
          </div>
        </div>
      </div>
      <div className="max-w-full px-6 pt-20 pb-4">
        <div className="">
          <ActivityGrid
            dateToGameCount={dateToGameCount as DateToGameCount}
            gridDates={allGridDates}
            state={activityGridState}
          />
        </div>
      </div>
      <div className="fixed bottom-0">
        <a
          href="https://twitter.com/danjamrozik"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center rounded-tl-lg rounded-tr-lg bg-blue-900 py-2 px-4">
            <span>@danjamrozik</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
