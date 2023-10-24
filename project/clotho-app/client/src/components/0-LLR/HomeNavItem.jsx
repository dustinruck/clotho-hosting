import { React, useRef, useState, useEffect } from 'react';
import { NavItem, NavLink } from 'reactstrap';

function HomeNavItem({ props }) {
    return (
        <>
            {
                props.isLoggedIn
                &&
                <NavItem className="mx-auto mx-md-0">
                    <NavLink href="/" className="nav-link ml-auto">Home</NavLink>
                </NavItem>
            }
        </>
    )
}
export default HomeNavItem;