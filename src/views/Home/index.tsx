import { useEffect, useState } from "react";

import {
  getArchivedGamesMultipleMonths,
  Game,
  getAvailableArchives,
} from "@/lib/chess-com-api";
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

const isYearMonthStringAvailable = (
  yearMonthIdentifier: string,
  availableArchives: string[]
) => {
  for (const availableArchive of availableArchives) {
    if (availableArchive.endsWith(yearMonthIdentifier)) {
      return true;
    }
  }
  return false;
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

    const availableArchives = await getAvailableArchives(username);
    const yearMonthStringsAvailable = yearMonthStrings.filter((s) =>
      isYearMonthStringAvailable(s, availableArchives)
    );
    const res = await getArchivedGamesMultipleMonths(
      username,
      yearMonthStringsAvailable
    );

    setDateToGameCount(convertGamesToGameCount(res));
    setActivityGridState("loaded");
  };

  return (
    <div
      className={`flex h-screen w-screen flex-col items-center bg-gray-50 dark:bg-[#0d1117]`}
    >
      <Navbar />
      <div>
        <div className="max-w-md px-4 pt-20 text-center text-lg">
          See your chess.com activity in the style of the Github commit activity
          view.
        </div>
      </div>
      <div className="flex w-full justify-center pt-20">
        <div className="flex h-10 w-[909px] items-stretch justify-center px-6">
          <input
            placeholder="Chess.com username"
            className="mr-6 flex-grow border-b border-[var(--border-primary)] bg-gray-50/0 pl-1 focus:border-b-blue-500 focus:outline-none dark:border-[var(--border-primary-dark)] dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onClickViewActivity()}
            data-lpignore="true"
            data-1p-ignore
          />
          <div
            onClick={() => onClickViewActivity()}
            className="flex items-center rounded bg-blue-900 px-4 font-normal text-[var(--text-primary-dark)] hover:cursor-pointer"
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
          <div className="flex items-center rounded-tl-lg rounded-tr-lg bg-blue-900 py-2.5 px-8">
            <span className="flex items-center font-normal text-[var(--text-primary-dark)]">
              <span className="pr-2">Follow me on</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-twitter"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
