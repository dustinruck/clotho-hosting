import { React, useRef, useState, useEffect } from 'react';
import useAxiosJWT from '../../hooks/useAxiosJWT';
import { useNavigate } from 'react-router-dom';

import {
    NavItem,
    NavLink,
} from 'reactstrap';
import { redirect } from 'react-router';

import { Navigate } from 'react-router-dom';


function Logout({ props }) {

const navigate = useNavigate;
    const errRef = useRef();
    const axiosJWT = useAxiosJWT();

    const handleLogout = async (e) => {

        e.preventDefault();

        try {
            const response = await axiosJWT.delete('/auth/logout');
            console.log(response?.data);

            sessionStorage.setItem('token', '');
            sessionStorage.setItem('refreshToken', '');
            sessionStorage.setItem('isAdmin', '');
            sessionStorage.setItem('userId', '');
            sessionStorage.setItem('username', '');
            sessionStorage.setItem('avi', '');

            props.onSubmitProp(true, "Logged out successfully!");

            

        } catch (err) {

            if (!err?.response) {
                props.onSubmitProp(false, 'No Server Response')
            } else if (err.response?.data?.message) {
                console.log('err');
                console.log(err);
                props.onSubmitProp(false, err.response.data.message);
            } else {
                console.log('err');
                console.log(err);
                props.onSubmitProp(false, "Logout Failed!");
            }
            // errRef.current.focus();
        }
    }


        return (
            <>
                {
                    props.isLoggedIn
                        ?
                        <NavItem className="mx-auto mx-md-0">
                            <NavLink href='#' className="nav-link" onClick={handleLogout}>Logout</NavLink>
                        </NavItem>
                        :
                        <Navigate to="/" replace={true} />
                }
            </>
        )
    
}

export default Logout