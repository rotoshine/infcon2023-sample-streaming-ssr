import FastifyStatic from "@fastify/static";
import Fastify from "fastify";
import FastifyMiddie from "@fastify/middie";
import fs from "fs/promises";
import path from "path";
import { createServer as createViteServer } from "vite";
import FastifyFavicon from "fastify-favicon";

const HOST = "0.0.0.0";
const PORT = 9999;

const fastify = Fastify();
await fastify.register(FastifyMiddie);

const vite = await createViteServer({
  server: {
    middlewareMode: true,
  },
  appType: "custom",
});

fastify.use(vite.middlewares);

const rawTemplate = await fs.readFile(
  path.resolve("./src/index.html"),
  "utf-8",
);

fastify.register(FastifyStatic, {
  prefix: "/images",
  root: path.resolve("./public/images"),
});
fastify.register(FastifyFavicon, {
  path: path.resolve("./public"),
});
fastify.get("*", async (req, reply) => {
  const template = await vite.transformIndexHtml(req.url, rawTemplate);
  const ssrModule = await vite.ssrLoadModule("./src/entry-server.tsx");
  const response = await ssrModule.render({
    template,
    req,
    reply,
  });

  reply.status(200);
  reply.header("Content-Type", "text/html");
  return await reply.send(response);
});

fastify.listen(
  {
    host: HOST,
    port: PORT,
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`⚡️ SSR Server is running on http://localhost:${PORT}`);
    }
  },
);
