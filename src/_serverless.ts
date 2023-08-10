/* eslint-disable @typescript-eslint/ban-ts-comment */
import FastifyStatic from "@fastify/static";
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fs from "fs/promises";
import path from "path";

const fastify = Fastify();

// @ts-ignore
// eslint-disable-next-line
const ssrModule = await import("../dist/entry-server.js");

const template = await fs.readFile(path.resolve("./dist/index.html"), "utf-8");

fastify.register(FastifyStatic, {
  prefix: "/assets/",
  root: path.resolve("./dist/assets"),
});

fastify.register(FastifyStatic, {
  prefix: "/images/",
  root: path.resolve("./dist/assets/public/images"),
  decorateReply: false,
});

async function routes(fastify: FastifyInstance) {
  fastify.get("*", async (req, reply) => {
    const response = await ssrModule.render({
      template,
      req,
      reply,
    });

    reply.status(200);
    reply.header("Content-Type", "text/html");
    return await reply.send(response);
  });
}

fastify.register(routes);

export default async (req: FastifyRequest, res: FastifyReply) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
