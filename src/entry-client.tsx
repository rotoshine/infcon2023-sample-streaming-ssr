import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const router = createBrowserRouter(routes);

const dehydratedState = window.__REACT_QUERY_STATE__;
console.log(dehydratedState);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
});
const rootElement = document.getElementById("root")!;
ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <RouterProvider router={router} />
      </Hydrate>
    </QueryClientProvider>
  </React.StrictMode>,
);
