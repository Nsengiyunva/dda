import { DefaultLayout, Wide } from "./layouts"

// Route Views
import Dashboard from "./views/Dashboard"

import SignIn from './views/SignIn/SignIn'
import Register from './views/Register'
// import AllApplications from './views/AllApplications'
import AllApplications from './views/Applications/AllApplications'
import CreateApplication from './views/Applications/CreateApplication'
// import Application from './views/Application'
// import DisplayApplication from './views/Applications/DisplayApplication'
import ApplicationProfile from "./views/Applications/ApplicationProfile"

export default [
  {
    path: "/",
    exact: true,
    layout: Wide,
    component: SignIn
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
    path: '/create-application',
    exact: true,
    layout: Wide,
    component: CreateApplication
  },
  {
    path: '/applications',
    exact: true,
    layout: Wide,
    component: AllApplications
  },
  {
    path: "/application-profile/:id",
    layout: Wide,
    component: ApplicationProfile
  }
]
