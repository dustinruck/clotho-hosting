import { React, useRef, useState, useEffect } from 'react';
import { NavItem, NavLink } from 'reactstrap';

function AdminNavItem( { props }) {
    return (
        <> 
            {
                props.isLoggedIn
                &&
                props.isAdmin
                &&
                <NavItem className="mx-auto mx-md-0">
                    <NavLink href="/admin" className="nav-link ml-auto">Admin</NavLink>
                </NavItem>
            }   
        </>

    
    )
}

export default AdminNavItem;