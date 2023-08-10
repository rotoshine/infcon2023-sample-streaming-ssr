/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from "fastify";
import {
  StaticHandlerContext,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import routes from "./routes";
import ReactDOM from "react-dom/server";
import createFetchRequest from "./request";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { PassThrough, Readable } from "stream";

interface RenderingProps {
  template: string;
  req: FastifyRequest;
  reply: FastifyReply;
}

const handler = createStaticHandler(routes);

async function* streamHTML(
  head: string,
  body: Readable,
  footer: string,
  queryClient: QueryClient,
) {
  yield head;
  console.log("[Streaming SSR] head rendered");
  let i = 0;
  for await (const chunk of body) {
    yield chunk;
    i++;
    console.log(`[Streaming SSR] chunk ${i} rendered`);
  }

  const dehydratedState = dehydrate(queryClient);

  footer = footer.replace("{{INITIAL_STATE}}", JSON.stringify(dehydratedState));
  yield footer;
  console.log("[Streaming SSR] footer rendered");
}

function elementToReadable(element: React.ReactElement): Promise<Readable> {
  const duplex = new PassThrough();

  return new Promise((resolve, reject) => {
    const { pipe, abort } = ReactDOM.renderToPipeableStream(element, {
      onShellReady() {
        console.log("[Streaming SSR] onShellReady");
        resolve(pipe(duplex));
      },
      onShellError(error: unknown) {
        abort();
        reject(error);
      },
      onError: (error: unknown) => {
        duplex.emit("error", error);
      },
    });
  });
}

export async function render({ template, req }: RenderingProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  const fetchRequest = createFetchRequest(req);
  const context = (await handler.query(fetchRequest)) as StaticHandlerContext;
  const router = createStaticRouter(handler.dataRoutes, context);

  const vnode = (
    <QueryClientProvider client={queryClient}>
      <StaticRouterProvider router={router} context={context} />
    </QueryClientProvider>
  );

  const [head, footer] = template.split("{{SSR_CONTENT}}");

  try {
    const ssrStream = Readable.from(
      streamHTML(head, await elementToReadable(vnode), footer, queryClient),
    );

    ssrStream.on("error", (error) => {
      console.log(`error!`, error.message);
    });
    ssrStream.on("close", () => {
      queryClient.clear();
      console.log(`queryClient clear!`);
    });
    return ssrStream;
  } catch (e) {
    console.log("error", e);
  }
}
