import { db } from "./db.js";
import { getHhToken } from "./hh-api.js";

const hhAppHeader = process.env.HH_APP_HEADER!;

export const fetchHh = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => {
  return fetch(input, {
    headers: {
      "HH-User-Agent": hhAppHeader,
      ...init?.headers,
    },
    ...init,
  });
};

export const fetchHhData = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => {
  const data: { main: string } | undefined = await db.get(
    "SELECT main FROM token"
  );
  const tokenValue = data!.main;

  return fetchHh(input, {
    headers: {
      Authorization: `Bearer ${tokenValue}`,
      ...init?.headers,
    },
    ...init,
  });
};

export const getTokenDate = async (): Promise<Date | undefined> => {
  const data: { updated: string } | undefined = await db.get(
    "SELECT updated FROM token"
  );

  if (data) {
    return new Date(`${data.updated.replace(" ", "T")}Z`);
  } else {
    return undefined;
  }
};

export const updateHhToken = async () => {
  const token = await getHhToken();

  await db.run("DELETE FROM token");
  await db.run(`INSERT INTO TABLE token(main) VALUES('${token.access_token}')`);
};
