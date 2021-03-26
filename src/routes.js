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
import AllAthletes from "./views/Athletes/AllAthletes"
import Quaterly from "./views/Quaterly"
import Transfer from './views/Transfer'
import AddAthlete from "./views/Profile/AddAthlete"


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
  {
    path: '/athletes',
    exact: true,
    layout: Wide,
    component: AllAthletes
  },
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
  },
  {
    path: "/report",
    layout: Wide,
    component: Quaterly
  },
  {
    path: "/transfer-athlete",
    layout: Wide,
    component: Transfer
  },
  {
    path: "/add-athlete",
    layout: Wide,
    component: AddAthlete
  }
];
