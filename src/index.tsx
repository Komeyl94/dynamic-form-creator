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
import FormSubmit from "./features/forms/FormSubmit";
import FormsList from "./features/forms/FormsList";
import Root from "./features/root";
import PermissionsList from "./features/permissions/PermissionsList";
import PermissionsAdd from "./features/permissions/PermissionsCreate";
import FormsSubmittedList from "./features/forms/FormsSubmittedList";
import ServicesList from "./features/services/ServicesList";
import ServicesCreate from "./features/services/ServicesCreate";
import Login from "./features/user/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
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
        path: "/forms/submit/:formId",
        element: <FormSubmit />,
      },
      {
        path: "/forms/submit/edit/:id/:formId",
        element: <FormSubmit />,
      },
      {
        path: "/forms/:formId/list",
        element: <FormsSubmittedList />
      },
      {
        path: "/permissions",
        element: <PermissionsList />
      },
      {
        path: "/permissions/create",
        element: <PermissionsAdd />
      },
      {
        path: "/permissions/edit/:userId",
        element: <PermissionsAdd />
      },
      {
        path: "/services",
        element: <ServicesList />
      },
      {
        path: "/services/create",
        element: <ServicesCreate />
      },
      {
        path: "/services/edit/:serviceId",
        element: <ServicesCreate />
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
