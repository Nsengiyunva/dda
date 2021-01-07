import { DefaultLayout, Wide } from "./layouts"

// Route Views
import Dashboard from "./views/Dashboard"

import Home from './views/Home'
import Services from './views/Services'
import Register from './views/Register'
import AllApplications from './views/Applications/AllApplications'
import CreateApplication from './views/Forms/CreateApplication'
import Application from './views/Application'
import DisplayApplication from './views/Applications/DisplayApplication'
import SignIn from "./views/SignIn"

export default [
  {
    path: "/",
    exact: true,
    layout: Wide,
    component: Home
    // component: () => <Redirect to="/sign-in" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/register",
    exact: true,
    layout: Wide,
    component: Register
  },
  {
    path: "/sign-in",
    exact: true,
    layout: Wide,
    component: SignIn
  },
  // {
  //   path: '/create-application',
  //   exact: true,
  //   layout: Wide,
  //   component: CreateApplication
  // },
  {
    path: '/applications',
    exact: true,
    layout: Wide,
    component: AllApplications
  },
  {
    path: '/view-application',
    exact: true,
    layout: Wide,
    component: Application
  },
  {
    path: "/display-application",
    layout: Wide,
    component: DisplayApplication
  },
  {
    path: "/services",
    layout: Wide,
    component: Services
  },
  {
    path: "/new-membership",
    layout: Wide,
    component: CreateApplication
  }
];
