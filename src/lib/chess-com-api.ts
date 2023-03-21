import { delay } from "./utils";

interface Game {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: {
    rating: number;
    result: string;
    "@id": string;
    username: string;
    uuid: string;
  };
  black: {
    rating: number;
    result: string;
    "@id": string;
    username: string;
    uuid: string;
  };
}

interface ArchivesResult {
  archives: string[];
}

class ChessComApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChessComApiError";
  }
}

const getArchivedGamesSingleMonth = async (
  username: string,
  yearMonthIdentifier: string
): Promise<Game[]> => {
  const url = `https://api.chess.com/pub/player/${username}/games/${yearMonthIdentifier}`;
  const res = await fetch(url);
  const resJson = await res.json();
  return resJson["games"] as Game[];
};

const getAvailableArchives = async (username: string) => {
  const url = `https://api.chess.com/pub/player/${username}/games/archives`;
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new ChessComApiError(
      "Failed to fetch archives, username likely does not exist"
    );
  }

  const resJson = (await res.json()) as ArchivesResult;
  return resJson.archives;
};

const getArchivedGamesMultipleMonths = async (
  username: string,
  yearMonthIdentifiers: string[]
) => {
  const res: { [key: string]: Game[] } = {};

  for (const yearMonthIdentifier of yearMonthIdentifiers) {
    const singleMonthRes = await getArchivedGamesSingleMonth(
      username,
      yearMonthIdentifier
    );
    res[yearMonthIdentifier] = singleMonthRes;
    await delay(250);
  }

  return res;
};

export {
  getAvailableArchives,
  getArchivedGamesSingleMonth,
  getArchivedGamesMultipleMonths,
  ChessComApiError,
};

export type { Game };
