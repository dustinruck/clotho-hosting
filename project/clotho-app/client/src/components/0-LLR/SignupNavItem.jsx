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

import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

function SignupModalNavItem({ props }) {
    const [modal, setModal] = useState(false);
    const [modalL, setModalL] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);
    const [autoLaunchLogin, setAutoLaunchLogin] = useState(false);
    const [givenUname, setGivenUname] = useState('');

    const toggle = () => {
        setModal(!modal);
    }
    const toggleL = () => {
        setModalL(!modalL);
    }

    const onSignupModalSubmit = (success, msg, uname) => {

        // pass params up to parent component to display popup
        props.onSubmitProp(success, msg, uname);
        setGivenUname(uname);

        if (uname !== '' && uname !== null) {
            toggleL(); // launch login modal

        }

        console.log("HELLLLLLLLLLLLP " + uname + " modalL" + modalL);


    }

    return (
        <>
            {
                !props.isLoggedIn
                &&
                <NavItem className="mx-auto mx-md-0" >
                    <NavLink href='#' className="nav-link" onClick={toggle} >Sign Up</NavLink >
                </NavItem >
            }
            
            <SignupModal props={{ onSubmitProp: onSignupModalSubmit, showModal: modal, toggle: toggle }} />
            
            
                
            <LoginModal props={{ onSubmitProp: props.onSubmitProp, showModal: modalL, toggle: toggleL, givenUname: givenUname}} />
            
        </>
    );
}

export default SignupModalNavItem;