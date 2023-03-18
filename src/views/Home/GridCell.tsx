import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import dayjs from "dayjs";

import ThemeContext from "@/contexts/ThemeContext";

type GridCellProps = {
  date: Date;
  gameCount: number;
  id: number;
};

const gridCellBgColor = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const cellColorBreakPoints = [0, 4, 8, 12];

const getCellColor = (gamesPlayed: number, themeClass: "light" | "dark") => {
  const cellColorLevel = cellColorBreakPoints.reduce((curLevel, cur, i) => {
    if (gamesPlayed >= cur && i > curLevel) {
      return i;
    }
    return curLevel;
  }, 0);
  return gridCellBgColor[themeClass][cellColorLevel];
};

const GridCell = ({ gameCount, id, date }: GridCellProps) => {
  const { themeClass } = useContext(ThemeContext);
  const dateFormatted = dayjs(date).format("dddd, MMMM M, YYYY");

  return (
    <>
      <div
        style={{
          backgroundColor: getCellColor(gameCount, themeClass),
          outlineColor: "rgba(27, 31, 35, 0.07)",
        }}
        className={`rounded-sm text-xs outline outline-1 outline-offset-[-1px]`}
        data-tooltip-id={`cell-tooltip-${id}`}
      />
      <Tooltip
        id={`cell-tooltip-${id}`}
        className="opacity-95 text-xs rounded-md"
      >
        <div>
          {gameCount} {gameCount === 1 ? "game" : "games"} played on{" "}
          {dateFormatted}
        </div>
      </Tooltip>
    </>
  );
};

export default GridCell;
