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

import SignupForm from './SignupForm';

function SignupModalNavItem({ props }) {
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    const toggle = () => {
        props.toggle();
    }

    const onSignupFormSubmit = (success, msg, uname) => {

        if (success) {
            // hide modal after form submission
            props.toggle();
        }
        // pass params up to parent component to display popup
        props.onSubmitProp(success, msg, uname);            

    }

    return (
        <>
            <div>
                <Modal isOpen={props.showModal} toggle={toggle} unmountOnClose={unmountOnClose}>
                    <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
                    <ModalBody>
                        <SignupForm props={{ onSubmitProp: onSignupFormSubmit }} />
                    </ModalBody>
                </Modal>
            </div>
        </>
    );
}

export default SignupModalNavItem;