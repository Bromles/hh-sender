import Fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
import { db } from "./db.js";
import { router } from "./controller.js";
import { getTokenDate, updateHhToken } from "./utils.js";

dotenv.config();

const port = Number(process.env.PORT) || 3000;

const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.register(router, { prefix: "/" });

const updateToken = async () => {
  const tokenDate = await getTokenDate();
  const currentDate = new Date().getTime();
  const backoff = 5 * 60 * 1000;

  if (!tokenDate || currentDate - tokenDate.getTime() >= backoff) {
    await updateHhToken();
  }
};

await updateToken();

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
