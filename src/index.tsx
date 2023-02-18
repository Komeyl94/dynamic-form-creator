import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FormCreate from "./features/forms/FormCreate";
import FormDisplay, {
  loader as formDisplayLoader,
} from "./features/forms/FormDisplay";
import FormsList from "./features/forms/FormsList";
import Root from "./features/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/forms",
        element: <FormsList />
      },
      {
        path: "/forms/add",
        element: <FormCreate />
      },
      {
        path: "/forms/edit",
        element: <FormCreate />,
      },
      {
        path: "/forms/edit/:formId",
        element: <FormCreate />,
      },
      {
        path: "/forms/display/:formId",
        element: <FormDisplay />,
        loader: formDisplayLoader
      },
      {
        path: "/services",
        element: <div>Services</div>
      },
      {
        path: "/services/add",
        element: <div>Add Service</div>
      },
      {
        path: "/permissions",
        element: <div>Permissions</div>
      },
      {
        path: "/permissions/add",
        element: <div>Add Permissions</div>
      },
      {
        path: "/users",
        element: <div>Users</div>
      },
      {
        path: "/users/add",
        element: <div>Add User</div>
      },
    ],
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
