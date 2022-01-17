import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);