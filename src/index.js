import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './components/context/AuthContext';
import GuestRoute from './components/middleware/GuestRoute';
import ProtectedRoute from './components/middleware/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/auth/Register';
import Header from './layouts/Header';
import EmployeesList from './components/employees/EmployeesList';
import axios from 'axios';
// require('dotenv').config();


const apiEndpoint = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  config => {
    config.baseURL = 'http://app.test/api/';
    // config.withCredentials = true;
    // axios.defaults.crossOrigin = true;
    // axios.defaults.crossDomain = true;
    // config.headers.post['Content-Type'] = 'application/json';
    // config.headers.post['Accept'] = 'application/json';
    // if (config.headers) {
    //   config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// axios.defaults.baseURL = apiEndpoint;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <GuestRoute><Login /></GuestRoute>,
  },
  {
    path: "/register",
    element: <GuestRoute><Register /></GuestRoute>,
  },
  {
    path: "/",
    element:<ProtectedRoute><Header /><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/employees",
    element:<ProtectedRoute><Header /><EmployeesList /></ProtectedRoute>,
  }
]);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
