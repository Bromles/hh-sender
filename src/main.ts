import Fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
import { db } from "./db.js";
import { router } from "./controller.js";

dotenv.config();

const port = Number(process.env.PORT) || 3000;

const fastify: FastifyInstance = Fastify({
  logger: true,
});

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
