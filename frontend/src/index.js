import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement
);