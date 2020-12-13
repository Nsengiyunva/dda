import { EventEmitter } from "events";

import Dispatcher from "./dispatcher"
import Constants from "./constants"
import getSidebarNavItems from "../data/sidebar-nav-items"
import procurementNavItems from "../data/procurement-nav-items"
import adminNavItems from "../data/admin-nav-items"
import UserNavItems from '../data/sidebar-user-nav-items'

let _store = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  procItems: procurementNavItems(),
  adminItems: adminNavItems(),
  userItems: UserNavItems()
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible
    this.emit(Constants.CHANGE)
  }

  getMenuState() {
    return _store.menuVisible
  }

  getSidebarItems() {
    return _store.navItems
  }
  getProcSidebarItems(){  
    return _store.procItems
  }
  getAdminSidebarItems(){  
    return _store.adminItems
  }
  getUserItems(){
    return _store.userItems
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
