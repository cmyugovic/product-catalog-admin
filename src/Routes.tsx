import React from "react";
import { useRoutes } from "react-router-dom";
import productRoutes from "./screens/products/routes";
const routes = [productRoutes, { path: "*", element: <div>404</div> }];

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

export default AppRoutes;
