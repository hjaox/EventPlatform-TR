import ReactDOM from 'react-dom/client'
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { persistor, store } from './utils/redux/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx'
import Home from './components/Home/Home.tsx';
import Login from './components/Login/Login.tsx';
import Event from './components/EventPage/Event.tsx';
import Error from './components/Error/Error.tsx';
import EditEvent from './components/CreateEditEvent/EditEvent.tsx';
import Popup from './components/Popup/Popup.tsx';
import CreateEvent from './components/CreateEditEvent/CreateEvent.tsx';

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
      path: "/Event/Create",
      element: <CreateEvent />
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
        <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
