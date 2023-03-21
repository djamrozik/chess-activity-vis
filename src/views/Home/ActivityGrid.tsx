import dayjs from "dayjs";

import GridCell from "@/views/Home/GridCell";

type DateToGameCount = {
  [year: string]: {
    [month: string]: {
      [day: number]: number;
    };
  };
};

type ActivityGridState = "toSearch" | "loading" | "loaded";

type ActivityGridProps = {
  dateToGameCount?: DateToGameCount;
  gridDates: Date[];
  state: ActivityGridState;
};

type ColToMonth = {
  [col: number]: string;
};

const cols = 53;
const rows = 7;
const cellWidth = 11;

const getColToMonth = (gridDates: Date[]): ColToMonth => {
  const res: ColToMonth = {};
  let col = 0;
  for (let i = 0; i < gridDates.length; i += 7) {
    const dayOfMonth = gridDates[i].getDate();
    if (dayOfMonth <= 7) {
      res[col] = dayjs(gridDates[i]).format("MMM");
    }
    col++;
  }
  return res;
};

const getGameCount = (
  dateToGameCount: DateToGameCount | undefined,
  d: Date
) => {
  if (!dateToGameCount) {
    return 0;
  }
  const fullYear = String(d.getFullYear());
  const fullMonth =
    d.getMonth() < 9 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
  const day = d.getDate();
  return dateToGameCount[fullYear]?.[fullMonth]?.[day] || 0;
};

const getTotalGamesPlayed = (dateToGameCount: DateToGameCount | undefined) => {
  if (!dateToGameCount) {
    return 0;
  }

  let res = 0;
  for (const year in dateToGameCount) {
    for (const month in dateToGameCount[year]) {
      for (const day in dateToGameCount[year][month]) {
        res += dateToGameCount[year][month][day];
      }
    }
  }

  return res;
};

const ActivityGrid = ({
  dateToGameCount,
  gridDates,
  state,
}: ActivityGridProps) => {
  const colToMonth = getColToMonth(gridDates);
  const totalGamesPlayed = getTotalGamesPlayed(dateToGameCount);

  const renderInnerGridContent = () => (
    <div className="flex">
      <div
        style={{
          gridTemplateRows: `repeat(7, ${cellWidth}px)`,
        }}
        className="grid w-9 flex-shrink-0 items-center gap-1  pt-[22px] text-xs"
      >
        <div />
        <div>Mon</div>
        <div></div>
        <div>Wed</div>
        <div></div>
        <div>Fri</div>
        <div></div>
      </div>
      <div className="flex flex-row-reverse overflow-x-scroll">
        <div>
          <div
            className="grid h-[22px] gap-1 text-xs"
            style={{
              gridTemplateColumns:
                `${cellWidth}px `.repeat(cols - 1) + `${cellWidth}px`,
            }}
          >
            {[...new Array(cols)].map((_, i) => (
              <div key={i}>{colToMonth[i] || ""}</div>
            ))}
          </div>
          <div
            style={{
              gridTemplateColumns:
                `${cellWidth}px `.repeat(cols - 1) + `${cellWidth}px`,
              gridTemplateRows:
                `${cellWidth}px `.repeat(rows - 1) + `${cellWidth}px`,
            }}
            className={`grid grid-flow-col gap-1`}
          >
            {gridDates.map((d, i) => (
              <GridCell
                key={i}
                id={i}
                gameCount={getGameCount(dateToGameCount, d)}
                date={d}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="h-[32px] pb-2 pl-1 text-sm">
        {state === "loaded" && (
          <div>
            {totalGamesPlayed.toLocaleString()}{" "}
            {totalGamesPlayed !== 1 ? "games" : "game"} played in the last year
          </div>
        )}
      </div>
      <div className="rounded-lg border border-[var(--border-primary)] p-4 dark:border-[var(--border-primary-dark)]">
        {state === "loaded" && renderInnerGridContent()}
        {Boolean(state === "toSearch" || state === "loading") && (
          <div className="flex w-full">
            <div className="flex h-[123px] w-[829px] items-center justify-center">
              {state === "loading"
                ? "Loading..."
                : "Activity grid will be shown here"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityGrid;

export type { ActivityGridState };
