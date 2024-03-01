import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const router = (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
  fastify.get("/", async (req, res) => {
    const remoteRes = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const json = await remoteRes.json();

    return json;
  });

  done();
};
