import React from "react";
import List from "./list";
import Create from "./create";
import Update from "./update";
const routes: any = {
  path: "/admin/products",
  children: [
    { path: "/", element: <List /> },
    { path: "/create", element: <Create /> },
    { path: "/:productId/update", element: <Update /> },
  ],
};
export default routes;
