import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root.tsx";
import ErrorPage from "./error-page.tsx";
import { SpellingBee } from "./spellingBee/SpellingBee.tsx";
import { Boggle } from "./boggle/Boggle.tsx";
import { Wordle } from "./wordle/Wordle.tsx";

const router = createHashRouter([
  {
    path: "/*",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "boggle",
        element: <Boggle />,
      },
      {
        path: "spelling-bee",
        element: <SpellingBee />,
      },
      {
        path: "wordle",
        element: <Wordle />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
