import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from "./App.js";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import DataContext from './utils/DataContext.jsx';
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports.js";
// console.log(awsExports);

Amplify.configure(awsExports);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <DataContext>
     <App />   
     </DataContext>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

