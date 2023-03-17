import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import * as dayjs from "dayjs";

import ThemeContext from "@/contexts/ThemeContext";

type GridCellProps = {
  date: Date;
  gameCount: number;
  id: number;
};

const GridCell = ({ gameCount, id, date }: GridCellProps) => {
  const { themeClass } = useContext(ThemeContext);

  const defaultBgColor = themeClass === "dark" ? "#161b22" : "#ebedf0";

  let bgColor = defaultBgColor;
  if (gameCount > 0) {
    bgColor = "#9be9a8";
  }
  if (gameCount >= 5) {
    bgColor = "#40c463";
  }
  if (gameCount >= 10) {
    bgColor = "#216e39";
  }

  const dateFormatted = dayjs(date).format("dddd, MMMM M, YYYY");

  return (
    <>
      <div
        style={{
          backgroundColor: bgColor,
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
