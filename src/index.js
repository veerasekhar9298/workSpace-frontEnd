import React from 'react';
import ReactDOM from 'react-dom/client';
 import {BrowserRouter} from"react-router-dom"
 import configure from './store/configure-store';
 import {Provider} from  'react-redux'
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "./App.css"


// import "@material-tailwind/react/dist/tailwind.css";

const store = configure()




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);

    

