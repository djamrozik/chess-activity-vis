import { useEffect, useState } from "react";
import { getArchivedGamesMultipleMonths, Game } from "./lib/chess-com-api";
import { getDatesForGrid, getYearMonthStrings } from "./lib/date";

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

type GridCellProps = {
  gameCount: number;
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

const GridCell = ({ gameCount }: GridCellProps) => {
  let bgColor = "#ebedf0";
  if (gameCount > 0) {
    bgColor = "#9be9a8";
  }
  if (gameCount >= 5) {
    bgColor = "#40c463";
  }
  if (gameCount >= 10) {
    bgColor = "#216e39";
  }
  return (
    <div
      style={{
        backgroundColor: bgColor,
        outlineColor: "rgba(27, 31, 35, 0.07)",
      }}
      className={`rounded-sm text-xs outline outline-1 outline-offset-[-1px]`}
    />
  );
};

function App() {
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

  const cols = 53;
  const rows = 7;
  const cellWidth = 11;

  console.log(dateToGameCount);

  const getGameCount = (d: Date) => {
    if (!dateToGameCount) {
      return 0;
    }
    const fullYear = String(d.getFullYear());
    const fullMonth =
      d.getMonth() < 9 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
    const day = d.getDate();
    return dateToGameCount[fullYear]?.[fullMonth]?.[day] || 0;
  };

  return (
    <div className="h-screen w-screen">
      <div
        style={{
          gridTemplateColumns:
            `${cellWidth}px `.repeat(cols - 1) + `${cellWidth}px`,
          gridTemplateRows:
            `${cellWidth}px `.repeat(rows - 1) + `${cellWidth}px`,
        }}
        className={`w-full h-24 grid gap-1 p-8 grid-flow-col`}
      >
        {allGridDates.map((d, i) => (
          <GridCell key={i} gameCount={getGameCount(d)}></GridCell>
        ))}
      </div>
    </div>
  );
}

export default App;
