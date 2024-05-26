import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link,  useNavigate } from 'react-router-dom';

const Navbar = () => {
  let nav =useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userdbtoken');
    localStorage.removeItem('userdbuserId');
    nav('/');
  };

  return (
    <Menu>
      <Menu.Item header>Contact Manager</Menu.Item>
      <Menu.Item as={Link} to="/AddContact">
        Personal Contacts
      </Menu.Item>
      <Menu.Item as={Link} to="/GlobalContacts">
        Global Contacts
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
