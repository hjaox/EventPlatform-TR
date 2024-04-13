import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { persistor, store } from './utils/redux/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx'
import Home from './components/Home/Home.tsx';
import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import Event from './components/EventPage/Event.tsx';
import Error from './components/Error/Error.tsx';
import OrganizeEvent from './components/OrganizeEvent/OrganizeEvent.tsx';
import EditEvent from './components/EditEvent/EditEvent.tsx';
import Popup from './components/Popup/Popup.tsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/Home",
      element: <Home />
    },
    {
      path: "/Login",
      element: <Login />
    },
    {
      path: "/Register",
      element: <Register />
    },
    {
      path: "/Dashboard",
      element: <Dashboard />
    },
    {
      path: "/Event/Create",
      element: <OrganizeEvent />
    },
    {
      path: "/Event/Edit/:eventId",
      element: <EditEvent />
    },
    {
      path: "/Event/:eventId",
      element: <Event />
    },
    {
      path: "/Popup",
      element: <Popup />,
    },
    {
      path: "/*",
      element: <Error />
    },
  ]
);

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
)
