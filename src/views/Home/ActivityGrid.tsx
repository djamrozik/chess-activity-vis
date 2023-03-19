import dayjs from "dayjs";

import GridCell from "@/views/Home/GridCell";

type DateToGameCount = {
  [year: string]: {
    [month: string]: {
      [day: number]: number;
    };
  };
};

type ActivityGridProps = {
  dateToGameCount: DateToGameCount;
  gridDates: Date[];
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

const getGameCount = (dateToGameCount: DateToGameCount, d: Date) => {
  if (!dateToGameCount) {
    return 0;
  }
  const fullYear = String(d.getFullYear());
  const fullMonth =
    d.getMonth() < 9 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
  const day = d.getDate();
  return dateToGameCount[fullYear]?.[fullMonth]?.[day] || 0;
};

const ActivityGrid = ({ dateToGameCount, gridDates }: ActivityGridProps) => {
  console.log(gridDates);
  const colToMonth = getColToMonth(gridDates);
  console.log(gridDates);

  return (
    <div className="flex">
      <div
        style={{
          gridTemplateRows: `repeat(7, ${cellWidth}px)`,
        }}
        className="w-9 grid gap-1 text-xs items-center flex-shrink-0 pt-[22px]"
      >
        <div />
        <div>Mon</div>
        <div></div>
        <div>Wed</div>
        <div></div>
        <div>Fri</div>
        <div></div>
      </div>
      <div className="overflow-x-scroll flex flex-row-reverse">
        <div>
          <div
            className="grid text-xs gap-1 h-[22px]"
            style={{
              gridTemplateColumns:
                `${cellWidth}px `.repeat(cols - 1) + `${cellWidth}px`,
            }}
          >
            {[...new Array(cols)].map((_, i) => (
              <div>{colToMonth[i] || ""}</div>
            ))}
          </div>
          <div
            style={{
              gridTemplateColumns:
                `${cellWidth}px `.repeat(cols - 1) + `${cellWidth}px`,
              gridTemplateRows:
                `${cellWidth}px `.repeat(rows - 1) + `${cellWidth}px`,
            }}
            className={`grid gap-1 grid-flow-col`}
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
};

export default ActivityGrid;
