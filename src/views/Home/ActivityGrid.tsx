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

const ActivityGrid = ({ dateToGameCount, gridDates }: ActivityGridProps) => {
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

  const cols = 53;
  const rows = 7;
  const cellWidth = 11;

  return (
    <div
      style={{
        gridTemplateColumns:
          `${cellWidth}px `.repeat(cols - 1) + `${cellWidth}px`,
        gridTemplateRows: `${cellWidth}px `.repeat(rows - 1) + `${cellWidth}px`,
      }}
      className={`grid gap-1 grid-flow-col`}
    >
      {gridDates.map((d, i) => (
        <GridCell
          key={i}
          id={i}
          gameCount={getGameCount(d)}
          date={d}
        ></GridCell>
      ))}
    </div>
  );
};

export default ActivityGrid;
