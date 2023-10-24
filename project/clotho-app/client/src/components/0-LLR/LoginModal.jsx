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

import LoginForm from './LoginForm';

function LoginModal({ props }) {
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    const toggle = () => {
        props.toggle();
    }

    const onLoginFormSubmit = (success, msg, uname) => {

        if (success) {
            // hide modal after form submission
            props.toggle();
        }

        // pass params up to parent component to display popup
        props.onSubmitProp(success, msg, uname);
    }

    return (
        <>

            <Modal isOpen={props.showModal} toggle={toggle} unmountOnClose={true}>
                <ModalHeader toggle={toggle}>Log In</ModalHeader>
                <ModalBody>
                        <LoginForm props={{ onSubmitProp: onLoginFormSubmit, uname: props.givenUname}} />
                </ModalBody>
            </Modal>

        </>
    );
}

export default LoginModal;