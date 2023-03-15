import { useEffect } from "react";
import { getArchivedGamesMultipleMonths } from "./lib/chess-com-api";

import { getDatesForGrid, getYearMonthStrings } from "./lib/date";

function App() {
  const allGridDates = getDatesForGrid();
  const yearMonthStrings = getYearMonthStrings(allGridDates);

  useEffect(() => {
    (async () => {
      const res = await getArchivedGamesMultipleMonths(
        "merkhueli",
        yearMonthStrings
      );
      console.log(res);
    })();
  }, []);

  return <h1 className="text-3xl font-semibold underline">Hello world!</h1>;
}

export default App;
