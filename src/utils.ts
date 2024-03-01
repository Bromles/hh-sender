import { db } from "./db.js";
import { getHhToken } from "./hh-api.js";
import { TokenResponse } from "./types.js";

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
  let tokenValue: string = (await db.get("SELECT main FROM token"))!;

  return fetchHh(input, {
    headers: {
      Authorization: `Bearer ${tokenValue}`,
      ...init?.headers,
    },
    ...init,
  });
};

export const updateHhToken = async () => {
  const token = await getHhToken();

  await db.run("TRUNCATE TABLE token");
  await db.run(`INSERT INTO TABLE token(main) VALUES(${token.access_token})`);
};
