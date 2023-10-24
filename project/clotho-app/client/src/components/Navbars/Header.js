// IMPORT: React
import { React, useState, use } from 'react';
import { Link } from 'react-router-dom';

// IMPORT: Popups
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/Header.css';
// import { FaShoppingCart } from 'react-icons/fa';
// import { Badge, Container, FormControl, Nav, Navbar, Dropdown } from 'reactstrap';

// IMPORT: Reactstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
} from 'reactstrap';

// IMPORT: Images
import logoFull from '../../assets/images/clotho-logo-name-hiRes.png';

// IMPORT: Components
import LoginNavItem from '../0-LLR/LoginNavItem';
import SignupNavItem from '../0-LLR/SignupNavItem';
import LogoutNavItem from '../0-LLR/LogoutNavItem';
import DevNavItem from '../0-LLR/DevNavItem';
import AdminNavItem from '../0-LLR/AdminNavItem';
import UserNavItem from '../0-LLR/UserNavItem';
import HomeNavItem from '../0-LLR/HomeNavItem';

/* // OLD WORKING:
import Login from '../0-LLR/Login';
import LoginModalNavItem from './HeaderItems/LoginModalNavItem';
import Signup from '../Forms/Signup';
import SignupModalNavItem from './HeaderItems/SignupModalNavItem';
import LogoutNavItem from './HeaderItems/LogoutNavItem';
*/

function Header({ props }) {

//  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // initial login state
  const [isLoggedIn, setIsLoggedIn] = useState(!(sessionStorage.getItem('token') === '' || sessionStorage.getItem('token') === null));
  const [isAdmin, setIsAdmin] = useState((sessionStorage.getItem('isAdmin') === 'true'));
  const [uname, setUname] = useState(sessionStorage.getItem('username'));
  const [signupUname, setSignupUname] = useState('');

  function popupChange(success, msg, signupUname) {

    // update state (re-renders header)
    setIsLoggedIn(!(sessionStorage.getItem('token') === '' || sessionStorage.getItem('token') === null));
    setIsAdmin((sessionStorage.getItem('isAdmin') === 'true'));
    // set uname state for header
    setUname(sessionStorage.getItem('username'));
    setSignupUname(signupUname);


    // update popup
    let options = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
    success ? toast.success(msg, options) : toast.error(msg, options);
  }

  // same as above, but transfer to log in modal
  function popupChangeSignup(success, msg, uname) {
    popupChange(success, msg);

    // set username in login form
    // TODO:

  }

  return (
    <>
      <Navbar
        color="light"
        light
        expand="md"
        id='header'
      >
        <NavbarBrand href="/">
          <img
            alt="logo"
            src={logoFull}
            style={{
              height: 40
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="justify-content-end" style={{ width: "100%" }} navbar >

            
            <HomeNavItem props={{ isLoggedIn: isLoggedIn, isAdmin: isAdmin, onSubmitProp: popupChange }} />
            <LoginNavItem props={{ isLoggedIn: isLoggedIn, onSubmitProp: popupChange, uname: signupUname }} />
            <LogoutNavItem props={{ isLoggedIn: isLoggedIn, onSubmitProp: popupChange }} />
            <SignupNavItem props={{ isLoggedIn: isLoggedIn, onSubmitProp: popupChange }} />
            <AdminNavItem props={{ isLoggedIn: isLoggedIn, isAdmin: isAdmin, onSubmitProp: popupChange }} />
            <DevNavItem props={{ isLoggedIn: isLoggedIn }} />
            <UserNavItem props={{ isLoggedIn: isLoggedIn, uname: uname, onClickProp: popupChange}} />

          </Nav>
          {/* <Nav>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" size="1.5em" />
                <Badge>{cart.length}</Badge> {}
              </Dropdown.Toggle>
            </Dropdown>
            </Nav>   */}
        </Collapse>
      </Navbar>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Header;