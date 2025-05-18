import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./UserRoutes";

const router = createBrowserRouter([
  ...userRoutes,
  //? you can add routes here in 2 ways
  //? 1. by using an array of routes from another file like userRoutes by ...userRoutes .
  //? 2. by using an object like this

  // {
  //   path: "/",
  //   element: (
  //     <Suspense fallback={<Loading isLoading={true} />}>
  //       {/* <Home /> */}
  //     </Suspense>
  //   ),
  // },
]);

export default router;
