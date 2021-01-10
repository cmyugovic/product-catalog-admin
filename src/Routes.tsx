import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";

const routes = [{ path: "*", element: <div>404</div> }];

const AppRoutes = () => {
  const element = useRoutes(routes);

  return element;
};

export default AppRoutes;
