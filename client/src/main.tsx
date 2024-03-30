import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { persistor, store } from './utils/redux/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx'
import Home from './components/Home/Home.tsx';
import Login from './components/SignIn/components/Login/Login.tsx';
import Register from './components/SignIn/components/Register/Register.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import SignIn from './components/SignIn/SignIn.tsx';
import Event from './components/EventPage/Event.tsx';
import Payment from './components/Payment.tsx';
import Completion from './components/Completion.tsx';

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
      path: "/SignIn",
      element: <SignIn />
    },
    {
      path: "/Event/:eventId",
      element: <Event />
    },
    {
      path: "/Payment",
      element: <Payment />
    },
    {
      path: "/Completion",
      element: <Completion />
    }
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
