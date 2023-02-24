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
