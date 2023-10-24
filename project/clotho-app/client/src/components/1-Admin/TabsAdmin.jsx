// IMPORT: React
import { React, useState, use } from 'react';
import { Link } from 'react-router-dom';

// IMPORT: Popups
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/Header.css';

// IMPORT: Reactstrap
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Card,
    Fill,
    Tabs,
    TabContent,
    TabPane,
    NavBar,
    NavItem,
    NavLink,
    Dropdown,
    Badge,
    Container,
    FormControl,
    Row,
    Col,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    Button,
} from 'reactstrap';

// IMPORT: Images
import logoFull from '../../assets/images/clotho-logo-name-hiRes.png';

// IMPORT: Components
import NewUsersPerDayCard from './NewUsersPerDayCardAdmin';
import UsersList from '../Tables/UsersTable';
import LoaderSpinner from '../LoaderSpinner';
import UsersTableCardAdmin from './UsersTableCardAdmin';
import PHCreateListing from "../PLACEHOLDERS/PHCreateListing";
import CreateListingAdminTest from "../Forms/CreateListingAdminTest";
import classnames from 'classnames'; 
import NewUserFormAdmin from './NewUserFormAdmin';


function TabsAdmin() {

    // initial login state
    const [isLoggedIn, setIsLoggedIn] = useState(!(sessionStorage.getItem('token') === '' || sessionStorage.getItem('token') === null));
    const [isAdmin, setIsAdmin] = useState((sessionStorage.getItem('isAdmin') === 'true'));
    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    const toggle = tab => {
        if (currentActiveTab !== tab) {
            setCurrentActiveTab(tab);
        }
    }

    return (
        <>
            <Nav fill justified tabs >
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '1'
                        })}
                        onClick={() => { toggle('1'); }}
                    > 
                        Statistics
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '2'
                        })}
                        onClick={() => { toggle('2'); }}
                    >
                        Create User
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '3'
                        })}
                        onClick={() => { toggle('3'); }}
                    >
                        Users
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({disabled: true,
                            active:
                                currentActiveTab === '4'
                        })}
                        onClick={() => { toggle('4'); }}
                    >
                        Listings
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                    <Row className="p-3">
                        <Col xs="12" lg="10" className="mx-auto my-2">
                            <NewUsersPerDayCard />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row className="p-3">
                        <Col xs="12" lg="10" className="mx-auto my-2">
                            <NewUserFormAdmin />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row className="p-3">
                        <Col xs="12" lg="10" className="mx-auto my-2">
                            <UsersTableCardAdmin />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row className="p-3">
                        <Col xs="12" lg="10" className="mx-auto my-2">
                            <CreateListingAdminTest />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    );
}

export default TabsAdmin;
