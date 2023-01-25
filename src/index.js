import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components';
import reducer, { initialState } from "./Helpers/reducer"
import { StateProvider } from "./Helpers/StateProvider";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import "./style/index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);

