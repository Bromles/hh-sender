import Fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
import { db } from "./db.js";
import { router } from "./main-controller.js";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const hhAppHeader = process.env.HH_APP_HEADER!;

const fastify: FastifyInstance = Fastify({
  logger: true,
});

const fetchHh = async (
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

fastify.register(router, { prefix: "/" });

await fastify.listen({ port, host: "0.0.0.0" });

console.log(`[server]: Server is running at http://localhost:${port}`);

const cleanup = () => {
  fastify.close(() => {
    console.log("shutting down, closing db connection");
    db.close();
  });
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
