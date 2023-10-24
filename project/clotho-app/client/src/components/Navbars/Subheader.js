import { Link } from 'react-router-dom';
import { React, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import logoFull from '../../assets/images/clotho-logo-name-hiRes.png';

function Subheader() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="light" light expand="md" id='subheader'>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="justify-content-start" style={{ width: "100%" }} navbar >
          
            <NavItem className="mx-auto mx-md-0">
              <NavLink href="/test" className="nav-link mr-auto">Men</NavLink>
            </NavItem>
            <NavItem className="mx-auto mx-md-0">
              <NavLink href="/test" className="nav-link">Women</NavLink>
            </NavItem>
            <NavItem className="mx-auto mx-md-0" disabled>
              <NavLink href="/test" className="nav-link">Accessories</NavLink>
            </NavItem>
            <NavItem className="mx-auto mx-md-0" disabled>
              <NavLink href="/test" className="nav-link"><span className="saleLink">SALE</span></NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

export default Subheader;
