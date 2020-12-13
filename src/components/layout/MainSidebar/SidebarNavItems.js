import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navItems: Store.getSidebarItems(),
      procurementItems: Store.getProcSidebarItems(),
      adminItems: Store.getAdminSidebarItems(),
      userItems: Store.getUserItems()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items, procurementItems, adminItems, userItems } = this.state
    if( localStorage.getItem('system') === 'edms' && localStorage.getItem('role') === 'User' ){
      return (
        <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {userItems.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
      )
    }
    if( localStorage.getItem('system') === 'edms' && localStorage.getItem('role') !== 'User' ){
      return (
        <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {adminItems.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
      )
    }
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
