import App from "@/App";
import Homepage from "@/pages/Homepage";
import { Suspense } from "react";

//user specific route
export const userRoutes = [
  {
    path: "/",
    element: <App />,
    // errorElement: , // Suspense(<ErrorPage />),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Homepage />
          </Suspense>
        ),
      },
    ],
  },
];
