import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./Routes";
import { Provider } from "react-redux";
import { store } from "./store";
import MainLayout from "./layouts/Main";

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
