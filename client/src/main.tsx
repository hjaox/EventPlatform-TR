import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx'
import Homepage from './components/Homepage/Homepage.tsx';
import Login from './components/Homepage/Login/Login.tsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/Homepage",
      element: <Homepage />
    },
    {
      path: "/Login",
      element: <Login />
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
