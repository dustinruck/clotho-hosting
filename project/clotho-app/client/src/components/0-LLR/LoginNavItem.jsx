import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
    NavItem,
    NavLink,
} from 'reactstrap';

import LoginModal from './LoginModal';
import Login from './LoginForm';

function LoginNavItem({ props }) {
    const [modal, setModal] = useState(props.uname ? true : false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    const toggle = () => {
        setModal(!modal);
    }

    const onLoginModalSubmit = (success, msg, uname) => {
        
        // pass params up to header to display popup
        props.onSubmitProp(success, msg, uname);
    }

    return (
        <>
            {
                !props.isLoggedIn
                &&
                <NavItem className = "mx-auto mx-md-0">
                    <NavLink href = '#' className = "nav-link" onClick = { toggle }>Log In</NavLink >
                </NavItem >        
            }
            {
                modal
                &&
                <LoginModal props={{ onSubmitProp: onLoginModalSubmit, showModal: modal, toggle: toggle, uname: props.uname}} />       
            }
            
        </>
    );
}

export default LoginNavItem;